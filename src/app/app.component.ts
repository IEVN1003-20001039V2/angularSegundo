import { Component } from '@angular/core';
import { RouterOutlet,  } from '@angular/router';
/* import { Ejemplo1Component } from "./formularios/ejemplo1/ejemplo1.component";
import { ZodiacoComponent } from './formulario/zodiaco/zodiaco.component'; */
import { ReactiveFormsModule } from '@angular/forms';
import EmpleadosComponent from './formularios/empleados/empleados.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule,  /* Ejemplo1Component, ZodiacoCompone */],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularSegundo';
}
