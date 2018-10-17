import * as moment from 'moment';
import { OperacaoFinalizada } from '../operacaoFinalizada';
import { Taxas } from './taxas';

export class Resultado {
    // referencia: moment.Moment;
    totalVendido: number;
    impostoAPagar: number;
    resultado: number;
    // taxaDeEntrada: Taxas;
    // taxaDeSaida: Taxas;

    constructor() {
        this.totalVendido = 0;
        this.resultado = 0;
    }
    public adicioneOperacaoFinalizada(element: OperacaoFinalizada) {
        this.resultado += element.lucroouprejuizo();
        this.totalVendido = this.totalVendido + (element.operacaoDeSaida.preco * element.operacaoDeSaida.quantidade);
    }
}