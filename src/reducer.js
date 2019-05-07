import produce from "immer";
import ACTION_TYPES from "./action-types";
import {config} from "./config"
import {createCalendarData} from "./calendar-utils";

//**********************************************************************
function getClearedState() {
    return {
        checkedStates: {},
        inputValues: {},
        neverCook: false,
        neverAssist: false,
        neverClean: false,
        selectedShifts: [],
        config: createCalendarData(config),
    };
}

//**********************************************************************
const getInitialState = () => {
    if (window.sessionStorage["meal-system-state"]) {
        return JSON.parse(window.sessionStorage["meal-system-state"]);
    }
    else {
        return getClearedState();
    }
};

//**********************************************************************
function saveState(state) {
    window.sessionStorage["meal-system-state"] = JSON.stringify(state);
}

//**********************************************************************
export default function reducer(state=getInitialState(), action) {
    console.log("reducer: ", action);
    const newState = produce(state, (draft) => {
        switch (action.type) {
            case ACTION_TYPES.TOGGLE_SHIFT:
                if (draft.selectedShifts.indexOf(action.shiftId) > -1) {
                    draft.selectedShifts = draft.selectedShifts.filter((x) => x !== action.shiftId);
                }
                else {
                    draft.selectedShifts.push(action.shiftId);
                }
                break;
            case ACTION_TYPES.TOGGLE_NEVER_COOK:
                if (draft.neverCook) {
                    draft.neverCook = false;
                    // remove all the cook entries to selectedShifts
                    draft.selectedShifts = draft.selectedShifts.filter((x) => !x.startsWith("cook"));
                }
                else {
                    draft.neverCook = true;
                    // add all the cook entries to selectedShifts
                    addAll(draft, "cook");
                }

                break;
            case ACTION_TYPES.TOGGLE_NEVER_ASSIST:
                if (draft.neverAssist) {
                    draft.neverAssist = false;
                    // remove all the assist entries to selectedShifts
                    draft.selectedShifts = draft.selectedShifts.filter((x) => !x.startsWith("assist"));
                }
                else {
                    draft.neverAssist = true;
                    // add all the assist entries to selectedShifts
                    addAll(draft, "assist");
                }

                break;
            case ACTION_TYPES.TOGGLE_NEVER_CLEAN:
                if (draft.neverClean) {
                    draft.neverClean = false;
                    // remove all the clean entries to selectedShifts
                    draft.selectedShifts = draft.selectedShifts.filter((x) => !x.startsWith("clean"));
                }
                else {
                    draft.neverClean = true;
                    // add all the clean entries to selectedShifts
                    addAll(draft, "clean");
                }
                break;
            case ACTION_TYPES.TOGGLE_CHECKED_STATE:
                draft.checkedStates[action.name] = !Boolean(draft.checkedStates[action.name]);
                break;
            case ACTION_TYPES.SET_INPUT_VALUE:
                draft.inputValues[action.name] = action.value;
                break;
            case ACTION_TYPES.CLEAR:
                const clearedState = getClearedState();
                // This is a little weird since I need to edit draft without creating a new object
                const skipKeys = ["inputValues", "checkedStates"];
                Object.keys(clearedState).forEach((key) => {
                    if (skipKeys.indexOf(key) === -1) {
                        draft[key] = clearedState[key];
                    }
                });
                Object.keys(draft.inputValues).forEach((key) => {
                    draft.inputValues[key] = "";
                });
                Object.keys(draft.checkedStates).forEach((key) => {
                    draft.checkedStates[key] = false;
                });
                break;
            default:
                break;
        }
    });
    saveState(newState);
    return newState;
}

//**********************************************************************
function addAll(draft, shiftType) {
    // add all the shiftType entries to selectedShifts
    draft.config.months.forEach((month) => {
        month.weeks.forEach((week) => {
            week.days.forEach((day) => {
                if (day.meal) {
                    const shiftId = `${shiftType}${day.id}`;
                    if (draft.selectedShifts.indexOf(shiftId) === -1) {
                        draft.selectedShifts.push(shiftId);
                    }
                }
            });
        });
    });
}
