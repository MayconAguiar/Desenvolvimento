import { Operacao } from "./operacao";

export class OperacaoFinalizada {
    public operacaoDeEntrada: Operacao;
    public operacaoDeSaida: Operacao;

    constructor(operacaoDeEntrada: Operacao, operacaoDeSaida: Operacao) {
        this.operacaoDeSaida = operacaoDeSaida;    
        this.operacaoDeEntrada = operacaoDeEntrada;
    }
}