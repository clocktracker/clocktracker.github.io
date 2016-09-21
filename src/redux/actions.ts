import {TimeEntryModel} from '../models/time-entry-model.ts';

const clockIn = async (context: any) => {
    await TimeEntryModel.create({
        type: 'CLOCK IN',
        time: new Date()
    });

    context.action = {
        type: 'SET_CLOCK_IN'
    };
};

const clockOut = async (context: any) => {
    await TimeEntryModel.create({
        type: 'CLOCK OUT',
        time: new Date()
    });

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

export const Actions = {
    clockIn,
    clockOut,
    loadTimeEntries,
    calculateTotalTime
};
