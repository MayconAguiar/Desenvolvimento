import * as moment from 'moment';
import { Taxas } from './resultados/taxas';

export class Operacao {
    codigo: number;
    empresa: string;
    data: moment.Moment;
    quantidade: number;
    preco: number;
    natureza: string;
    taxas: Taxas;
    origem: string[];
    

    public Data(formato: string ='DD/MM/YYYY') {
        return this.data.format(formato);
    }
    public MesAno() {
        return this.data.format('MMMM/YYYY');
    }
}