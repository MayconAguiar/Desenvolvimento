export class ProdutoAtivo{
    private quantidadedeacoes= 0;
    private quantidadeDeCompras = 0;
    private valor= 0; 

    Adicione(quantidadeDeAcoes, total) {
        this.quantidadedeacoes += quantidadeDeAcoes;
        this.valor += total;
        this.quantidadeDeCompras ++;

    }
    
    QuantidadeCompras() {
        return this.quantidadeDeCompras;
    }

    QuantidadeDeAcoes() {
        return this.quantidadedeacoes;
    }

    ValorMedio() {
        return this.valor / this.quantidadeDeCompras;
    }
}