import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistDetalheComponent } from './playlist-detalhe.component';

describe('PlaylistDetalheComponent', () => {
  let component: PlaylistDetalheComponent;
  let fixture: ComponentFixture<PlaylistDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
