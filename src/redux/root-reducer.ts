import {InitialState} from './initial-state.ts';

export const RootReducer = (state=InitialState, action) => {
    switch (action.type) {
        case 'SET_CLOCK_IN': {
            const newState = Object.assign({}, state);
            newState.inOrOut = 'CLOCKED IN';
            return newState;
        }
        case 'SET_CLOCK_OUT': {
            const newState = Object.assign({}, state);
            newState.inOrOut = 'CLOCKED OUT';
            return newState;
        }
        case 'SET_TIME_ENTRIES': {
            const newState = Object.assign({}, state);
            newState.timeEntries = action.timeEntries;
            return newState;
        }
        case 'CALCULATE_TOTAL_TIME': {
            const newState = Object.assign({}, state);
            const totalMilliseconds = newState.timeEntries.reduce((prev, curr, index, array) => {

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

                const currentTimeMilliseconds = currentTime.getTime();
                const nextTimeMilliseconds = nextTime.getTime();

                const differenceInMilliseconds = currentTimeMilliseconds - nextTimeMilliseconds;

                return prev + differenceInMilliseconds;
            }, 0);

            newState.totalHours = Math.floor((totalMilliseconds / 1000 / 60 / 60) % 24);
            newState.totalMinutes = Math.floor((totalMilliseconds / 1000 / 60) % 60);
            newState.totalSeconds = Math.floor((totalMilliseconds / 1000) % 60);

            if (!newState.originalTotalHours) {
                newState.originalTotalHours = totalMilliseconds / 1000 / 60 / 60;
            }

            if (!newState.originalTotalMinutes) {
                newState.originalTotalMinutes = totalMilliseconds / 1000 / 60;
            }

            if (!newState.originalTotalSeconds) {
                newState.originalTotalSeconds = totalMilliseconds / 1000;
            }

            return newState;
        }
        case 'LIVE_UPDATE_TOTAL_TIME': {
            const newState = Object.assign({}, state);

            const lastClockIn = newState.timeEntries.find((timeEntry) => timeEntry.type === 'CLOCK IN');
            const totalMilliseconds = (new Date()).getTime() - lastClockIn.time.getTime();

            newState.totalHours = Math.floor((newState.originalTotalHours + (totalMilliseconds / 1000 / 60 / 60)) % 24);
            newState.totalMinutes = Math.floor((newState.originalTotalMinutes + (totalMilliseconds / 1000 / 60)) % 60);
            newState.totalSeconds = Math.floor((newState.originalTotalSeconds + (totalMilliseconds / 1000)) % 60);

            return newState;
        }
        default: {
            return state;
        }
    }
};
