import { Observable } from "rxjs/Observable";
import * as moment from 'moment';
import { Subscriber } from "rxjs/Subscriber";
import { Arquivos } from "./arquivos";
import { Operacao } from "./operacao";
import { debug } from "util";

export class Operacoes {
    
    private files: FileList;
    private arquivos: Arquivos;
    private listaItensCsv: any[];
    private operacoes: Operacao[] = [];
    
    //campos
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
            this.arquivos = new Arquivos();
            this.arquivos.obtenhaLista(this.files)
            .subscribe( x=>{
                this.listaItensCsv = x;
            },
            err =>{},
            () => {
                this.processeInterno();
                observer.next(this.operacoes);
                observer.complete();
            });
        });        
    }

    public obtenhaOperacoes() {
        return this.operacoes;
    }

    public obtenhaEmpresas() {
        return this.obtenhaListaUnica(x => x.empresa);
    }

    public obtenhaDatas() {
        return this.obtenhaListaUnica(x => x.MesAno());
    }

    public filtre(data, empresa) {        
        let lista = this.filtreinterno(x => x.MesAno(), data, this.operacoes);
        return empresa ==='Todas' ? lista : this.filtreinterno(x => x.empresa, empresa, lista);
    }

    private filtreinterno(atributoDaOperacao, valorDoFiltro, array){
        const listaDeValores = []

        for (let index = 0; index < array.length; index++) {
            const element: Operacao = array[index];
            const valor = atributoDaOperacao(element);
            if (valor === valorDoFiltro){
                listaDeValores.push(element)
            }
        }

        return listaDeValores;
    }


    private obtenhaListaUnica(atributoDaOperacao, array = this.operacoes){
        // debugger;
        const listaValoresChaves = []

        for (let index = 0; index < array.length; index++) {
            const element: Operacao = array[index];
            const valor = atributoDaOperacao(element);
            if (listaValoresChaves.indexOf(valor) === -1){
                listaValoresChaves.push(valor)
            }
        }

        return listaValoresChaves;
    }

    private processeInterno () {

        for (let i = 0; i < this.listaItensCsv.length; i++) {
            const item =  JSON.parse(this.listaItensCsv[i])[0];
            const nomeDoAtivo = item[this.ATIVO];

            const operacao = new Operacao();
            operacao.data = this.obtenhaDataFormatada(item[this.DATA]);
            operacao.empresa = item[this.ATIVO];
            operacao.quantidade = item[this.QUANTIDADE];
            operacao.preco = item[this.PRECO];
            operacao.natureza = item[this.NATUREZA];
            operacao.codigo = item[this.CODIGO];

            this.operacoes.push(operacao);
        }

        this.operacoes = this.operacoes.sort((a, b) => a.codigo < b.codigo ? -1 : 1);
      }

      private obtenhaDataFormatada(value){
        moment.locale('pt-br');
        return moment(value.substr(0, 10) , 'DD/MM/YYYY');
        //.format('MMMM/YYYY')
      }

    
 }