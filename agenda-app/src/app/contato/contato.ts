export class Contato {

    id: number;
    nome: string;
    fone: string;
    email: string;
    favorito: boolean;
    foto: any;
    
    constructor( nome: string, fone: string, email: string ) {
        this.nome = nome;
        this.fone = fone;
        this.email = email;
    }
    
}