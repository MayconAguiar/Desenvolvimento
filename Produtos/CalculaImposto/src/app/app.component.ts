import { Component } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

class Mes {
  titulo: string;
  ativo = false;
  constructor(titulo, ativo) {
    this.titulo = titulo;
    this.ativo = ativo;
  }
}


class Atributo {
  chave: string;
  valor: any;

  constructor (chave, valor) {
    this.chave = chave;
    this.valor = valor;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  lista = [];
  listaDeOperacao = [];
  keys = [];
  acoes = [];
  datas = [];
  dataSelecionada = '';
  acaoSelecionada = '';

  listaDeOperacaoFiltrada = [];

  // datas = [ new Mes('teste', true), new Mes('teste2', false) ];

  public changeListener(files: FileList) {

    const that = this;
    this.leiaArquivos(files).subscribe(
      x => {},
      x => {},
      () => {
        that.listaDeOperacao = this.processe(this.listaDeOperacao, this.datas, this.lista);
        this.keys = Object.keys(this.listaDeOperacao);
        console.log(this.datas);
    });

  }

  selecionaData(value) {
    this.dataSelecionada = value;
    debugger;
    this.listaDeOperacao.filter(function(el) {
      console.log(el);
      return true;
    });
  }

  selecionaAcao(value) {
    this.acaoSelecionada = value;
  }

  leiaArquivos(files: FileList) {
    return new Observable<any>(observer => {
      moment.locale('pt-br');
      // console.log(files);
      if (files && files.length > 0) {
          this.leiaArquivo(files, 0, observer);
          console.log(this.listaDeOperacao);
      } else {
        observer.complete();
      }
    });
  }

  leiaArquivo(files, index, observer: Subscriber<any>) {
    if (index >= files.length) {
      observer.complete();
    } else {
      const file: File = files.item(index);
      const reader: FileReader = new FileReader();
      reader.readAsText(file, 'ISO-8859-1');
      const that = this;
      reader.onload = (e) => {
            const csv = reader.result;
            index += 1;
            this.lista.push(that.csvJSON(csv));
            this.leiaArquivo(files, index, observer);
        };
      }
  }

  processe (operacoes, datas: any[], files) {
    moment.locale('pt-br');
    const ATIVO = 'Ativo';
    const DATA = 'Atualizado em';
    const input =  files;
    // return [ {teste: 'teste'} ];
    for (let i = 0; i < input.length; i++) {
        const item =  JSON.parse(input[i])[0];
        const nomeDoAtivo = item[ATIVO];
        const data = moment(item[DATA].substr(0, 10) , 'DD/MM/YYYY').format('MMMM/YYYY');

        if (datas.indexOf(data) === -1) {
          datas.push(data);
        }

        let itens: any[] = operacoes[nomeDoAtivo];


        if (!itens) {
          itens = [];
          operacoes[nomeDoAtivo] = itens;
        }

        itens.push(item);
    }

    return operacoes;
  }

  // keys(): Array<string> {
  //   return Object.keys(this.listaDeOperacao);
  // }

  obtenhaAtributo(key, uniqueList, obtenhaValor = (x) => new Atributo(x, x) ) {
    // const unique = {};
    // const uniqueList = [];
    const input =  this.lista;

    for (let i = 0; i < input.length; i++) {
        const item =  JSON.parse(input[i])[0];
        const atributo = obtenhaValor(item[key]);

        const existe = Object.keys(uniqueList).some(x => {
            return uniqueList[x].chave === atributo.chave;
        });

        if (!existe) {
          uniqueList.push(atributo);
        }
        // if (typeof unique[atributo.chave] === 'undefined') {
        //   unique[atributo.chave] = '';
        //   uniqueList.push(atributo);
        // }
    }
    // return uniqueList;
  }

    // var csv is the CSV file with headers
  csvJSON(csv) {
      const lines = csv.split('\n');
      const result = [];
      const headers = lines[0].split(';');

      for (let i = 1; i < lines.length; i++) {

        const obj = {};
        const currentline = lines[i].split(';');

        for (let j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j];
        }

        result.push(obj);

      }
      return JSON.stringify(result);
    }
  }
