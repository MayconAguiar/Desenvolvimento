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
    

    public Data() {
        return this.data.format('DD/MM/YYYY');
    }
    public MesAno() {
        return this.data.format('MMMM/YYYY');
    }
}