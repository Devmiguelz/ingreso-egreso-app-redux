import { Action } from '@ngrx/store';
import { ACTIVAR_LOADING, DESACTIVAR_LOADING } from '../types/ui.types';

export class ActivarLoadingAction implements Action {
    readonly type = ACTIVAR_LOADING;
}

export class DeactivarLoadingAction implements Action {
    readonly type = DESACTIVAR_LOADING;
}

export type ActionsUI = ActivarLoadingAction | DeactivarLoadingAction;