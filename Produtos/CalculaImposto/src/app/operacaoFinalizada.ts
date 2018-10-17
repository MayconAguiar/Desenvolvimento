import { ItemArquivo } from "./arquivos/itemArquivo";



export class OperacaoFinalizada {
    public operacaoDeEntrada: ItemArquivo;
    public operacaoDeSaida: ItemArquivo;
    

    constructor(operacaoDeEntrada: ItemArquivo, operacaoDeSaida: ItemArquivo) {
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