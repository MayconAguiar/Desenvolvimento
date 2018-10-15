import { Operacao } from "./operacao";

export class OperacaoFinalizada {
    public operacaoDeEntrada: Operacao;
    public operacaoDeSaida: Operacao;
    

    constructor(operacaoDeEntrada: Operacao, operacaoDeSaida: Operacao) {
        this.operacaoDeSaida = operacaoDeSaida;
        this.operacaoDeEntrada = operacaoDeEntrada;
    }
    
    public lucroouprejuizo() {
        const valor = this.valorDeVenda() - this.valorDeCompra();

        return valor;
    }
    public valorDeCompra() {
        return this.operacaoDeEntrada.quantidade * this.operacaoDeEntrada.preco;
    }
    public valorDeVenda() {
        return this.operacaoDeSaida.quantidade * this.operacaoDeSaida.preco;
    }

    public impostoDeRendaRetidoNaFonte() {
        // =IF(M5>0;((K5*J5))*0,00005;0)
        const teveLucro = this.lucroouprejuizo() > 0;        
        const iprf = this.valorDeVenda() * 0.00005;
        return teveLucro && iprf > 1? iprf : 0;
    }
}