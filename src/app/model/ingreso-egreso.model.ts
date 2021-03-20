

export interface IngresoEgreso {
    descripcion: string;
    monto: number;
    tipo: tipoMonto;
    uid?: string;
}

export type tipoMonto = "ingreso" | "egreso";