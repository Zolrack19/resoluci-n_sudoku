import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';
import { Pila, celda } from './Pila';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  posicion: number[] = [0, 0]
  pila: Pila = new Pila()  
  tablero: number[][] = []
  constructor(private http: HttpClient) {
  }

  detectarTeclas = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === 'z') {  
      let dato = this.pila.pop()
      if (!dato) return
      this.tablero[dato.row][dato.col] = 0
      dato.elm?.focus()
  
      dato = this.pila.peak()
      if (!dato) return
      this.tablero[dato.row][dato.col] = dato.num || 0
    }

    switch (event.key) {
      case "ArrowUp":
        if (this.posicion[0] - 1 >= 0) {
          (document.querySelector(`[data-row="${this.posicion[0] - 1}"][data-col="${this.posicion[1]}"]`) as HTMLElement)?.focus()
        }
        break;
      case "ArrowDown":
        if (this.posicion[0] + 1 < 9) {
          (document.querySelector(`[data-row="${this.posicion[0] + 1}"][data-col="${this.posicion[1]}"]`) as HTMLElement)?.focus()
        }
        break;
      case "ArrowRight":
        if (this.posicion[1] + 1 < 9) {
          (document.querySelector(`[data-row="${this.posicion[0]}"][data-col="${this.posicion[1] + 1}"]`) as HTMLElement)?.focus()
        }
        break;
      case "ArrowLeft":
        if (this.posicion[1] - 1 >= 0) {
          (document.querySelector(`[data-row="${this.posicion[0]}"][data-col="${this.posicion[1] - 1}"]`) as HTMLElement)?.focus()
        }
        break;
      default:
        break;
    }
  }

  public focus($event: Event) {
    const elem = $event.target as HTMLElement
    this.posicion[0] = Number.parseInt(elem.dataset["row"]!)
    this.posicion[1] = Number.parseInt(elem.dataset["col"]!)
  }

  public ingresar($event: KeyboardEvent) {
    const key = $event.key
    if (/^[1-9]$/.test(key)) {
      const num = parseInt(key)
      this.tablero[this.posicion[0]][this.posicion[1]] = num;
      this.pila.push({
        row: this.posicion[0],
        col: this.posicion[1],
        num: num,
        elm: (document.querySelector(`[data-row="${this.posicion[0]}"][data-col="${this.posicion[1]}"]`) as HTMLElement)
      })
    }
    
    if (key == "Backspace" || key == "Delete") {
      this.tablero[this.posicion[0]][this.posicion[1]] = 0;
    }
    
  }

  ngOnInit(): void {
    document.addEventListener('keydown', this.detectarTeclas);
    for (let i = 0; i < 9; i++) {
      this.tablero.push([0, 0, 0, 0, 0, 0, 0, 0, 0])
    }
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.detectarTeclas);
  }
  
  trackByIndex(index: number, item: any): number {
    return index;
  }


  public resolver($event: Event) {
    this.http.post('http://localhost:8080/saludar/servlet', {
      mensaje: "hola desde angular!!",
      tablero: this.tablero
    }
    )
      .subscribe({
        next: (res) => {
          console.log(res);
          const respuesta = (res as respuesta)
          for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
              this.tablero[i][j] = respuesta.tablero[i][j]
            }
          }
        },
        error: (err) => {console.log("error", err);
        }
      }
    )
  }
}
type respuesta = {
  tablero: number[][],
  mensaje: string
}