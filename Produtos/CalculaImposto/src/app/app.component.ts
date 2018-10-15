import { Component } from '@angular/core';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Operacoes } from './operacoes';
import { OperacoesFinalizadas } from './operacoesFinalizadas';
import { Resultado } from './resultados/resultado';
import { GerenciadorDeResultados } from './resultados/gerenciadorDeResultados';

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
  operacoes : Operacoes;
  resultado : Resultado;
  exibirOperacoes = false;

  listaDeOperacaoFiltrada = [];

  // datas = [ new Mes('teste', true), new Mes('teste2', false) ];

  public changeListener(files: FileList) {
    this.operacoes = new Operacoes(files);
    const that = this;
    this.operacoes.processe().subscribe(x => {
      this.listaDeOperacaoFiltrada = x;
      this.datas = this.operacoes.obtenhaDatas();
      this.acoes = this.operacoes.obtenhaEmpresas();
      
      
      // this.dataSelecionada = this.datas[this.datas.length - 1];
      this.acaoSelecionada = "Todas";
         
      const operacoesFinalizadas = this.operacoes.obtenhaOperacoesFinalizadas();
      this.listaDeOperacaoFinalizadas = operacoesFinalizadas.lista;
      this.resultado = new GerenciadorDeResultados(operacoesFinalizadas.lista).obtenha();
    });
  }
  ExibirOperacoes(exibir){
    this.exibirOperacoes = exibir;
  }
  filtre() {
    const resultadoDoFiltro = this.operacoes.filtre(this.dataSelecionada, this.acaoSelecionada);
    this.listaDeOperacaoFiltrada = resultadoDoFiltro.lista;
    this.listaDeOperacaoFinalizadas = resultadoDoFiltro.finalizadas;

    this.resultado = resultadoDoFiltro.resultado;
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
