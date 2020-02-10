import argparse
import csv
import datetime
import io
import re
import urllib.parse


########################################################################
def main():
    parser = argparse.ArgumentParser(description="Clean the Meal System Data")
    parser.add_argument("start_date", help="Date of first day in the calendar. Format YYYYMMDD eg 20200503)")
    parser.add_argument("--file", default="scheddata.csv", help="File to process (default is scheddata.csv)")
    args = parser.parse_args()

    input_filename = args.file
    assert ".csv" in input_filename, "Trying to run on a non-csv file!"

    output_filename = input_filename.replace(".csv", "_cleaned.csv")

    try:
        start_date = datetime.datetime.strptime(args.start_date, "%Y%m%d").date()
        assert start_date.weekday() == 6, "start_date must be a Sunday!"
    except Exception as e:
        print("ERROR - bad input date!")
        raise e

    # Perform some sanity checks to make sure the date seems right
    two_years_in_future = datetime.date.today() + datetime.timedelta(days=365*2)
    assert start_date > datetime.date(2000, 1, 1), "You entered a date for before the year 2000!"
    assert start_date < two_years_in_future, "Trying to run for over 2 years in the future!"

    run(start_date, input_filename, output_filename)


########################################################################
def remove_fields(items, fields_to_remove):
    for field in fields_to_remove:
        try:
            items.remove(field)
        except:
            pass


########################################################################
def parse_week_and_day(fieldname):
    digits = list(filter(lambda x: x.isdigit(), fieldname))
    week = int("".join(digits[:-1]))
    day = int(digits[-1])
    return week, day


########################################################################
def get_next_week_and_day(week, day):
    if day == 5:
        return week+1, 1
    else:
        return week, day+1


########################################################################
def inject_missing_dates(fieldnames):
    started = False
    output_fieldnames = []
    for i, field in enumerate(fieldnames):
        if field == "cook11":
            started = True
            output_fieldnames.append(field)
        elif started and field[:4] in ["cook", "assi", "clea"]:
            previous_field = fieldnames[i-1]
            previous_week_and_day = parse_week_and_day(previous_field)
            next_week_and_day = parse_week_and_day(field)
            expected_next = get_next_week_and_day(*previous_week_and_day)

            if previous_week_and_day == next_week_and_day:
                output_fieldnames.append(field)
                continue
            elif next_week_and_day == expected_next:
                output_fieldnames.append(field)
                continue
            else:
                # We are currently skipping at least one date...
                while expected_next != next_week_and_day:
                    output_fieldnames.append(f"cook{expected_next[0]}{expected_next[1]}")
                    output_fieldnames.append(f"assist{expected_next[0]}{expected_next[1]}")
                    output_fieldnames.append(f"clean{expected_next[0]}{expected_next[1]}")
                    expected_next = get_next_week_and_day(*expected_next)
                output_fieldnames.append(field)
        else:
            output_fieldnames.append(field)
    return output_fieldnames


########################################################################
def cleanup_output_fieldnames(fieldnames):
    fieldnames = ["num", "name", "ncook", "nasst", "nclean", "nmeals"] + fieldnames[1:]
    shifts_together_index = fieldnames.index("shiftstogether")

    assert shifts_together_index > 0, "Can't find column 'shiftstogether'!"

    fieldnames = fieldnames[:shifts_together_index+1] + ["cookrank", "assistrank", "cleanrank"] + fieldnames[shifts_together_index+1:]

    remove_fields(fieldnames, ['nmeals1', 'nmeals2', 'nmeals3', 'nmeals4', 'nmeals5'])
    remove_fields(fieldnames, ['nclean1', 'nclean2', 'nclean3', 'nclean4', 'nclean5'])
    remove_fields(fieldnames, ['ncook1', 'ncook2', 'ncook3', 'ncook4', 'ncook5'])
    remove_fields(fieldnames, ['nassist1', 'nassist2', 'nassist3', 'nassist4', 'nassist5'])
    remove_fields(fieldnames, ['allco', 'allas', 'allcl'])

    fieldnames = inject_missing_dates(fieldnames)

    return fieldnames


########################################################################
def calculate_date(start_date, week, day):
    additional_days = (week-1) * 7 + (day-1)
    return start_date + datetime.timedelta(days=additional_days)


########################################################################
def create_date_row(fieldnames, start_date):
    row = {}
    started = False
    for field in fieldnames:
        if field:
            if field == "cook11":
                started = True
            if not started:
                row[field] = ""
            else:
                week, day = parse_week_and_day(field)
                current_date = calculate_date(start_date, week, day)
                row[field] = current_date.strftime("%Y/%m/%d")
    return row


########################################################################
def run(start_date, input_filename, output_filename):
    first_line = None
    content = []
    for line in io.open(input_filename, "rt"):
        if not first_line:
            first_line = line
            assert line.startswith("name")
        elif line == first_line:  # Skip repeats of the header row
            continue
        elif not line:  # Skip blank lines
            continue
        else:
            content.append(line)

    print("num rows:", len(content))

    output_buffer = io.StringIO(newline="")

    fieldnames = first_line.strip().split(",")
    writer = csv.writer(output_buffer)
    writer.writerow(fieldnames)
    for line in content:
        line = line.strip()
        fields = [urllib.parse.unquote_plus(field).strip() for field in line.split(",")]
        writer.writerow(fields)

    temporary_content = output_buffer.getvalue()

    # Okay, I've cleaned up the data enough that I can now switch to reading it as a csv
    input_buffer = io.StringIO(temporary_content, newline="")
    reader = csv.DictReader(input_buffer)
    fieldnames = cleanup_output_fieldnames(fieldnames)

    with io.open(output_filename, "wt") as out_file:
        writer = csv.DictWriter(out_file, fieldnames)
        writer.writerow(create_date_row(fieldnames, start_date))
        writer.writeheader()
        row_num = 1
        for row in reader:
            output_row = {}

            # Fill in any missing values
            for field in fieldnames:
                output_row[field] = "no"

            before_calendar = True
            nmeals = 0
            ncook = 0
            nassist = 0
            nclean = 0
            for fieldname, value in row.items():
                if not fieldname:
                    continue
                if re.match("nmeals\\d$", fieldname) and value == "0":
                    nmeals = max(nmeals, int(fieldname[-1]))
                elif re.match("ncook\\d$", fieldname) and value == "0":
                    ncook = max(ncook, int(fieldname[-1]))
                elif re.match("nassist\\d$", fieldname) and value == "0":
                    nassist = max(nassist, int(fieldname[-1]))
                elif re.match("nclean\\d$", fieldname) and value == "0":
                    nclean = max(nclean, int(fieldname[-1]))
                elif fieldname in fieldnames:
                    if fieldname == "cook11":
                        before_calendar = False
                    if before_calendar:
                        if value == "0":
                            value = "yes"
                        elif value == "1":
                            value = "no"
                    else:
                        if value == "0":
                            value = "no"
                        elif value == "1":
                            value = "yes"
                    output_row[fieldname] = value
            output_row["nmeals"] = nmeals
            output_row["cookrank"] = ncook
            output_row["assistrank"] = nassist
            output_row["cleanrank"] = nclean
            output_row["num"] = row_num
            row_num += 1

            writer.writerow(output_row)


########################################################################
if __name__ == "__main__":
    main()
