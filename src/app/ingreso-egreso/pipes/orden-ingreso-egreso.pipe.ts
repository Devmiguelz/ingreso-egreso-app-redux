import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../../model/ingreso-egreso.model';

@Pipe({
  name: 'ordenIngresoEgreso'
})
export class OrdenIngresoEgresoPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    return items.slice().sort((a, b) => {
      if(a.tipo === 'ingreso') {
        return -1;
      } else { 
        return 1;
      }
    });
  }

}
