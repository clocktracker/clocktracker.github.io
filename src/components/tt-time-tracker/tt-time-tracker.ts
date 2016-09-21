import {Actions} from '../../redux/actions.ts';

class TTTimeTracker {
    public inOrOut;
    public totalTime;
    public timeEntries;

    beforeRegister() {
        this.is = 'tt-time-tracker';
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
        this.totalTime = state.totalTime;
        this.timeEntries = state.timeEntries;
    }
}

Polymer(TTTimeTracker);
