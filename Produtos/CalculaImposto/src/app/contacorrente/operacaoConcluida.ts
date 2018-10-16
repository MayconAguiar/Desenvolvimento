import { ItemOperacaoConcluida } from "./itemOperacaoConcluida";
import { Ativo } from "./ativo";
import { ProdutoAtivo } from "./produtoAtivo";

export class OperacaoConcluida {
    ativo: Ativo;
    descricao: string;
    entrada: ProdutoAtivo;
    saida: ProdutoAtivo;
    
    constructor(entrada :ProdutoAtivo, saida: ProdutoAtivo, idDoAtivo: string) {
        this.entrada = entrada;
        this.saida = saida;
        this.ativo = new Ativo();
        this.ativo.idDoAtivo = idDoAtivo;
        

        if (entrada.QuantidadeDeAcoes >= saida.QuantidadeDeAcoes){
            this.TrateComprado();
        } else {
            this.TrateVendido();
        }
        
        this.ativo.quantidade = Math.abs(entrada.QuantidadeDeAcoes() - saida.QuantidadeDeAcoes());
        this.ativo.valor = Math.abs(entrada.ValorMedio() - entrada.ValorMedio());
    }

    private TrateComprado() {   
        this.descricao = 'Comprado';
        this.ativo.quantidade = this.entrada.QuantidadeDeAcoes() - this.saida.QuantidadeDeAcoes()
        this.ativo.valor = this.entrada.ValorMedio();
    }

    private TrateVendido() {
        this.descricao = 'Vendido';
        this.ativo.quantidade = this.saida.QuantidadeDeAcoes() - this.entrada.QuantidadeDeAcoes()
        this.ativo.valor = this.saida.ValorMedio();
    }

}