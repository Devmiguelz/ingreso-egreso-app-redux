import { IngresoEgreso } from 'src/app/model/ingreso-egreso.model';
import { AppState } from '../app.reducers';

export interface IngresoEgresoState {
    items: IngresoEgreso[];
}

export interface IngresoEgresoAppState extends AppState {
    ingresoEgreso: IngresoEgresoState;
}