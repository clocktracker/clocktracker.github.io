import {Actions} from '../../redux/actions.ts';

class TTTimeTracker {
    public inOrOut: 'CLOCKED IN' | 'CLOCKED OUT';
    public toggled: boolean;
    public totalHours: number;
    public totalMinutes: number;
    public totalSeconds: number;
    public timeEntries;

    beforeRegister() {
        this.is = 'tt-time-tracker';
    }

    async ready() {
        this.green = 'green';
        await Actions.initializeClockInOrOut(this);
        await Actions.loadTimeEntries(this);
        await Actions.calculateTotalTime(this);
    }

    async clockIn(e) {
        await Actions.clockIn(this);
        await Actions.loadTimeEntries(this);
        await Actions.calculateTotalTime(this);
    }

    async clockOut(e) {
        await Actions.clockOut(this);
        await Actions.loadTimeEntries(this);
        await Actions.calculateTotalTime(this);
    }

    inClass(toggled) {
        return toggled ? '' : 'green';
    }

    outClass(toggled) {
        return toggled ? 'red' : '';
    }

    statusClass(toggled) {
        return toggled ? 'green-text' : 'red-text';
    }

    formatTime(time: Date) {
        return moment(time).format('MMMM Do YYYY, h:mm:ss a');
    }

    mapStateToThis(e) {
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
