import { Component } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Operacoes } from './operacoes';
import { OperacoesFinalizadas } from './operacoesFinalizadas';

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
  dataSelecionada = '';
  acaoSelecionada = '';
  listaDeOperacao = [];
  listaDeOperacaoFinalizadas = [];
  datas = [];
  acoes = [];
  operacoes: Operacoes;
  valorTotalVenda = 0;

  listaDeOperacaoFiltrada = [];

  // datas = [ new Mes('teste', true), new Mes('teste2', false) ];

  public changeListener(files: FileList) {
    this.operacoes = new Operacoes(files);
    this.operacoes.processe().subscribe(x => {
      this.listaDeOperacao = x;
      this.datas = this.operacoes.obtenhaDatas();
      this.acoes = this.operacoes.obtenhaEmpresas();
      const item = this.operacoes.obtenhaOperacoesFinalizadas();
      this.listaDeOperacaoFinalizadas = item.lista;
      this.valorTotalVenda = item.valorDeVenda;
    });
  }

  filtre() {
    const retorno = this.operacoes.filtre(this.dataSelecionada, this.acaoSelecionada);
    this.listaDeOperacao = retorno.lista;
    this.listaDeOperacaoFinalizadas = retorno.finalizadas;
    this.valorTotalVenda = retorno.soma;
  }

  selecionaData(value) {
    this.dataSelecionada = value;
  }

  obtenhaDataFormatada(value){
    moment.locale('pt-br');
    return moment(value.substr(0, 10) , 'DD/MM/YYYY').format('MMMM/YYYY')
  }

  selecionaAcao(value) {
    this.acaoSelecionada = value;
  }
  }
