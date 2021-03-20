import { AuthState } from '../state/auth.state';
import { ActionsUSER } from '../actions/auth.action';
import { SET_USER, UNSET_USER } from '../types/auth.types';

const estadoInicial: AuthState = { user: null};

export function AuthReducer(state = estadoInicial, action: ActionsUSER): AuthState {

    switch (action.type) {

        case SET_USER:
            return {
                user: { ...action.user }
            };
            
        case UNSET_USER:
            return {
                user: null
            };

        default:
            return state;
    }
}