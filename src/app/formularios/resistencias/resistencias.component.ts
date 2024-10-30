import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-resistencias',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './resistencias.component.html',
  styleUrls: ['./resistencias.component.css']
})
export default class ActividadResistenciaComponent {
  form: FormGroup;
  results: any[] = [];
  showResults = false;
  historial: any[] = [];

  colorMap: any = {
    'Negro': '#000000',
    'Café': '#8B4513',
    'Rojo': '#FF0000',
    'Naranja': '#FFA500',
    'Amarillo': '#FFFF00',
    'Verde': '#008000',
    'Azul': '#0000FF',
    'Morado': '#800080',
    'Gris': '#808080',
    'Blanco': '#FFFFFF'
  };

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      color1: ['', Validators.required],
      color2: ['', Validators.required],
      color3: ['', Validators.required],
      tolerance: ['', Validators.required]
    });
    this.cargarHistorial();
  }

  calcular() {
    const formValue = this.form.value;
    const result = {
      bandas: [formValue.color1, formValue.color2, formValue.color3],
      tolerancia: formValue.tolerance,
      valor: this.calcularResistencia(formValue.color1, formValue.color2, formValue.color3),
      valorMax: this.calcularValorMaximo(formValue.color1, formValue.color2, formValue.color3, formValue.tolerance),
      valorMin: this.calcularValorMinimo(formValue.color1, formValue.color2, formValue.color3, formValue.tolerance)
    };
    this.results.push(result);
    this.guardarEnHistorial(result);
    this.showResults = true;
  }

  guardarEnHistorial(registro: any): void {
    this.historial.push(registro);
    localStorage.setItem('historialResistencias', JSON.stringify(this.historial));
  }

  cargarHistorial(): void {
    const historialGuardado = localStorage.getItem('historialResistencias');
    if (historialGuardado) {
      this.historial = JSON.parse(historialGuardado);
    }
  }

  obtenerValorColor(nombre: string): number {
    const colorValues: any = {
      'Negro': 0, 'Café': 1, 'Rojo': 2, 'Naranja': 3, 'Amarillo': 4,
      'Verde': 5, 'Azul': 6, 'Morado': 7, 'Gris': 8, 'Blanco': 9
    };
    return colorValues[nombre] || 0;
  }

  obtenerValorMultiplicador(nombre: string): number {
    const multiplicadores: any = {
      'Negro': 1, 'Café': 10, 'Rojo': 100, 'Naranja': 1000, 'Amarillo': 10000,
      'Verde': 100000, 'Azul': 1000000, 'Morado': 10000000, 'Gris': 100000000, 'Blanco': 1000000000
    };
    return multiplicadores[nombre] || 1;
  }

  calcularResistencia(banda1: string, banda2: string, multiplicador: string): number {
    const valorBanda1 = this.obtenerValorColor(banda1);
    const valorBanda2 = this.obtenerValorColor(banda2);
    const valorMultiplicador = this.obtenerValorMultiplicador(multiplicador);
    return (valorBanda1 * 10 + valorBanda2) * valorMultiplicador;
  }

  calcularValorMaximo(banda1: string, banda2: string, multiplicador: string, tolerancia: string): number {
    const valor = this.calcularResistencia(banda1, banda2, multiplicador);
    const toleranciaValor = parseFloat(tolerancia) / 100;
    return valor + (valor * toleranciaValor);
  }

  calcularValorMinimo(banda1: string, banda2: string, multiplicador: string, tolerancia: string): number {
    const valor = this.calcularResistencia(banda1, banda2, multiplicador);
    const toleranciaValor = parseFloat(tolerancia) / 100;
    return valor - (valor * toleranciaValor);
  }
}
