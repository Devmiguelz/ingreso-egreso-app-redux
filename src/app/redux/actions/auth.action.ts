import { Action } from '@ngrx/store';
import { SET_USER } from '../types/auth.types';
import { User } from '../../model/user.model';

export class SetUserAction implements Action {
    readonly type = SET_USER;

    constructor(public user : User) { }
}

export type ActionsUSER = SetUserAction;