import { Operacao } from './operacao';
import { OperacaoFinalizada } from './operacaoFinalizada';

export class OperacoesFinalizadas{
    private operacoes: Operacao[] = [];
    private entradas: Operacao[] = [];
    private saidas: Operacao[] = [];
    private operacoesFinalizadas: OperacaoFinalizada[] = [];

    constructor(operacoes: Operacao[]){
        this.operacoes = operacoes;
        this.entradas = [];
        this.saidas = [];
    }

    processe()  {
        
        for (let index = 0; index < this.operacoes.length; index++) {
            const element = this.operacoes[index];
            const entrada = this.entradas.find(x => x.empresa === element.empresa);
            // const saida = this.saidas.find(x => x.empresa == element.empresa);

            if (element.natureza === 'Venda') {
                this.saidas.push(element);
                if (entrada) {
                    this.retireElementoFinalizado(element);
                }
            } else {
                this.entradas.push(element);
            }

            // verificar e corrigir o algoritmo para quando não tem compra

            // if (entrada) {
            //     // segunda compra por exemplo
            //     if (entrada.natureza === element.natureza) {
            //         this.entradas.push(element);
            //     } else {
            //         this.saidas.push(element);
            //         this.retireElementoFinalizado(element);
            //     }
            // } else {
            //     this.entradas.push(element);
            // }
        }

        return this.operacoesFinalizadas;
    }

    public filtre(data, empresa) {
        let lista = data === 'Todos' ? this.operacoesFinalizadas :
        this.filtreinterno(x => x.operacaoDeSaida.MesAno(), data, this.operacoesFinalizadas);
        lista = empresa === 'Todas' ? lista : this.filtreinterno(x => x.operacaoDeSaida.empresa, empresa, lista);
        return lista;
    }

    public obtenhaSoma(array: OperacaoFinalizada[]) {
        let soma = 0;
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            soma = soma + (element.operacaoDeSaida.preco * element.operacaoDeSaida.quantidade);
        }

        return soma;
    }

    private filtreinterno(atributoDaOperacao, valorDoFiltro, array){
        const listaDeValores = [];

        for (let index = 0; index < array.length; index++) {
            const element: Operacao = array[index];
            const valor = atributoDaOperacao(element);
            if (valor === valorDoFiltro) {
                listaDeValores.push(element);
            }
        }

        return listaDeValores;
    }


    retireElementoFinalizado(element: Operacao) {        
        const entradas = this.entradas.filter(x => x.empresa === element.empresa);
        const saidas = this.saidas.filter(x => x.empresa === element.empresa);
        const saidasFinalizadas = [];
        const entradasFinalizadas = [];

        for (let i = 0; i < entradas.length; i++) {
            const entrada = entradas[i];
            let soma = entrada.quantidade;

            for (let j = 0; j < saidas.length; j++) {
                const saida = saidas[j];
                soma -= saida.quantidade;
                // finalizou a entrada
                if (soma === 0 )  {
                    const operacaoFinalizada = new OperacaoFinalizada(entrada, saida);
                    this.operacoesFinalizadas.push(operacaoFinalizada);
                    entradasFinalizadas.push(entrada.codigo);
                    saidasFinalizadas.push(saida.codigo);
                    break;
                }
            }

            this.remove(saidasFinalizadas, this.saidas);
        }

        this.remove(entradasFinalizadas, this.entradas);
    }

    remove(listaDeCodigos: any[], lista: Operacao[]) {
        for (let index = 0; index < listaDeCodigos.length; index++) {
            const index = lista.findIndex(x => x.codigo == listaDeCodigos[index])            
            lista = lista.splice(index, 1);
        }
        listaDeCodigos = [];
    }
}