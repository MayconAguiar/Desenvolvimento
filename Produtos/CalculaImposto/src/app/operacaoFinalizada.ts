import { Operacao } from "./operacao";

export class OperacaoFinalizada {
    public operacaoDeEntrada: Operacao;
    public operacaoDeSaida: Operacao;
    

    constructor(operacaoDeEntrada: Operacao, operacaoDeSaida: Operacao) {
        this.operacaoDeSaida = operacaoDeSaida;
        this.operacaoDeEntrada = operacaoDeEntrada;
    }
    
    public lucroouprejuizo() {
        const valor = 
        (this.operacaoDeSaida.quantidade * this.operacaoDeSaida.preco) -
        (this.operacaoDeEntrada.quantidade * this.operacaoDeEntrada.preco);

        return valor;
    }
}