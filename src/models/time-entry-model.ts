declare var localforage: any;
import {UtilitiesService} from '../services/utilities-service.ts';
import {TimeEntry} from '../typings/time-entry.ts';

const dataPath = 'timeEntries'; //TODO figure out how to create a hierarchy to the data, with an API similar to Firebase

const create = async (timeEntry: TimeEntry): Promise<string> => {
    const id = UtilitiesService.createUUID();
    const newTimeEntry = Object.assign({}, timeEntry, {
        id
    });

    await localforage.setItem(`${id}`, newTimeEntry);

    return id;
};

const save = async (id: string, timeEntry: TimeEntry): Promise<void> => {
    const oldTimeEntry = await localforage.getItem(`${id}`);
    const newTimeEntry = Object.assign({}, oldTimeEntry, timeEntry);

    await localforage.setItem(`${id}`, newTimeEntry);
};

const getAll = async (): Promise<TimeEntry[]> => {

    const keys = await localforage.keys();

    //TODO redo this, very imperative
    const timeEntries: TimeEntry[] = [];
    for (let i=0; i < keys.length; i++) {
        const timeEntry = await localforage.getItem(keys[i]);
        timeEntries.push(timeEntry);
    }
    //TODO redo this, very imperative

    return timeEntries;
};

export const TimeEntryModel = {
    create,
    save,
    getAll
};
