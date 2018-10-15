import { OperacaoFinalizada } from "../operacaoFinalizada";
import { Operacao } from "../operacao";

export class Taxas {
    
    private operacao: Operacao;
    taxaDeLiquidacao = 0;
    emolumentos = 0;
    corretagem = 0.80;
    iss = 0;
    total = 0;

    constructor(operacaoFinalizada: Operacao) {
        this.operacao = operacaoFinalizada;
        this.construa();
    }

    
    private construa(){
        const valorDaOperacao = this.operacao.quantidade * this.operacao.preco;

        this.taxaDeLiquidacao = valorDaOperacao*(0.0275/100);
        this.emolumentos = valorDaOperacao*0.00004829;
        this.iss = this.corretagem * (9.65/100);
        this.total = this.taxaDeLiquidacao + this.emolumentos + this.iss + this.corretagem;
    }
}