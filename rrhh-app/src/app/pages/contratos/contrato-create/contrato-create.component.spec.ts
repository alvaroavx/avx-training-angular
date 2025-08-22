import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratoCreateComponent } from './contrato-create.component';

describe('ContratoCreate', () => {
  let component: ContratoCreateComponent;
  let fixture: ComponentFixture<ContratoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContratoCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContratoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
