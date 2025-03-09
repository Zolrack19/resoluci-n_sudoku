import java.util.HashSet;
import java.util.Set;

public class Lista<T> {

  private Nodo<T> cabeza;
  private int total;
  private Set<T> set = new HashSet<>();

  public Lista(Nodo<T> cabeza) {
    this.cabeza = cabeza;
  }

  public Lista() {}

  public void agregarI(T dato) {
    if (set.contains(dato)) return;
    Nodo<T> nuevoNodo = new Nodo<>(dato);
    if (total == 0) {
    cabeza = nuevoNodo;
      total++;
      set.add(dato);
      return;
    }
    nuevoNodo.siguiente = cabeza;
    cabeza = nuevoNodo;
    set.add(dato);
    total++;
  }

  public void agregarF(T dato) {
    if (set.contains(dato)) return;
    Nodo<T> nuevoNodo = new Nodo<>(dato);
    if (total == 0) {
      cabeza = nuevoNodo;
      set.add(dato);
      total++;
      return;
    }
    Nodo<T> recorrer = cabeza;
    while (recorrer.siguiente != null) {
      recorrer = recorrer.siguiente;
    }
    recorrer.siguiente = nuevoNodo;
    set.add(dato);
    total++;
  }

  // a b c d
  public void eliminar(T dato) {
    if (!set.contains(dato) || total == 0) return;
    if (cabeza.dato == dato || total == 1) {
      set.remove(dato);
      cabeza = cabeza.siguiente;
      total--;
      return;
    }
    Nodo<T> recorrer = cabeza;
    while (recorrer.siguiente.dato != dato) {
      recorrer = recorrer.siguiente;
    }
    Nodo<T> temp = recorrer.siguiente;
    set.remove(temp.dato);
    temp.dato = null;
    recorrer.siguiente = temp.siguiente;
    total--;
  }


  public void eliminarI() {
    if (total == 0) return;
    set.remove(cabeza.dato);
    cabeza = cabeza.siguiente;
    total--;
  }

  public void eliminarF() {
    if (total == 0) return;
    if (total == 1) {
      set.remove(cabeza.dato);
      cabeza = null;
      total--;
      return;
    }
    Nodo<T> recorrer = cabeza;
    while (recorrer.siguiente.siguiente != null) {
      recorrer = recorrer.siguiente;
    }
    set.remove(recorrer.siguiente);
    recorrer.siguiente = null;
    total--;
  }

  public void imprimir() {
    if (total == 0) {
      return;
    }
    
    Nodo<T> recorrer = cabeza;
    while (recorrer != null) {
      System.out.print(recorrer.dato + " -> ");
      recorrer = recorrer.siguiente;
    }
    System.out.printf("(%d)\n", total);
  }
}