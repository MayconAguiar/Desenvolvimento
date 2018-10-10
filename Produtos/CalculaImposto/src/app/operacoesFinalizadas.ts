import { Operacao } from "./operacao";
import { OperacaoFinalizada } from "./operacaoFinalizada";

export class OperacoesFinalizadas{
    private operacoes: Operacao[] = [];
    private entradas: Operacao[] = [];
    private saidas: Operacao[] =[];
    private operacoesFinalizadas : OperacaoFinalizada[] = [];
    
    constructor(operacoes: Operacao[]){
        this.operacoes = operacoes;
        this.entradas = [];
        this.saidas = [];
    }

    processe()  {
        for (let index = 0; index < this.operacoes.length; index++) {
            const element = this.operacoes[index];
            const entrada = this.entradas.find(x => x.empresa == element.empresa);
            const saida = this.saidas.find(x => x.empresa == element.empresa);
            
            if (entrada) {
                // segunda compra por exemplo
                if (entrada.natureza == element.natureza) {
                    this.entradas.push(element);
                } else {
                    this.saidas.push(element);
                    this.retireElementoFinalizado(element);
                }
            } else {
                this.entradas.push(element);                
            }
        }

        return this.operacoesFinalizadas;
    }

    retireElementoFinalizado(element: Operacao) {
        const entradas = this.entradas.filter(x => x.empresa == element.empresa);
        const saidas = this.entradas.filter(x => x.empresa == element.empresa);
        const saidasFinalizadas = [];
        const entradasFinalizadas = [];

        for (let i = 0; i < entradas.length; i++) {
            const entrada = entradas[i];
            let soma = entrada.quantidade;
            
            for (let j = 0; j < saidas.length; j++) {
                const saida = saidas[j];
                soma -= saida.quantidade;
                // finalizou a entrada
                if (soma ==0)  {
                    const operacaoFinalizada = new OperacaoFinalizada(entrada, saida);
                    this.operacoesFinalizadas.push(operacaoFinalizada);
                    entradasFinalizadas.push(i);
                    saidasFinalizadas.push(j);
                    continue;
                }
            }

            this.remove(saidasFinalizadas,  saidas);
        }

        this.remove(entradasFinalizadas, entradas);
    }

    remove(listaIndices, lista) {
        for (let index = 0; index < listaIndices.length; index++) {
            const element = listaIndices[index];
            lista.splice(element, 1);
        }
    }
}