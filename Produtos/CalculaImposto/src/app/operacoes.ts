import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { Subscriber } from 'rxjs/Subscriber';
import { Arquivos } from './arquivos';
import { Operacao } from './operacao';
import { OperacoesFinalizadas } from './operacoesFinalizadas';

export class Operacoes {

    private files: FileList;
    private arquivos: Arquivos;
    private listaItensCsv: any[];
    private operacoes: Operacao[] = [];
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
            this.arquivos = new Arquivos();
            this.arquivos.obtenhaLista(this.files)
            .subscribe(x => {
                this.listaItensCsv = x;
            },
            err => { },
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

    public obtenhaOperacoesFinalizadas(lista = this.operacoes) {
      this.operacoesFinalizadas = new OperacoesFinalizadas(lista);
      const listafinalizada = this.operacoesFinalizadas.processe();
      return { lista: listafinalizada, valorDeVenda : this.operacoesFinalizadas.obtenhaSoma(listafinalizada) };
    }

    public filtre(data, empresa) {
        let lista = data === 'Todos' ? this.operacoes : this.filtreinterno(x => x.MesAno(), data, this.operacoes);
        lista = empresa === 'Todas' ? lista : this.filtreinterno(x => x.empresa, empresa, lista);
        const finalizadas = this.operacoesFinalizadas.filtre(data, empresa);
        return { lista: lista, finalizadas: finalizadas, soma: this.operacoesFinalizadas.obtenhaSoma(finalizadas) };
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


    private obtenhaListaUnica(atributoDaOperacao, array = this.operacoes){
        const listaValoresChaves = [];

        for (let index = 0; index < array.length; index++) {
            const element: Operacao = array[index];
            const valor = atributoDaOperacao(element);
            if (listaValoresChaves.indexOf(valor) === -1){
                listaValoresChaves.push(valor);
            }
        }

        return listaValoresChaves;
    }

    private processeInterno () {
        for (let i = 0; i < this.listaItensCsv.length; i++) {

            const lista =  JSON.parse(this.listaItensCsv[i]);

            for (let j = 0; j < lista.length; j++) {
                const item = lista[j];
                const operacao = new Operacao();
                operacao.data = this.obtenhaDataFormatada(item[this.DATA]);
                operacao.empresa = item[this.ATIVO];
                operacao.quantidade = item[this.QUANTIDADE];
                operacao.preco = item[this.PRECO];
                operacao.natureza = item[this.NATUREZA];
                operacao.codigo = item[this.CODIGO];

                this.operacoes.push(operacao);
            }
        }
        this.operacoes = this.operacoes.sort((a, b) => a.codigo < b.codigo ? -1 : 1);
      }

      private obtenhaDataFormatada(value) {
        moment.locale('pt-br');
        return moment(value.substr(0, 10) , 'DD/MM/YYYY');
        // if (value == null || value === ''){
        //     debugger;
        //     console.log('teste');
        // } else {
        // }
      }
 }
