import {InitialState} from './initial-state.ts';

export const RootReducer = (state=InitialState, action) => {
    switch (action.type) {
        case 'SET_CLOCK_IN': {
            const newState = Object.assign({}, state);
            newState.inOrOut = 'IN';
            return newState;
        }
        case 'SET_CLOCK_OUT': {
            const newState = Object.assign({}, state);
            newState.inOrOut = 'OUT';
            return newState;
        }
        case 'SET_TIME_ENTRIES': {
            const newState = Object.assign({}, state);
            newState.timeEntries = action.timeEntries;
            return newState;
        }
        default: {
            return state;
        }
    }
};
