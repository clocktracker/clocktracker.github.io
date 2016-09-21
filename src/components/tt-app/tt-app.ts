import {RootReducer} from '../../redux/root-reducer.ts';

class TTApp {
    public rootReducer;

    beforeRegister() {
        this.is = 'tt-App';
    }

    ready() {
        this.rootReducer = RootReducer;
    }
}

Polymer(TTApp);
