import moment from "moment";

//**********************************************************************
export function createCalendarData(config) {
    const firstDay = moment(config.firstDay);
    let currentDay = moment(config.firstDay);

    // 0-based weekdays, so 0 is Sunday
    if (firstDay.weekday() !== 0) {
        throw new Error(`First day ${firstDay} must be a Sunday!`);
    }
    const calendar = {
        selectedShifts: [],
        months: []
    };
    let monthIndex = 0;
    calendar.months[monthIndex] = {monthIndex: monthIndex, weeks: []};
    for (let weekIndex = 0; weekIndex < 13; weekIndex++) {
        let week = {weekIndex: weekIndex, days: []};
        for (let weekDay = 0; weekDay < 7; weekDay++) {
            let day = {
                dayIndex: weekDay,
                date: currentDay.format("YYYY-MM-DD"),
                day: currentDay.format("DD"),
                id: `${weekIndex + 1}${weekDay + 1}`,
                meal: weekDay < config.regularSchedule
            };
            day.label = config.labeledDates[day.date] || null;
            if (config.daysOff.indexOf(day.date) > -1) {
                day.meal = false;
            }
            week.days.push(day);
            currentDay = currentDay.add(1, 'days');
        }
        calendar.months[monthIndex].weeks.push(week);
        if (weekIndex === 3 || weekIndex === 8) {
            monthIndex += 1;
            calendar.months[monthIndex] = {monthIndex: monthIndex, weeks: []};
        }
    }

    // Figure out the month names. I'm going to go with whatever month the second week starts on.
    calendar.months.forEach((month) => {
        const secondWeek = month.weeks[1];
        const day = moment(secondWeek.days[0].date);
        month.monthName = day.format("MMM");
    });
    return calendar;
}
