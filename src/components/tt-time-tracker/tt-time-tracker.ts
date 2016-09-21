import {Actions} from '../../redux/actions.ts';

class TTTimeTracker {
    public inOrOut;
    public toggled;
    public totalTime;
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

    mapStateToThis(e) {
        const state = e.detail.state;

        this.inOrOut = state.inOrOut;
        this.toggled = state.inOrOut === 'IN' ? true : false;
        this.totalTime = state.totalTime;
        this.timeEntries = state.timeEntries;
    }
}

Polymer(TTTimeTracker);
