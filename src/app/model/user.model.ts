
export class User {
    
    uid: string;
    email: string;
    nombre: string;

    constructor(uid: string, email: string, nombre: string) {
        this.uid = uid;
        this.email = email;
        this.nombre = nombre;
    }
 }