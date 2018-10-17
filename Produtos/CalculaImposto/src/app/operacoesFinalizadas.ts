import { OperacaoFinalizada } from './operacaoFinalizada';
import { Gerenciador } from './gerenciadores/gerenciador';
import { ItemArquivo } from './arquivos/itemArquivo';

export class OperacoesFinalizadas{
    public operacoes: ItemArquivo[] = [];
    private entradas: ItemArquivo[] = [];
    private saidas: ItemArquivo[] = [];
    private operacoesFinalizadas: OperacaoFinalizada[] = [];

    constructor(operacoes: ItemArquivo[]){
        this.operacoes = operacoes;
        this.entradas = [];
        this.saidas = [];
    }

    // processe()  {

    //     for (let index = 0; index < this.operacoes.length; index++) {
    //         const element = this.operacoes[index];
            
    //         if (element.natureza === 'V') {
    //             this.saidas.push(element);
            
    //         } else {
    //             this.entradas.push(element);
    //         }

            
    //     }
        
    //     return this.operacoesFinalizadas;
    // }

    processe2(operacoes)  {

        for (let index = 0; index < operacoes.length; index++) {
            const element = operacoes[index];
            // const entrada = this.entradas.find(x => x.empresa === element.empresa);
            // const saida = this.saidas.find(x => x.empresa == element.empresa);

            if (element.natureza === 'V') {
                this.saidas.push(element);
                // if (entrada) {
                //     this.retireElementoFinalizado(element);
                // }
            } else {
                this.entradas.push(element);
            }
        }

        return new Gerenciador(this.entradas, this.saidas).obtenha();
    }

    public filtre(data, empresa) {
        let lista = data === 'Todos' ? this.operacoesFinalizadas :
        this.filtreinterno(x => 
            x.operacaoDeSaida.MesAno(), data, this.operacoesFinalizadas);
        lista = empresa === 'Todas' ? lista : 
            this.filtreinterno(x => x.operacaoDeSaida.empresa, empresa, lista);
        return lista;
    }

    private filtreinterno(atributoDaOperacao, valorDoFiltro, array: OperacaoFinalizada[]){
        const listaDeValores:OperacaoFinalizada[] = [];

        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            const valor = atributoDaOperacao(element);
            if (valor === valorDoFiltro) {
                listaDeValores.push(element);
            }
        }

        return listaDeValores;
    }


    public obtenhaSoma(array: OperacaoFinalizada[]) {
        let soma = 0;
        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            soma = soma + (element.operacaoDeSaida.preco * element.operacaoDeSaida.quantidade);
        }

        return soma;
    }

    

    retireElementoFinalizado() {        
        //const entradas = this.entradas.filter(x => x.empresa === element.empresa);
        //const saidas = this.saidas.filter(x => x.empresa === element.empresa);
        const saidasFinalizadas = [];
        const entradasFinalizadas = [];
        

        for (let i = 0; i < this.entradas.length; i++) {
            const entrada = this.entradas[i];
            let soma = entrada.quantidade;
            
            const saidas = this.saidas.filter(x => x.empresa === entrada.empresa);

            for (let j = 0; j < saidas.length; j++) {
                const saida = this.saidas[j];

                if ((soma - saida.quantidade) >= 0 ){
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
                
            }

            
            this.remove(saidasFinalizadas, this.saidas);
        }

        //this.remove(entradasFinalizadas, this.entradas);
    }

    remove(listaDeCodigos: any[], lista: ItemArquivo[]) {
        for (let index = 0; index < listaDeCodigos.length; index++) {
            const index = lista.findIndex(x => x.codigo == listaDeCodigos[index])            
            lista = lista.splice(index, 1);
        }
        listaDeCodigos = [];
    }
}