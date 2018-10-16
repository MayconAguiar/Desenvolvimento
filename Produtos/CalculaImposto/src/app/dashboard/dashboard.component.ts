import { Component, OnInit, Input } from '@angular/core';
import { OperacaoCompleta } from '../negocio/OperacaoCompleta';
import { Operacoes } from '../operacoes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  @Input() items: OperacaoCompleta[] = [];

  ngOnInit() {
  }

  public changeListener(files: FileList) {

    const operacoes = new Operacoes(files);
    operacoes.processe().subscribe(x => {

      this.items = operacoes.obtenhaOperacoesFinalizadas2(x);
      console.log(this.items);
    });
  }

}