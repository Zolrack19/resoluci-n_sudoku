export class Pila {
  head?: Nodo | null
  cola?: Nodo | null
  size = 0

  push(dato: data) {
    const nuevoNodo = new Nodo(dato)
    if (this.size == 0) {
      this.head = nuevoNodo 
      this.cola = nuevoNodo 
      this.size += 1
      return
    }

    if (this.head?.dato?.col == dato.col && this.head.dato.row == dato.row) {
      nuevoNodo.dato!.mismaPosiciion = true;
    }
    this.head!.siguiente = nuevoNodo
    this.head = nuevoNodo
    this.size += 1
  }

  peak(): data | undefined {
    if (this.size == 0) return
    return this.head?.dato
  }

  pop(): data | undefined {
    if (this.size == 0) return
    if (this.size == 1) {
      const dato = this.cola?.dato
      this.cola = null
      this.head = null
      this.size -= 1;
      return dato
    } 
    
    let recorre = this.cola;
    while (recorre?.siguiente?.siguiente != null) {
      recorre = recorre.siguiente;
    }
    const dato = this.head?.dato
    this.head = recorre
    this.head!.siguiente = null
    this.size -= 1;
    return dato
  }

  imprimir() {
    if (this.size == 0) return
    let recorre = this.cola;
    while (recorre?.siguiente != null) {
      console.log(recorre.dato);
      recorre = recorre.siguiente
    }
    console.log(recorre?.dato);
  }

}

export type data = {
  mismaPosiciion: boolean
  row: number,
  col: number,
  num: number,
  elm: HTMLElement
}

class Nodo {
  dato?: data
  siguiente: Nodo | null = null
  constructor(dato: data) {
    this.dato = dato;
  }
}