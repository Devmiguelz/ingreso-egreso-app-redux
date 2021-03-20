import { IngresoEgresoState } from '../state/ingreso-egreso.state';
import { SET_ITEMS, UNSET_ITEMS } from '../types/ingreso-egreso.types';
import { ActionsMOV } from '../actions/ingreso-egreso.action';

const estadoInicial: IngresoEgresoState = { items: [] };

export function IngresoEgresoReducer(state = estadoInicial, action: ActionsMOV): IngresoEgresoState {

    switch (action.type) {

        case SET_ITEMS:
            return {
                items: [
                    ...action.items.map(item => {
                        return { 
                            ...item 
                        };
                    })
                ]
            };

        case UNSET_ITEMS:
            return { 
                items: []
            };

        default:
            return state;
    }
}