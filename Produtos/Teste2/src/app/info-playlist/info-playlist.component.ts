import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-info-playlist',
  templateUrl: './info-playlist.component.html',
  styleUrls: ['./info-playlist.component.css']
})
export class InfoPlaylistComponent implements OnInit {

  id: number;
  private sub: any;
  @Input() quantidade : number;

  constructor() { }

  ngOnInit() {
  }
}
