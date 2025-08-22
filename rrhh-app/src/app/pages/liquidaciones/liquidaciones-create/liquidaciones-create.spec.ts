import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquidacionesCreate } from './liquidaciones-create';

describe('LiquidacionesCreate', () => {
  let component: LiquidacionesCreate;
  let fixture: ComponentFixture<LiquidacionesCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiquidacionesCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiquidacionesCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
