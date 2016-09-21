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
        case 'CALCULATE_TOTAL_TIME': {
            const newState = Object.assign({}, state);
            newState.totalTime = newState.timeEntries.reduce((prev, curr, index, array) => {

                if (typeof curr === 'boolean') {
                    return prev;
                }

                if (!array[index + 1]) {
                    return prev;
                }

                if (curr.type === 'CLOCK IN') {
                    return prev;
                }

                const currentTime = curr.time;
                const nextTime = array[index + 1].time;

                const currentTimeMilliseconds = currentTime.getMilliseconds();
                const nextTimeMilliseconds = nextTime.getMilliseconds();

                const differenceInMilliseconds = nextTimeMilliseconds - currentTimeMilliseconds;

                console.log(differenceInMilliseconds);

                return prev + differenceInMilliseconds;
            }, 0) / 1000;
            return newState;
        }
        default: {
            return state;
        }
    }
};
