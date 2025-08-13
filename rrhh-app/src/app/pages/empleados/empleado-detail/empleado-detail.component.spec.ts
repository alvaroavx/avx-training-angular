import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoDetailComponent } from './empleado-detail.component';

describe('EmpleadoDetail', () => {
  let component: EmpleadoDetailComponent;
  let fixture: ComponentFixture<EmpleadoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadoDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
