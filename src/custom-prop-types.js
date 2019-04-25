import PropTypes from 'prop-types';

//**********************************************************************
export const dayType = PropTypes.shape({
    date: PropTypes.string.isRequired,
    day: PropTypes.string.isRequired,
    id: PropTypes.string,
    meal: PropTypes.bool,
    label: PropTypes.string,
});

//**********************************************************************
export const weekType = PropTypes.shape({
    weekIndex: PropTypes.number,
    days: PropTypes.arrayOf(dayType)
});

//**********************************************************************
export const monthType = PropTypes.shape({
    monthName: PropTypes.string,
    monthIndex: PropTypes.number,
    weeks: PropTypes.arrayOf(weekType)
});

//**********************************************************************
export const calendarType = PropTypes.shape({
    selectedShifts: PropTypes.arrayOf(PropTypes.string),
    months: PropTypes.arrayOf(monthType)
});
