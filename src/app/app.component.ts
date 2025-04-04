import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';
import { Pila, data } from './Pila';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  pila: Pila = new Pila()
  tablero: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]
  nose: string[] = [" ", " ", " ", " ", " ", " ", " ", " ", " "]

  detectarTeclas = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === 'z') {
      console.log('Ctrl + Z presionado');
      let dato = this.pila.pop()
      if (!dato) return
      dato.elm.innerHTML = ""
      this.tablero[dato.row][dato.col] = 0
      
      dato = this.pila.peak()
      if (!dato) return
      dato.elm.innerHTML = "" + dato.num
      this.tablero[dato.row][dato.col] = dato.num
      for (let i = 0; i < 9; i++) {
        
      }
      
    }
  
  }

  public ingresar($event: KeyboardEvent) {
    const el = ($event.target as HTMLElement)
    if ($event.key == "Backspace" || $event.key == "Delete") {
      el.innerHTML = ""
      this.tablero[Number.parseInt(el.parentElement!.dataset["row"]!)][Number.parseInt(el.dataset["col"]!)] = 0
    }

    if ($event.key.match(/^[1-9]+$/)) {
      el.innerHTML = $event.key
      const row = Number.parseInt(el.parentElement!.dataset["row"]!)
      const col = Number.parseInt(el.dataset["col"]!)
      const num = Number.parseInt($event.key)
      this.tablero[row][col] = num
      this.pila.push({
        mismaPosiciion: false,
        col: col,
        row: row,
        num: num,
        elm: el
      })
    }
  }


  ngOnInit(): void {
    document.addEventListener('keydown', this.detectarTeclas);
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.detectarTeclas);
  }

}
