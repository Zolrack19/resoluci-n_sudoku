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

  celda?: celda = {
    row: 0,
    col: 0,
    elm: null
  }
  pila: Pila = new Pila()  
  tablero: number[][] = []
  constructor(private http: HttpClient) {
  }



  detectarTeclas = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === 'z') {
      let dato = this.pila.pop()
      if (!dato) return
      dato.elm!.innerHTML = ""
      this.tablero[dato.row][dato.col] = 0
      
      dato = this.pila.peak()
      if (!dato) return
      dato.elm!.innerHTML = "" + dato.num
      this.tablero[dato.row][dato.col] = dato.num || 0
    }

    if (this.celda == null) return
    switch (event.key) {
      case "ArrowUp":
        if (this.celda.row - 1 >= 0) {
          (document.querySelector(`[data-row="${this.celda.row - 1}"][data-col="${this.celda.col}"]`) as HTMLElement)?.focus()
        }
        break;
      case "ArrowDown":
        if (this.celda.row + 1 < 9) {
          (document.querySelector(`[data-row="${this.celda.row + 1}"][data-col="${this.celda.col}"]`) as HTMLElement)?.focus()
        }
        break;
      case "ArrowRight":
        if (this.celda.col + 1 < 9) {
          (document.querySelector(`[data-row="${this.celda.row}"][data-col="${this.celda.col + 1}"]`) as HTMLElement)?.focus()
        }
        break;
      case "ArrowLeft":
        if (this.celda.col - 1 >= 0) {
          (document.querySelector(`[data-row="${this.celda.row}"][data-col="${this.celda.col - 1}"]`) as HTMLElement)?.focus()
        }
        break;
      default:
        break;
    }
  }

  public focus($event: Event) {
    const elem = $event.target as HTMLElement
    const row = Number.parseInt(elem.dataset["row"]!)
    const col = Number.parseInt(elem.dataset["col"]!)
    
    this.celda!.row = row
    this.celda!.col = col
    this.celda!.elm = elem
  }

  public ingresar($event: KeyboardEvent) {
    const el = ($event.target as HTMLElement)
    if ($event.key == "Backspace" || $event.key == "Delete") {
      el.innerHTML = ""
      this.tablero[Number.parseInt(el.dataset["row"]!)][Number.parseInt(el.dataset["col"]!)] = 0
    }

    if ($event.key.match(/^[1-9]+$/)) {
      el.innerHTML = $event.key
      const row = Number.parseInt(el.dataset["row"]!)
      const col = Number.parseInt(el.dataset["col"]!)
      const num = Number.parseInt($event.key)
      this.tablero[row][col] = num
      this.pila.push({
        col: col,
        row: row,
        num: num,
        elm: el
      })
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

  public resolver($event: Event) {
    this.http.post('http://localhost:8080/saludar/servlet', {mensaje: "hola desde angular!!"})
      .subscribe({
        next: (res) => {console.log("resultado: ", res)},
        error: (err) => {console.log("error", err);
        }
      }
    )
  }
}