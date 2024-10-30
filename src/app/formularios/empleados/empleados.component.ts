import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  standalone: true,
  styleUrls: ['./empleados.component.css'],
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
})
export default class EmpleadosComponent implements OnInit {
  formulario: FormGroup;
  empleados: any[] = [];
  empleadoSeleccionado: any = null;
  totalGeneral: number = 0;
  mostrarTabla = false;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      matricula: ['', Validators.required],
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      edad: ['', [Validators.required, Validators.min(18)]],
      horas: ['', [Validators.required, Validators.min(0), Validators.max(168)]], // Validación de horas
    });
  }

  ngOnInit() {
    this.cargarEmpleados();
  }

  registrarEmpleado() {
    if (this.formulario.valid) {
      const empleadoExistente = this.empleados.find(emp => emp.matricula === this.formulario.value.matricula);

      if (!this.empleadoSeleccionado && empleadoExistente) {
        alert('La matrícula ya existe.');
        return;
      }

      const horasTrabajadas = this.formulario.value.horas;
      const horasExtras = horasTrabajadas > 40 ? horasTrabajadas - 40 : 0;
      const horasNormales = Math.min(horasTrabajadas, 40);
      const pagoTotal = (horasNormales * 70) + (horasExtras * 140);

      const empleado = {
        matricula: this.formulario.value.matricula,
        nombre: this.formulario.value.nombre,
        correo: this.formulario.value.correo,
        edad: this.formulario.value.edad,
        horas: horasTrabajadas,
        horasExtras,
        pagoTotal
      };

      if (this.empleadoSeleccionado) {
        const index = this.empleados.findIndex(emp => emp.matricula === this.empleadoSeleccionado.matricula);
        this.empleados[index] = empleado;
        this.empleadoSeleccionado = null;
      } else {
        this.empleados.push(empleado);
      }

      this.guardarEmpleados();
      this.actualizarTotalGeneral();
      this.formulario.reset();
    } else {
      alert('Por favor, complete correctamente todos los campos.');
    }
  }

  modificarEmpleado(matricula: string) {
    const empleado = this.empleados.find(e => e.matricula === matricula);

    if (empleado) {
      this.empleadoSeleccionado = empleado;
      this.formulario.patchValue(empleado);
    } else {
      alert('Empleado no encontrado.');
    }
  }

  eliminarEmpleado(matricula: string) {
    this.empleados = this.empleados.filter(e => e.matricula !== matricula);
    this.actualizarTotalGeneral();
    this.guardarEmpleados();
  }

  eliminarTodo() {
    if (confirm('¿Eliminar todo?')) {
      this.empleados = [];
      localStorage.removeItem('empleados');
      this.mostrarTabla = false;
      this.actualizarTotalGeneral();
      alert('Empleados eliminados.');
    }
  }

  calcularPagoNormal(horas: number): number {
    return Math.min(horas, 40) * 70;
  }

  calcularPagoHorasExtras(horas: number): number {
    const horasExtras = horas > 40 ? horas - 40 : 0;
    return horasExtras * 140; // 2 veces el salario normal para horas extra
  }
  calcularHorasExtras(horas: number): number {
    return horas > 40 ? horas - 40 : 0;
  }

  calcularTotalPago(horas: number): number {
    return this.calcularPagoNormal(horas) + this.calcularPagoHorasExtras(horas);
  }

  actualizarTotalGeneral() {
    this.totalGeneral = this.empleados.reduce((total, empleado) => total + empleado.pagoTotal, 0);
  }

  guardarEmpleados() {
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
  }
  
  cargarEmpleados() {
    const empleadosGuardados = localStorage.getItem('empleados');
    if (empleadosGuardados) {
      this.empleados = JSON.parse(empleadosGuardados);
      this.actualizarTotalGeneral();
    }
  }

  imprimirTabla() {
    this.mostrarTabla = true;
  }
}