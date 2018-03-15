import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrosselFotosItemComponent } from './carrossel-fotos-item.component';

describe('CarrosselFotosItemComponent', () => {
  let component: CarrosselFotosItemComponent;
  let fixture: ComponentFixture<CarrosselFotosItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarrosselFotosItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarrosselFotosItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
