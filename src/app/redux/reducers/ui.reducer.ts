import { ActionsUI } from '../actions/ui.action';
import { ACTIVAR_LOADING, DESACTIVAR_LOADING } from '../types/ui.types';
import { UiState } from '../state/ui.state';

const estadoInicial: UiState = { isLoading: false };

export function UIReducer(state = estadoInicial, action: ActionsUI): UiState {

    switch (action.type) {

        case ACTIVAR_LOADING:
            return { isLoading: true };

        case DESACTIVAR_LOADING:
            return { isLoading: false };

        default:
            return state;
    }
}