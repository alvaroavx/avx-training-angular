import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciaCreateComponent } from './asistencia-create.component';

describe('AsistenciaCreate', () => {
  let component: AsistenciaCreateComponent;
  let fixture: ComponentFixture<AsistenciaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsistenciaCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsistenciaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
