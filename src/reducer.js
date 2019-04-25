import produce from "immer";
import ACTION_TYPES from "./action-types";
import {config} from "./config"
import {createCalendarData} from "./calendar-utils";

//**********************************************************************
const getInitialState = () => {
    return {
        neverCook: false,
        neverAssist: false,
        neverClean: false,
        selectedShifts: [],
        config: createCalendarData(config),
    };
};

//**********************************************************************
export default function reducer(state=getInitialState(), action) {
    console.log("reducer: ", action);
    return produce(state, (draft) => {
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
            default:
                return state;
        }
    });
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
