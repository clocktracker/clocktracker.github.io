import {TimeEntryModel} from '../models/time-entry-model.ts';

const initializeClockInOrOut = async (context: any) => {
    const clockedIn: boolean = await TimeEntryModel.getClockedIn();

    if (clockedIn) {
        context.action = {
            type: 'SET_CLOCK_IN'
        };
    }
    else {
        context.action = {
            type: 'SET_CLOCK_OUT'
        };
    }
};

const clockIn = async (context: any) => {
    await TimeEntryModel.create({
        type: 'CLOCK IN',
        time: new Date()
    });

    await TimeEntryModel.setClockedIn();

    context.action = {
        type: 'SET_CLOCK_IN'
    };
};

const clockOut = async (context: any) => {
    await TimeEntryModel.create({
        type: 'CLOCK OUT',
        time: new Date()
    });

    await TimeEntryModel.setClockedOut();

    context.action = {
        type: 'SET_CLOCK_OUT'
    };
};

const loadTimeEntries = async (context: any) => {
    const timeEntries = await TimeEntryModel.getAll();

    context.action = {
        type: 'SET_TIME_ENTRIES',
        timeEntries
    };
};

const calculateTotalTime = (context: any) => {
    context.action = {
        type: 'CALCULATE_TOTAL_TIME'
    };
};

const setOriginalTotalTime = (context: any) => {
    context.action = {
        type: 'SET_ORIGINAL_TOTAL_TIME'
    };
};

const liveUpdateTotalTime = (context: any) => {
    context.action = {
        type: 'LIVE_UPDATE_TOTAL_TIME'
    };
}

export const Actions = {
    clockIn,
    clockOut,
    loadTimeEntries,
    calculateTotalTime,
    initializeClockInOrOut,
    liveUpdateTotalTime,
    setOriginalTotalTime
};
