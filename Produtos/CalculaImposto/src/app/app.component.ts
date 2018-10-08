import { Component } from '@angular/core';
import * as moment from 'moment';

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
  acoes = [];
  datas = [ ];
  // datas = [ new Mes('teste', true), new Mes('teste2', false) ];

  public changeListener(files: FileList) {
    moment.locale('pt-br');
    // console.log(files);
    if (files && files.length > 0) {
       for (let index = 0; index < files.length; index++) {

         const file: File = files.item(index);
         const reader: FileReader = new FileReader();
         reader.readAsText(file, 'ISO-8859-1');
         reader.onload = (e) => {
            const csv = reader.result;
            this.lista.push(this.csvJSON(csv));
            this.obtenhaAtributo('Ativo', this.acoes);

            this.obtenhaAtributo('Atualizado em', this.datas, (x) => {
               const data = moment(x.substr(0, 10) , 'DD/MM/YYYY');
               const mes = new Mes(data.format('MMMM/YYYY'), index === 0);
               return new Atributo(mes.titulo, mes);
            });

            console.log(this.datas);
         };
      }
    }

  }

  obtenhaAtributo(key, uniqueList, obtenhaValor = (x) => new Atributo(x, x) ) {
    //const unique = {};
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
