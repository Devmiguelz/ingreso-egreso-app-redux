import { Action } from '@ngrx/store';
import { SET_USER, UNSET_USER } from '../types/auth.types';
import { User } from '../../model/user.model';

export class SetUserAction implements Action {
    readonly type = SET_USER;

    constructor(public user : User) { }
}

export class UnSetUserAction implements Action {
    readonly type = UNSET_USER;

    constructor() { }
}

export type ActionsUSER = SetUserAction | UnSetUserAction;