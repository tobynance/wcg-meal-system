import {createCalendarData} from "./calendar-utils";

//**********************************************************************
function makeTestConfigSimple() {
    return {
        firstDay: "2019-03-03",
        regularSchedule: 5,  // 5 means 5 meals a week - run through Thursday
        labeledDates: {},
        daysOff: [],
        extraDaysOn: [],
    };
}

//**********************************************************************
describe('createCalendarData', () => {
    //******************************************************************
    it('Throws an error with bad starting date', () => {
        const config = makeTestConfigSimple();
        config.firstDay = "2019-03-04";  // Not a Sunday
        expect(() => createCalendarData(config)).toThrow();
    });

    //******************************************************************
    it('regularSchedule -- March - May', () => {
        const config = makeTestConfigSimple();
        config.regularSchedule = 2;
        const data = createCalendarData(config);
        expect(Object.keys(data).sort()).toEqual(["months", "selectedShifts"]);
        expect(data.months.length).toBe(3);
        expect(data.months[0].monthName).toEqual("Mar");
        expect(data.months[1].monthName).toEqual("Apr");
        expect(data.months[2].monthName).toEqual("May");

        expect(data.months[0].weeks.length).toBe(4);
        expect(data.months[1].weeks.length).toBe(5);
        expect(data.months[2].weeks.length).toBe(4);
        expect(data.months[0].weeks[0].days.length).toBe(7);

        expect(data.months[0].weeks[0].days[0].meal).toBe(true);
        expect(data.months[0].weeks[0].days[1].meal).toBe(true);
        expect(data.months[0].weeks[0].days[2].meal).toBe(false);
        expect(data.months[0].weeks[0].days[3].meal).toBe(false);
        expect(data.months[0].weeks[0].days[4].meal).toBe(false);
        expect(data.months[0].weeks[0].days[5].meal).toBe(false);
        expect(data.months[0].weeks[0].days[6].meal).toBe(false);

        expect(data.months[0].weeks[1].days[0].meal).toBe(true);
        expect(data.months[0].weeks[1].days[1].meal).toBe(true);
        expect(data.months[0].weeks[1].days[2].meal).toBe(false);
        expect(data.months[0].weeks[1].days[3].meal).toBe(false);
        expect(data.months[0].weeks[1].days[4].meal).toBe(false);
        expect(data.months[0].weeks[1].days[5].meal).toBe(false);
        expect(data.months[0].weeks[1].days[6].meal).toBe(false);

        expect(data.months[2].weeks[0].days[0].meal).toBe(true);
        expect(data.months[2].weeks[0].days[1].meal).toBe(true);
        expect(data.months[2].weeks[0].days[2].meal).toBe(false);
        expect(data.months[2].weeks[0].days[3].meal).toBe(false);
        expect(data.months[2].weeks[0].days[4].meal).toBe(false);
        expect(data.months[2].weeks[0].days[5].meal).toBe(false);
        expect(data.months[2].weeks[0].days[6].meal).toBe(false);
    });

    //******************************************************************
    it('date -- March - May', () => {
        const config = makeTestConfigSimple();
        const data = createCalendarData(config);
        expect(Object.keys(data).sort()).toEqual(["months", "selectedShifts"]);
        expect(data.months.length).toBe(3);
        expect(data.months[0].weeks.length).toBe(4);
        expect(data.months[1].weeks.length).toBe(5);
        expect(data.months[2].weeks.length).toBe(4);
        expect(data.months[0].weeks[0].days.length).toBe(7);

        expect(data.months[0].weeks[0].days[0].date).toEqual("2019-03-03");
        expect(data.months[0].weeks[0].days[1].date).toEqual("2019-03-04");
        expect(data.months[0].weeks[0].days[2].date).toEqual("2019-03-05");
        expect(data.months[0].weeks[0].days[3].date).toEqual("2019-03-06");
        expect(data.months[0].weeks[0].days[4].date).toEqual("2019-03-07");
        expect(data.months[0].weeks[0].days[5].date).toEqual("2019-03-08");
        expect(data.months[0].weeks[0].days[6].date).toEqual("2019-03-09");

        expect(data.months[0].weeks[1].days[0].date).toEqual("2019-03-10");
        expect(data.months[0].weeks[1].days[1].date).toEqual("2019-03-11");
        expect(data.months[0].weeks[1].days[2].date).toEqual("2019-03-12");
        expect(data.months[0].weeks[1].days[3].date).toEqual("2019-03-13");
        expect(data.months[0].weeks[1].days[4].date).toEqual("2019-03-14");
        expect(data.months[0].weeks[1].days[5].date).toEqual("2019-03-15");
        expect(data.months[0].weeks[1].days[6].date).toEqual("2019-03-16");

        expect(data.months[2].weeks[0].days[0].date).toEqual("2019-05-05");
        expect(data.months[2].weeks[0].days[1].date).toEqual("2019-05-06");
        expect(data.months[2].weeks[0].days[2].date).toEqual("2019-05-07");
        expect(data.months[2].weeks[0].days[3].date).toEqual("2019-05-08");
        expect(data.months[2].weeks[0].days[4].date).toEqual("2019-05-09");
        expect(data.months[2].weeks[0].days[5].date).toEqual("2019-05-10");
        expect(data.months[2].weeks[0].days[6].date).toEqual("2019-05-11");
    });

    //******************************************************************
    it('weekIndex and monthIndex -- March - May', () => {
        const config = makeTestConfigSimple();
        const data = createCalendarData(config);

        expect(data.months[0].monthIndex).toBe(0);
        expect(data.months[1].monthIndex).toBe(1);
        expect(data.months[2].monthIndex).toBe(2);

        expect(data.months[0].weeks[0].weekIndex).toBe(0);
        expect(data.months[0].weeks[1].weekIndex).toBe(1);
        expect(data.months[0].weeks[2].weekIndex).toBe(2);
        expect(data.months[0].weeks[3].weekIndex).toBe(3);

        expect(data.months[1].weeks[0].weekIndex).toBe(4);
        expect(data.months[1].weeks[1].weekIndex).toBe(5);
        expect(data.months[1].weeks[2].weekIndex).toBe(6);
        expect(data.months[1].weeks[3].weekIndex).toBe(7);
        expect(data.months[1].weeks[4].weekIndex).toBe(8);

        expect(data.months[2].weeks[0].weekIndex).toBe(9);
        expect(data.months[2].weeks[1].weekIndex).toBe(10);
        expect(data.months[2].weeks[2].weekIndex).toBe(11);
        expect(data.months[2].weeks[3].weekIndex).toBe(12);
    });

    //******************************************************************
    it('day -- March - May', () => {
        const config = makeTestConfigSimple();
        const data = createCalendarData(config);
        expect(Object.keys(data).sort()).toEqual(["months", "selectedShifts"]);
        expect(data.months.length).toBe(3);
        expect(data.months[0].weeks.length).toBe(4);
        expect(data.months[1].weeks.length).toBe(5);
        expect(data.months[2].weeks.length).toBe(4);
        expect(data.months[0].weeks[0].days.length).toBe(7);
        data.months.forEach((month) => {
            month.weeks.forEach((week) => {
                week.days.forEach((day) => {
                    let lastTwoDigits = day.date.slice(-2);
                    expect(lastTwoDigits).toEqual(day.day);
                });
            });
        });
    });

    //******************************************************************
    it('simple case -- March - May', () => {
        const config = makeTestConfigSimple();
        const data = createCalendarData(config);
        expect(Object.keys(data).sort()).toEqual(["months", "selectedShifts"]);
        expect(data.months.length).toBe(3);
        expect(data.months[0].weeks.length).toBe(4);
        expect(data.months[1].weeks.length).toBe(5);
        expect(data.months[2].weeks.length).toBe(4);
        expect(data.months[0].weeks[0].days.length).toBe(7);
        expect(data.months[0].weeks[0].days[0].date).toEqual("2019-03-03");
        expect(data.months[0].weeks[0].days[0].day).toEqual("03");
        expect(data.months[0].weeks[0].days[0].dayIndex).toBe(0);
        expect(data.months[0].weeks[0].days[0].id).toEqual("11");
        expect(data.months[0].weeks[0].days[0].label).toEqual(null);
        expect(data.months[0].weeks[0].days[0].meal).toBe(true);

        expect(data.months[0].weeks[0].days[4].id).toEqual("15");
        expect(data.months[1].weeks[1].days[4].id).toEqual("65");
        expect(data.months[2].weeks[3].days[3].id).toEqual("134");

        expect(data.months[0].weeks[0].days[4].dayIndex).toEqual(4);
        expect(data.months[1].weeks[1].days[4].dayIndex).toEqual(4);
        expect(data.months[2].weeks[3].days[3].dayIndex).toEqual(3);

        expect(data.months[0].weeks[0].days[5].meal).toBe(false);
        expect(data.months[0].weeks[0].days[6].meal).toBe(false);
        expect(data.months[0].weeks[1].days[0].meal).toBe(true);

        expect(data.months[1].weeks[0].days[0].date).toEqual("2019-03-31");
        expect(data.months[1].weeks[0].days[0].day).toEqual("31");
        expect(data.months[1].weeks[0].days[0].id).toEqual("51");
        expect(data.months[1].weeks[0].days[0].label).toEqual(null);
        expect(data.months[1].weeks[0].days[0].meal).toBe(true);

        expect(data.months[2].weeks[0].days[0].date).toEqual("2019-05-05");
        expect(data.months[2].weeks[0].days[0].day).toEqual("05");
        expect(data.months[2].weeks[0].days[0].id).toEqual("101");
        expect(data.months[2].weeks[0].days[0].label).toEqual(null);
        expect(data.months[2].weeks[0].days[0].meal).toBe(true);
    });

    //******************************************************************
    it('simple case -- December - February', () => {
        // 12/2/2018 - 2/28/2019
        const config = makeTestConfigSimple();
        config.firstDay = "2018-12-02";
        const data = createCalendarData(config);
        expect(Object.keys(data).sort()).toEqual(["months", "selectedShifts"]);
        expect(data.months.length).toBe(3);
        expect(data.months[0].weeks.length).toBe(4);
        expect(data.months[1].weeks.length).toBe(5);
        expect(data.months[2].weeks.length).toBe(4);
        expect(data.months[0].weeks[0].days.length).toBe(7);
        expect(data.months[0].weeks[0].days[0].date).toEqual("2018-12-02");
        expect(data.months[0].weeks[0].days[0].day).toEqual("02");
        expect(data.months[0].weeks[0].days[0].id).toEqual("11");
        expect(data.months[0].weeks[0].days[0].label).toEqual(null);
        expect(data.months[0].weeks[0].days[0].meal).toBe(true);

        expect(data.months[0].weeks[0].days[4].id).toEqual("15");
        expect(data.months[1].weeks[1].days[4].id).toEqual("65");
        expect(data.months[2].weeks[3].days[3].id).toEqual("134");

        expect(data.months[0].weeks[0].days[5].meal).toBe(false);
        expect(data.months[0].weeks[0].days[6].meal).toBe(false);
        expect(data.months[0].weeks[1].days[0].meal).toBe(true);

        expect(data.months[1].weeks[0].days[0].date).toEqual("2018-12-30");
        expect(data.months[1].weeks[0].days[0].day).toEqual("30");
        expect(data.months[1].weeks[0].days[0].id).toEqual("51");
        expect(data.months[1].weeks[0].days[0].label).toEqual(null);
        expect(data.months[1].weeks[0].days[0].meal).toBe(true);

        expect(data.months[2].weeks[0].days[0].date).toEqual("2019-02-03");
        expect(data.months[2].weeks[0].days[0].day).toEqual("03");
        expect(data.months[2].weeks[0].days[0].id).toEqual("101");
        expect(data.months[2].weeks[0].days[0].label).toEqual(null);
        expect(data.months[2].weeks[0].days[0].meal).toBe(true);
    });

    //******************************************************************
    it('simple case -- September - November', () => {
        // 9/2/2018 - 11/29/2018
        const config = makeTestConfigSimple();
        config.firstDay = "2018-09-02";
        const data = createCalendarData(config);

        expect(Object.keys(data).sort()).toEqual(["months", "selectedShifts"]);
        expect(data.months.length).toBe(3);
        expect(data.months[0].weeks.length).toBe(4);
        expect(data.months[1].weeks.length).toBe(5);
        expect(data.months[2].weeks.length).toBe(4);
        expect(data.months[0].weeks[0].days.length).toBe(7);
        expect(data.months[0].weeks[0].days[0].date).toEqual("2018-09-02");
        expect(data.months[0].weeks[0].days[0].day).toEqual("02");
        expect(data.months[0].weeks[0].days[0].id).toEqual("11");
        expect(data.months[0].weeks[0].days[0].label).toEqual(null);
        expect(data.months[0].weeks[0].days[0].meal).toBe(true);

        expect(data.months[0].weeks[0].days[4].id).toEqual("15");
        expect(data.months[1].weeks[1].days[4].id).toEqual("65");
        expect(data.months[2].weeks[3].days[3].id).toEqual("134");

        expect(data.months[0].weeks[0].days[5].meal).toBe(false);
        expect(data.months[0].weeks[0].days[6].meal).toBe(false);
        expect(data.months[0].weeks[1].days[0].meal).toBe(true);

        expect(data.months[1].weeks[0].days[0].date).toEqual("2018-09-30");
        expect(data.months[1].weeks[0].days[0].day).toEqual("30");
        expect(data.months[1].weeks[0].days[0].id).toEqual("51");
        expect(data.months[1].weeks[0].days[0].label).toEqual(null);
        expect(data.months[1].weeks[0].days[0].meal).toBe(true);

        expect(data.months[2].weeks[0].days[0].date).toEqual("2018-11-04");
        expect(data.months[2].weeks[0].days[0].day).toEqual("04");
        expect(data.months[2].weeks[0].days[0].id).toEqual("101");
        expect(data.months[2].weeks[0].days[0].label).toEqual(null);
        expect(data.months[2].weeks[0].days[0].meal).toBe(true);
    });

    //******************************************************************
    it('March - May', () => {
        const config = {
            firstDay: "2019-03-03",
            regularSchedule: 5,  // 5 means 5 meals a week - run through Thursday
            labeledDates: {
                "2019-03-09": "Gen. Meeting",
                "2019-03-10": "Daylt Savings",
                "2019-03-17": "St. Patrick's Day",
                "2019-03-31": "Forum",
                "2019-04-14": "Gen. Mtg.",
                "2019-04-20": "Passover",
                "2019-04-21": "Passover / Easter\n~~ Brunch! ~~",
                "2019-04-22": "Passover",
                "2019-04-23": "Passover",
                "2019-04-24": "Passover",
                "2019-04-25": "Passover",
                "2019-04-26": "Passover",
                "2019-04-28": "Forum",
                "2019-05-05": "Cinco de Mayo",
                "2019-05-11": "Gen. Mtg.",
                "2019-05-12": "Mother's Day",
                "2019-05-26": "Memorial Day W/e",
                "2019-05-27": "Memorial Day",
                "2019-05-30": "CoHo Conf. (OR)",
                "2019-05-31": "CoHo Conf. (OR)",
                "2019-06-01": "CoHo Conf. (OR)",
            },
            daysOff: [
            ],
            extraDaysOn: [],
        };

        const data = createCalendarData(config);
        expect(Object.keys(data).sort()).toEqual(["months", "selectedShifts"]);
        expect(data.months.length).toBe(3);
        expect(data.months[0].weeks.length).toBe(4);
        expect(data.months[1].weeks.length).toBe(5);
        expect(data.months[2].weeks.length).toBe(4);
        expect(data.months[0].weeks[0].days.length).toBe(7);
        expect(data.months[0].weeks[0].days[0].date).toEqual("2019-03-03");
        expect(data.months[0].weeks[0].days[0].day).toEqual("03");
        expect(data.months[0].weeks[0].days[0].id).toEqual("11");
        expect(data.months[0].weeks[0].days[0].label).toEqual(null);
        expect(data.months[0].weeks[0].days[0].meal).toBe(true);

        expect(data.months[0].weeks[0].days[4].id).toEqual("15");
        expect(data.months[1].weeks[1].days[4].id).toEqual("65");
        expect(data.months[2].weeks[3].days[3].id).toEqual("134");

        expect(data.months[0].weeks[0].days[5].meal).toBe(false);
        expect(data.months[0].weeks[0].days[6].meal).toBe(false);
        expect(data.months[0].weeks[1].days[0].meal).toBe(true);

        expect(data.months[1].weeks[0].days[0].date).toEqual("2019-03-31");
        expect(data.months[1].weeks[0].days[0].day).toEqual("31");
        expect(data.months[1].weeks[0].days[0].id).toEqual("51");
        expect(data.months[1].weeks[0].days[0].label).toEqual("Forum");
        expect(data.months[1].weeks[0].days[0].meal).toBe(true);

        expect(data.months[2].weeks[0].days[0].date).toEqual("2019-05-05");
        expect(data.months[2].weeks[0].days[0].day).toEqual("05");
        expect(data.months[2].weeks[0].days[0].id).toEqual("101");
        expect(data.months[2].weeks[0].days[0].label).toEqual("Cinco de Mayo");
        expect(data.months[2].weeks[0].days[0].meal).toBe(true);
    });

    //******************************************************************
    it('December - February', () => {
        // 12/2/2018 - 2/28/2019
        const config = {
            firstDay: "2018-12-02",
            regularSchedule: 5,  // 5 means 5 meals a week - run through Thursday
            labeledDates: {
                "2018-12-03": "Chanukah",
                "2018-12-04": "Chanukah",
                "2018-12-05": "Chanukah",
                "2018-12-06": "Chanukah",
                "2018-12-07": "Chanukah",
                "2018-12-08": "Chanukah",
                "2018-12-09": "Chanukah",
                "2018-12-10": "Chanukah",
                "2018-12-11": "Chanukah",
                "2018-12-15": "WCG Holiday Feast",
                "2018-12-24": "XMas Eve",
                "2018-12-25": "XMas Day",
                "2018-12-31": "New Years Eve",
                "2019-01-01": "New Years Day\nBrunch",
                "2019-01-21": "MLK Jr. Day",
                "2019-02-14": "Valentine's Day",
                "2019-02-18": "Presidents Day",
            },
            daysOff: [
                "2018-12-16",
                "2018-12-24",
                "2018-12-25",
                "2018-12-31",
            ],
            extraDaysOn: [],
        };

        const data = createCalendarData(config);
        expect(Object.keys(data).sort()).toEqual(["months", "selectedShifts"]);
        expect(data.months.length).toBe(3);
        expect(data.months[0].weeks.length).toBe(4);
        expect(data.months[1].weeks.length).toBe(5);
        expect(data.months[2].weeks.length).toBe(4);
        expect(data.months[0].weeks[0].days.length).toBe(7);
        expect(data.months[0].weeks[0].days[0].date).toEqual("2018-12-02");
        expect(data.months[0].weeks[0].days[0].day).toEqual("02");
        expect(data.months[0].weeks[0].days[0].id).toEqual("11");
        expect(data.months[0].weeks[0].days[0].label).toEqual(null);
        expect(data.months[0].weeks[0].days[0].meal).toBe(true);

        expect(data.months[0].weeks[0].days[5].meal).toBe(false);
        expect(data.months[0].weeks[0].days[6].meal).toBe(false);
        expect(data.months[0].weeks[1].days[0].meal).toBe(true);

        expect(data.months[0].weeks[2].days[0].date).toEqual("2018-12-16");
        expect(data.months[0].weeks[2].days[0].day).toEqual("16");
        expect(data.months[0].weeks[2].days[0].id).toEqual("31");
        expect(data.months[0].weeks[2].days[0].label).toEqual(null);
        expect(data.months[0].weeks[2].days[0].meal).toBe(false);

        expect(data.months[0].weeks[3].days[1].date).toEqual("2018-12-24");
        expect(data.months[0].weeks[3].days[1].day).toEqual("24");
        expect(data.months[0].weeks[3].days[1].id).toEqual("42");
        expect(data.months[0].weeks[3].days[1].label).toEqual("XMas Eve");
        expect(data.months[0].weeks[3].days[1].meal).toBe(false);

        expect(data.months[0].weeks[3].days[2].date).toEqual("2018-12-25");
        expect(data.months[0].weeks[3].days[2].day).toEqual("25");
        expect(data.months[0].weeks[3].days[2].id).toEqual("43");
        expect(data.months[0].weeks[3].days[2].label).toEqual("XMas Day");
        expect(data.months[0].weeks[3].days[2].meal).toBe(false);
    });

    //******************************************************************
    it('September - November', () => {
        // 9/2/2018 - 11/29/2018
        const config = {
            firstDay: "2018-09-02",
            regularSchedule: 5,  // 5 means 5 meals a week - run through Thursday
            labeledDates: {
                "2018-09-02": "Labor Day",
                "2018-09-03": "Labor Day",
                "2018-09-28": "WCG Retreat",
                "2018-09-29": "WCG Retreat",
                "2018-09-30": "WCG Retreat",
                "2018-10-08": "Indig People's Day\nPOTLUCK!",
                "2018-11-22": "Thanksgiving Day",
            },
            daysOff: [
                "2018-09-02",
                "2018-09-03",
                "2018-09-30",
                "2018-11-21",
                "2018-11-22",
            ],
            extraDaysOn: [],
        };

        const data = createCalendarData(config);

        expect(Object.keys(data).sort()).toEqual(["months", "selectedShifts"]);
        expect(data.months.length).toBe(3);
        expect(data.months[0].weeks.length).toBe(4);
        expect(data.months[1].weeks.length).toBe(5);
        expect(data.months[2].weeks.length).toBe(4);
        expect(data.months[0].weeks[0].days.length).toBe(7);
        expect(data.months[0].weeks[0].days[0].date).toEqual("2018-09-02");
        expect(data.months[0].weeks[0].days[0].day).toEqual("02");
        expect(data.months[0].weeks[0].days[0].id).toEqual("11");
        expect(data.months[0].weeks[0].days[0].label).toEqual("Labor Day");
        expect(data.months[0].weeks[0].days[0].meal).toBe(false);

        expect(data.months[0].weeks[0].days[1].date).toEqual("2018-09-03");
        expect(data.months[0].weeks[0].days[1].day).toEqual("03");
        expect(data.months[0].weeks[0].days[1].id).toEqual("12");
        expect(data.months[0].weeks[0].days[1].label).toEqual("Labor Day");
        expect(data.months[0].weeks[0].days[1].meal).toBe(false);

        expect(data.months[0].weeks[0].days[5].meal).toBe(false);
        expect(data.months[0].weeks[0].days[6].meal).toBe(false);
        expect(data.months[0].weeks[1].days[0].meal).toBe(true);
    });
});
