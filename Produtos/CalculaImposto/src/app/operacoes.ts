import { Observable } from "rxjs/Observable";
import * as moment from 'moment';
import { Subscriber } from "rxjs/Subscriber";
import { Arquivos } from "./arquivos";
import { Operacao } from "./operacao";

export class Operacoes {
    
    private files: FileList;
    private arquivos: Arquivos;
    private listaItensCsv: any[];
    public operacoes;
    
    //campos
    ATIVO = 'Ativo';
    DATA = 'Atualizado em';
    QUANTIDADE = 'Qtd. Executada';
    PRECO = 'Preço Médio';

    constructor(files: FileList) {
        this.files = files;
    }

    public processe() {
        this.arquivos = new Arquivos();
        this.arquivos.obtenhaLista(this.files)
        .subscribe( x=>{
            this.listaItensCsv = x;
        },
        err =>{},
        () => {
            this.processeInterno();
        });
    }

    private processeInterno () {

        for (let i = 0; i < this.listaItensCsv.length; i++) {
            const item =  JSON.parse(this.listaItensCsv[i])[0];
            const nomeDoAtivo = item[this.ATIVO];

            const operacao = new Operacao();
            operacao.dataEntrada = this.obtenhaDataFormatada(item[this.DATA]);
            operacao.empresa = item[this.ATIVO];
            operacao.quantidade = item[this.QUANTIDADE];
            operacao.preco = item[this.PRECO];

            this.operacoes.push(item);
        }
      }

      private obtenhaDataFormatada(value){
        moment.locale('pt-br');
        return moment(value.substr(0, 10) , 'DD/MM/YYYY');
        //.format('MMMM/YYYY')
      }

    
 }