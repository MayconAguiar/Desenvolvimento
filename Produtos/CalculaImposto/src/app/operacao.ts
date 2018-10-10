import * as moment from 'moment';

export class Operacao {
    codigo: number;
    empresa: string;
    data: moment.Moment;
    quantidade: number;
    preco: number;
    natureza: string;

    public Data() {
        return this.data.format('DD/MM/YYYY');
    }
    public MesAno() {
        return this.data.format('MMMM/YYYY');
    }
}