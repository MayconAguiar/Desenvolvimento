import { Operacao } from "../operacao";
import { Ativo } from "./ativo";
import { templateJitUrl } from "@angular/compiler";
import { ProdutoAtivo } from "./produtoAtivo";
import { element } from "protractor";
import { elementClass } from "@angular/core/src/render3/instructions";
import { OperacaoConcluida } from "./operacaoConcluida";

export class ContaCorrente {
    private compra: Operacao[];
    private venda: Operacao[];
    private saldo: Ativo[] = [];
    private idsAtivos= [];
    private operacoesConcluidas = []

    constructor(compra: Operacao[], venda: Operacao[]){  
        this.compra = compra;
        this.venda = venda;      
    }

    processe() {
        this.ordene();
        this.inicieContaCorrente();

        this.idsAtivos.forEach(element => {
            // debugger;
            // const contaCorrenteDoAtivo = this.saldo.find(x => x.idDoAtivo == element);
            const entradasDoAtivo = this.compra.filter(x => x.empresa == element);
            const saidasDoAtivo = this.venda.filter(x => x.empresa == element);
            
            if (entradasDoAtivo.length > 0 && saidasDoAtivo.length > 0){
                const base = entradasDoAtivo[0].Data < saidasDoAtivo[0].Data?
                entradasDoAtivo[0] : saidasDoAtivo[0];
    
                const entradasDoDia = entradasDoAtivo.filter(x => base.Data == x.Data);
                const saidasDoDia = saidasDoAtivo.filter(x => base.Data == x.Data);
                console.log('entradasDoDia:');
                console.log(entradasDoDia);
                console.log('saidasDoDia:');
                console.log(saidasDoDia);
                const produtoEntrada = this.ObtenhaOProdutoDoAtivo(entradasDoDia);
                const produtoSaida = this.ObtenhaOProdutoDoAtivo(saidasDoDia);
    
                const operacaoConcluida = new OperacaoConcluida(produtoEntrada, produtoSaida, element);
                this.operacoesConcluidas.push(operacaoConcluida);
            }
        });

        return this.operacoesConcluidas;
    }

    private ObtenhaOProdutoDoAtivo(operacoes: Operacao[]){
        const produto = new ProdutoAtivo();
        
        operacoes.forEach(element => {
            produto.Adicione(element.quantidade, element.preco);
        })

        return produto;
    }

    // private EhDayTrade(
    //     entradasDoAtivo: Operacao[], 
    //     saidasDoAtivo: Operacao[]){

    //     const primeiraEntrada = entradasDoAtivo[0];
    //     const primeiraSaida = saidasDoAtivo[0];
        
    //     return primeiraEntrada.data === primeiraSaida.data;
    // }

    private inicieContaCorrente() {
        const operacoes = this.compra.concat(this.venda);
        
        operacoes.forEach(element => {
            if (this.idsAtivos.indexOf(element.empresa) === -1){
                this.idsAtivos.push(element.empresa);
                // const ativo = new Ativo();
                // ativo.idDoAtivo = element.empresa;
                // ativo.saldo = 0;
                // this.saldo.push()
            }
        });

        // for (let index = 0; index < operacoes.length; index++) {
        //     const valor = operacoes[index].empresa;
        //     if (this.idsAtivos.indexOf(valor) === -1){
        //         this.idsAtivos.push(valor);
        //     }
        // }
    }

    private ordene(){
        this.compra = this.compra.sort((a, b) => 
        a.empresa < b.empresa && a.codigo < b.codigo ? -1 : 1);
        
        this.venda = this.venda.sort((a, b) => 
        a.empresa < b.empresa && a.codigo < b.codigo ? -1 : 1);
    }
}