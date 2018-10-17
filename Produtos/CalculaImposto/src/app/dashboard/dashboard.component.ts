import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ItemDashboard } from '../negocio/ItemDashboard';
import { GerenciadorDeArquivos } from '../gerenciadores/gerenciadorDeArquivos';
import { Gerenciador } from '../gerenciadores/gerenciador';
import moment = require('moment');

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  items: ItemDashboard[] = [];
  original: ItemDashboard[] = [];

  ngOnInit() {
  }

  public mudouFiltro(mes) {
    // console.log('Mês selecionado');
    // console.log(mes);
    this.items = this.original.filter(x => x.saida.data !== undefined && x.saida.data.month() === Number(mes));

    // console.log(teste);
  }

  public changeListener(files: FileList) {

    const operacoes = new GerenciadorDeArquivos(files);
    operacoes.processe().subscribe(x => {
      this.items = new Gerenciador(x).obtenha();
      this.original = this.items;
    });
  }

}
