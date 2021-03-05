export const ExpRegularEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;

export interface UsuarioRegister {
    email: string;
    nombre: string;
    password: string;
}

export interface UsuarioLogin {
    email: string;
    password: string;
}
