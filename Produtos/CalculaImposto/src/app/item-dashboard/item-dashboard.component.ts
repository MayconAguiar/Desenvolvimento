import { Component, OnInit, Input } from '@angular/core';
import { OperacaoCompleta } from '../negocio/OperacaoCompleta';

@Component({
  selector: 'app-item-dashboard',
  templateUrl: './item-dashboard.component.html',
  styleUrls: ['./item-dashboard.component.scss']
})
export class ItemDashboardComponent implements OnInit {

  @Input() item: OperacaoCompleta;

  constructor() { }

  ngOnInit() {
  }

}
