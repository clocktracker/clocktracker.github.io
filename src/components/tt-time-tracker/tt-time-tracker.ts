import {Actions} from '../../redux/actions.ts';

class TTTimeTracker {
    public inOrOut: 'IN' | 'OUT';
    public toggled: boolean;
    public totalHours: number;
    public totalMinutes: number;
    public totalSeconds: number;
    public timeEntries;

    beforeRegister() {
        this.is = 'tt-time-tracker';
    }

    async ready() {
        await Actions.initializeClockInOrOut(this);
        await Actions.loadTimeEntries(this);
        await Actions.calculateTotalTime(this);
    }

    async toggleClick(e) {
        const toggleButton = this.querySelector('#toggleButton');

        if (toggleButton.checked) {
            await Actions.clockIn(this);
        }
        else {
            await Actions.clockOut(this);
        }

        await Actions.loadTimeEntries(this);
        await Actions.calculateTotalTime(this);
    }

    formatTime(time: Date) {
        return moment(time).format('MMMM Do YYYY, h:mm:ss a');
    }

    mapStateToThis(e) {
        const state = e.detail.state;

        this.inOrOut = state.inOrOut;
        this.toggled = state.inOrOut === 'IN' ? true : false;
        this.totalHours = state.totalHours;
        this.totalMinutes = state.totalMinutes;
        this.totalSeconds = state.totalSeconds;
        this.timeEntries = state.timeEntries;
    }
}

Polymer(TTTimeTracker);
