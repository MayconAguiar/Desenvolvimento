import * as moment from 'moment';

export class Operacao {
    empresa: string;
    dataEntrada: moment.Moment;
    quantidade: number;
    preco: number;
}