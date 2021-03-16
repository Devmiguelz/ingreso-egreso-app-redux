import { ActionReducerMap } from '@ngrx/store';
import { UIReducer } from './reducers/ui.reducer';
import { UiState } from './state/ui.state';
import { AuthState } from './state/auth.state';
import { AuthReducer } from './reducers/auth.reducer';

export interface AppState {
    iu: UiState;
    auth: AuthState
}

export const appReducers: ActionReducerMap<AppState> = {
    iu: UIReducer,
    auth: AuthReducer
};