import { Action } from '@ngrx/store';
import { SET_ITEMS, UNSET_ITEMS } from '../types/ingreso-egreso.types';
import { IngresoEgreso } from '../../model/ingreso-egreso.model';

export class SetItemAction implements Action {
    readonly type = SET_ITEMS;

    constructor(public items : IngresoEgreso[]) { }
}

export class UnSetItemAction implements Action {
    readonly type = UNSET_ITEMS;

    constructor() { }
}

export type ActionsMOV = SetItemAction | UnSetItemAction;