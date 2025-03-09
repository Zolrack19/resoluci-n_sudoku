import java.util.HashMap;

public class Grafo {
  HashMap<String, Lista<String>> map;

  public Grafo() {
    map = new HashMap<>();
  }

  public void agregarNodo(String dato) {
    map.putIfAbsent(dato, new Lista<>());
  }

  public void eliminarNodo(String dato) {
    map.remove(dato);
    map.forEach((nodo, lista) -> {
      lista.eliminar(dato);
    });
  }

  public void agregarVecino(String nodo, String vecino) {
    map.get(nodo).agregarF(vecino);
  }

  public void agregarVecino(String nodo, String vecino, boolean a) {
    map.get(nodo).agregarF(vecino);
  }

  public void vecinos(String nodo) {
    Lista<String> n = map.get(nodo);
    if (map.get(nodo) != null) {
      System.out.printf("'%s': ", nodo);
      n.imprimir();
    }
  }

  public static void main(String[] args) {
    Grafo g = new Grafo();
    g.agregarNodo("a");
    g.agregarNodo("b");
    g.agregarNodo("c");
    g.agregarNodo("d");
    g.agregarNodo("e");

    g.agregarVecino("a", "b");
    g.agregarVecino("a", "c");
    g.vecinos("a");
    g.eliminarNodo("b");
    g.vecinos("a");

  }

}
