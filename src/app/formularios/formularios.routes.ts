import { Routes } from "@angular/router";

export default[
    {
        path: 'ejemplo1',
        loadComponent:()=>import('./ejemplo1/ejemplo1.component'),
    },
    {
        path: 'empleados',
        loadComponent:()=>import('./empleados/empleados.component'),
    },
    {
        path: 'resistencias',
        loadComponent:()=>import('./resistencias/resistencias.component'),
    },
    
    
] as Routes