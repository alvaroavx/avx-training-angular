import { Component } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { EmpleadoService } from '../../../core/services/internal/empleado.service';

@Component({
  standalone: true,
  selector: 'app-empleado-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './empleado-create.component.html',
  styleUrl: './empleado-create.component.css'
})

export class EmpleadoCreateComponent {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private empleadoService: EmpleadoService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      rut: ['', [Validators.required, this.validarRut]],
      email: ['', [Validators.required, Validators.email]],
      cargo: ['', Validators.required],
      estado: ['Activo', Validators.required],
      comuna: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const nuevoEmpleado = this.form.value;
    this.empleadoService.create(nuevoEmpleado).subscribe(() => {
      this.form.reset({ estado: 'Activo' });
      alert('Empleado creado correctamente');
    });
  }

  validarRut(control: AbstractControl): ValidationErrors | null {
    const rut = control.value?.toString().replace(/\./g, '').replace('-', '');
    if (!rut || rut.length < 2) return { dvInvalido: true };

    const cuerpo = rut.slice(0, -1);
    const dv = rut.slice(-1).toUpperCase();

    let suma = 0;
    let multiplo = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo[i], 10) * multiplo;
      multiplo = multiplo < 7 ? multiplo + 1 : 2;
    }

    const dvEsperado = 11 - (suma % 11);
    const dvCalc = dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : dvEsperado.toString();

    return dv === dvCalc ? null : { dvInvalido: true };
  }
}
