declare var moment: any;

import {Actions} from '../../redux/actions.ts';
import {TimeEntry} from '../../typings/time-entry.ts';

class TTTimeTracker {
    public is: string;
    public inOrOut: 'CLOCKED IN' | 'CLOCKED OUT';
    public toggled: boolean;
    public totalHours: number;
    public totalMinutes: number;
    public totalSeconds: number;
    public timeEntries: TimeEntry[];

    beforeRegister() {
        this.is = 'tt-time-tracker';
    }

    async ready() {
        Actions.initializeClockInOrOut(this);
        await Actions.loadTimeEntries(this);
        Actions.calculateTotalTime(this);
        Actions.setOriginalTotalTime(this);

        if (this.inOrOut === 'CLOCKED IN') {
            Actions.liveUpdateTotalTime(this);
        }

        setInterval(() => {
            if (this.inOrOut === 'CLOCKED IN') {
                Actions.liveUpdateTotalTime(this);
            }
        }, 1000);
    }

    async clockIn(e: Event) {
        await Actions.clockIn(this);
        await Actions.loadTimeEntries(this);
        Actions.calculateTotalTime(this);
        Actions.setOriginalTotalTime(this);
    }

    async clockOut(e: Event) {
        await Actions.clockOut(this);
        await Actions.loadTimeEntries(this);
        Actions.calculateTotalTime(this);
    }

    inClass(toggled: boolean) {
        return toggled ? '' : 'green';
    }

    outClass(toggled: boolean) {
        return toggled ? 'red' : '';
    }

    statusClass(toggled: boolean) {
        return toggled ? 'green-text' : 'red-text';
    }

    formatTime(time: Date) {
        return moment(time).format('MMMM Do YYYY, h:mm:ss a');
    }

    mapStateToThis(e: Event) {
        const state = e.detail.state;

        this.inOrOut = state.inOrOut;
        this.toggled = state.inOrOut === 'CLOCKED IN' ? true : false;
        this.totalHours = state.totalHours;
        this.totalMinutes = state.totalMinutes;
        this.totalSeconds = state.totalSeconds;
        this.timeEntries = state.timeEntries;
    }
}

Polymer(TTTimeTracker);
