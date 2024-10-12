import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-zodiaco',
  standalone: true,
  imports: [ReactiveFormsModule],
   templateUrl: './zodiaco.component.html',
})
export class ZodiacoComponent {
  personaForm: FormGroup;
  personaInfo: any;

  constructor(private fb: FormBuilder) {
    this.personaForm = this.fb.group({
      nombre: [''],
      apellidoPaterno: [''],
      apellidoMaterno: [''],
      dia: [''],
      mes: [''],
      anio: [''],
      sexo: ['']
    });
  }

  imprimir() {
    const formValues = this.personaForm.value;
    const edad = this.calcularEdad(formValues.dia, formValues.mes, formValues.anio);
    
    const signoChino = this.obtenerSignoChino(formValues.anio);

    this.personaInfo = {
      nombre: formValues.nombre,
      apellidoPaterno: formValues.apellidoPaterno,
      apellidoMaterno: formValues.apellidoMaterno,
      edad: edad,

      signoChino: signoChino,
      signoImagen: this.obtenerImagenSigno(signoChino)
    };
  }

  calcularEdad(dia: number, mes: number, anio: number): number {
    const today = new Date();
    let age = today.getFullYear() - anio;
    const monthDiff = today.getMonth() + 1 - mes;
    const dayDiff = today.getDate() - dia;

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }

    return age;
  }

  obtenerSignoChino(anio: number): string {
    const animalesChinos = ['Rata', 'Buey', 'Tigre', 'Conejo', 'Dragón', 'Serpiente', 'Caballo', 'Cabra', 'Mono', 'Gallo', 'Perro', 'Cerdo'];
    return animalesChinos[(anio - 4) % 12];
  }

  obtenerImagenSigno(signoChino: string): string {
    const signosImagenes: { [key: string]: string } = {
      'Rata': 'https://www.bing.com/th?id=OIP._L7BhdDJ-e8P4B1FwsEBrAAAAA',
      'Tigre': 'https://static.vecteezy.com/system/resources/previews/016/756/186/non_2x/tiger-chinese-zodiac-free-vector.jpg',
      'Buey': 'https://th.bing.com/th/id/OIP.4yCh1NPLgWdGiuDko1GQBgHaHa?rs=1&pid=ImgDetMain',
      'Dragón': 'https://th.bing.com/th/id/OIP.zImplN-9yZyu9aS7FBdViAAAAA?rs=1&pid=ImgDetMain',
      'Serpiente': 'https://media.istockphoto.com/id/165928604/es/vector/año-de-la-serpiente.jpg?s=612x612&w=0&k=20&c=PzUCeE7bPjjZAJZNZ1ovmvBdjJsPz_15OhLKH6q9NCM=',
      'Cabra': 'https://www.elmagoarcano.com/wp-content/uploads/2017/10/8-cabra-zodiaco-chino-1.jpg',
      'Cerdo': 'https://img.freepik.com/vector-premium/signo-zodiaco-vectorial-ano-cerdo_1108027-47.jpg',
      'Mono': 'https://masalaeatsmiami.com/wp-content/uploads/2016/02/shutterstock_303303539.jpg?w=1024',
      'Perro': 'https://webstockreview.net/images/chinese-clipart-dog-7.jpg',
      'Gallo': 'https://as2.ftcdn.net/v2/jpg/04/70/84/07/1000_F_470840773_yPyI69CTbIj4z0Fbtmmp5nZLsdZ1t2lo.jpg',
      'Caballo': 'https://media.istockphoto.com/id/185972845/vector/year-of-the-horse-paper-cut-art.jpg?s=170667a&w=0&k=20&c=qNSaavuaV2cCP_hNNbpkG0qzXZ_aaJJx9Ml6oJad2_o=',
      'Conejo': 'https://img.freepik.com/vector-premium/ilustracion-ano-lunar-conejo-zodiaco-chino-ano-conejo_692702-8585.jpg?w=740',
    };
    return signosImagenes[signoChino] ?? '';
  }
}
