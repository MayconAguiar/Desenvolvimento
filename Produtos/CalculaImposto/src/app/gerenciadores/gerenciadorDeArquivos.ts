import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { Subscriber } from 'rxjs/Subscriber';
import { Arquivos } from '../arquivos/arquivos';

import { OperacoesFinalizadas } from '../operacoesFinalizadas';
import { ArquivosPDF } from '../arquivos/arquivosPDF';
import { OperacaoFinalizada } from '../operacaoFinalizada';
import { Taxas } from '../negocio/taxas';
import { ItemArquivo } from '../arquivos/itemArquivo';


export class GerenciadorDeArquivos {

    private files: FileList;
    private arquivos: Arquivos;
    private listaItensCsv: any[];
    private operacoes: ItemArquivo[] = [];
    private operacoesFinalizadas: OperacoesFinalizadas;

    // campos
    private ATIVO = 'Ativo';
    private DATA = 'Atualizado em';
    private QUANTIDADE = 'Qtd. Executada';
    private PRECO = 'Preço Médio';
    private NATUREZA = 'Natureza';
    private CODIGO = 'Código';

    constructor(files: FileList) {
        this.files = files;
    }

    public processe() {
        return new Observable<any>(observer => {
            const arq = new ArquivosPDF();

            arq.obtenhaLista(this.files)
            .subscribe(x => {
                this.operacoes = x;
            },
            err => { },
            () => {
                this.operacoes = this.operacoes.sort((a, b) => a.codigo < b.codigo ? -1 : 1);
                // this.processeInterno();
                observer.next(this.operacoes);
                observer.complete();
            });
        });
    }

    // public obtenhaOperacoes() {
    //     return this.operacoes;
    // }

    // public obtenhaEmpresas() {
    //     return this.obtenhaListaUnica(x => x.empresa);
    // }

    // public obtenhaDatas() {
    //     return this.obtenhaListaUnica(x => x.MesAno());
    // }

    // public obtenhaOperacoesFinalizadas(lista = this.operacoes) {
    //   this.operacoesFinalizadas = new OperacoesFinalizadas(lista);
    //   const listafinalizada = this.operacoesFinalizadas.processe();
    //   return { lista: listafinalizada, valorDeVenda : this.operacoesFinalizadas.obtenhaSoma(listafinalizada) };
    // }

    public obtenhaOperacoesFinalizadas2(lista = this.operacoes) {
        this.operacoesFinalizadas = new OperacoesFinalizadas(lista);
        const listafinalizada = this.operacoesFinalizadas.processe2(this.operacoesFinalizadas.operacoes);
        return listafinalizada;
    }

    // public filtre(data, empresa) {
    //     // const finalizadas = this.operacoesFinalizadas.filtre(data, empresa);
    //     // let lista = this.obtenhaOperacoesFiltradas(finalizadas);
    //     // const resultado = new GerenciadorDeResultados(finalizadas).obtenha();
    //     // // return { lista: lista, finalizadas: finalizadas, resultado: this.operacoesFinalizadas.obtenhaSoma(finalizadas) };
    //     // return { lista: lista, finalizadas: finalizadas, resultado: resultado };
    // }

    // public obtenhaOperacoesFiltradas(lista: OperacaoFinalizada[]) {
    //     let novaLista = [];
    //     for (let index = 0; index < lista.length; index++) {
    //         const element = lista[index];
    //         novaLista.push(element.operacaoDeEntrada);
    //         novaLista.push(element.operacaoDeSaida);
    //     }

    //     novaLista = novaLista.sort((a, b) => a.codigo < b.codigo ? -1 : 1);

    //     return novaLista;
    // }

    // private filtreinterno(atributoDaOperacao, valorDoFiltro, array){
    //     const listaDeValores = [];

    //     for (let index = 0; index < array.length; index++) {
    //         const element: Operacao = array[index];
    //         const valor = atributoDaOperacao(element);
    //         if (valor === valorDoFiltro) {
    //             listaDeValores.push(element);
    //         }
    //     }

    //     return listaDeValores;
    // }


    // private obtenhaListaUnica(atributoDaOperacao, array = this.operacoes){
    //     const listaValoresChaves = [];

    //     for (let index = 0; index < array.length; index++) {
    //         const element: Operacao = array[index];
    //         const valor = atributoDaOperacao(element);
    //         if (listaValoresChaves.indexOf(valor) === -1){
    //             listaValoresChaves.push(valor);
    //         }
    //     }

    //     return listaValoresChaves;
    // }

    // private processeInterno () {
    //     for (let i = 0; i < this.listaItensCsv.length; i++) {

    //         const lista =  JSON.parse(this.listaItensCsv[i]);

    //         for (let j = 0; j < lista.length; j++) {
    //             const item = lista[j];
    //             const operacao = new Operacao();
    //             operacao.data = this.obtenhaDataFormatada(item[this.DATA]);
    //             operacao.empresa = item[this.ATIVO];
    //             operacao.quantidade = item[this.QUANTIDADE];
    //             operacao.preco = item[this.PRECO];
    //             operacao.natureza = item[this.NATUREZA];
    //             operacao.codigo = item[this.CODIGO];
    //             operacao.taxas = new Taxas(operacao);

    //             this.operacoes.push(operacao);
    //         }
    //     }
    //     this.operacoes = this.operacoes.sort((a, b) => a.codigo < b.codigo ? -1 : 1);
    //   }

    //   private obtenhaDataFormatada(value) {
    //     moment.locale('pt-br');
    //     return moment(value.substr(0, 10) , 'DD/MM/YYYY');
    //   }
 }
