import React, { Component, Fragment } from 'react';
import PropTypes from "prop-types";
import Checkbox from "./components/checkbox";
import {connect} from "react-redux";
import {calendarType, weekType} from "./custom-prop-types";
import * as Actions from "./actions";

//**********************************************************************
export class CalendarComponent extends Component {
    static propTypes = calendarType;

    //******************************************************************
    render() {
        return (
            <div style={{marginLeft: "10px"}}>
                {this.props.months.map((month) =>
                    <Month key={month.monthIndex} {...month}/>
                )}
            </div>
        );
    }
}

//**********************************************************************
export class Month extends Component {
    static propTypes = {
        weeks: PropTypes.arrayOf(weekType)
    };

    //******************************************************************
    getStyles() {
        const styles = {};
        styles.table = {
            margin: "10px",
            border: "1px solid black",
            borderRadius: "15px",
            width: "95%"
        };
        return styles;
    }

    //******************************************************************
    render() {
        const styles = this.getStyles();
        return (
            <div>
                <p style={{fontWeight: "bold", marginTop: "25px"}}>{this.props.monthName}</p>
                <table style={styles.table}>
                    <tbody>
                    <tr style={{textAlign: "center"}}>
                        <td style={{width: "14.286%"}}>Sunday</td>
                        <td style={{width: "14.286%"}}>Monday</td>
                        <td style={{width: "14.286%"}}>Tuesday</td>
                        <td style={{width: "14.286%"}}>Wednesday</td>
                        <td style={{width: "14.286%"}}>Thursday</td>
                        <td style={{width: "14.286%"}}>Friday</td>
                        <td style={{width: "14.286%"}}>Saturday</td>
                    </tr>
                    {this.props.weeks.map((week) =>
                        <Week
                          key={week.weekIndex}
                          {...week}/>
                    )}
                    </tbody>
                </table>
            </div>
        );
    }
}

//**********************************************************************
export class Week extends Component {
    static propTypes = weekType;

    //******************************************************************
    getStyle() {
        const styles = {};
        styles.row = {
        };
        if (this.props.weekIndex % 2 === 0) {
            styles.row.backgroundColor = "#f2f2f2";
        }
        return styles;
    }

    //******************************************************************
    render() {
        const styles = this.getStyle();
        return (
            <tr style={styles.row}>
                {this.props.days.map((day) =>
                    <Day key={day.dayIndex} {...day}/>
                )}
            </tr>
        );
    }
}

//**********************************************************************
class DayComponent extends Component {
    static propTypes = {
        toggleShift: PropTypes.func.isRequired,
        date: PropTypes.string.isRequired,
        day: PropTypes.string.isRequired,
        id: PropTypes.string,
        meal: PropTypes.bool,
        label: PropTypes.string,
    };

    //******************************************************************
    getStyles () {
        const styles = {};
        styles.td = {
            padding: "5px",
            borderTop: "1px solid black",
        };
        if (this.props.dayIndex > 0) {
            styles.td.borderRight = "1px solid black";
        }
        return styles;
    }

    //******************************************************************
    getLabel() {
        return (
            <strong>
                {this.props.label.split('\n').map((item, key) => {
                    return (
                        <Fragment key={key}>{item}<br/></Fragment>
                    );
                })}
            </strong>
        );
    }

    //******************************************************************
    render() {
        const styles = this.getStyles();
        const label = this.props.label ? (this.getLabel()) : null;
        let checkboxes = null;
        if (this.props.meal) {
            const cookId = `cook${this.props.id}`;
            const assistId = `assist${this.props.id}`;
            const cleanId = `clean${this.props.id}`;
            const cookChecked = this.props.selectedShifts.indexOf(cookId) > -1;
            const assistChecked = this.props.selectedShifts.indexOf(assistId) > -1;
            const cleanChecked = this.props.selectedShifts.indexOf(cleanId) > -1;
            checkboxes = (
                <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between", height: "115px"}}>
                    <Checkbox checked={cookChecked} onChange={() => this.props.toggleShift(cookId)} id={cookId}>Cook</Checkbox>
                    <Checkbox checked={assistChecked} onChange={() => this.props.toggleShift(assistId)} id={assistId}>Assist</Checkbox>
                    <Checkbox checked={cleanChecked} onChange={() => this.props.toggleShift(cleanId)} id={cleanId}>Clean</Checkbox>
                </div>
            );
        }
        else {
            checkboxes = (
                <div style={{marginTop: "40px"}}>No Meal</div>
            );
        }

        return (
            <td style={styles.td}>
                <div style={{height: "160px"}}>
                    <div style={{display: "flex", marginBottom: "5px", height: "40px"}}>
                        <div style={{width: "30px"}}><strong>{this.props.day}</strong></div>
                        {label}
                    </div>
                    {checkboxes}
                </div>
            </td>
        );
    }
}

const dayMapStateToProps = (state) => ({selectedShifts: state.selectedShifts});
const dayMapDispatchToProps = (dispatch) => ({toggleShift: (shiftId) => dispatch(Actions.toggleShift(shiftId))});
const Day = connect(dayMapStateToProps, dayMapDispatchToProps)(DayComponent);

const mapStateToProps = (state) => state.config;
const Calendar = connect(mapStateToProps)(CalendarComponent);
export default Calendar;
