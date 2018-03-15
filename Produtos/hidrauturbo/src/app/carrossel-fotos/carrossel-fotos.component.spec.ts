import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrosselFotosComponent } from './carrossel-fotos.component';

describe('CarrosselFotosComponent', () => {
  let component: CarrosselFotosComponent;
  let fixture: ComponentFixture<CarrosselFotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrosselFotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrosselFotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
