public class Nodo<T> {
	T dato;
	Nodo<T> siguiente;

	public Nodo(T dato) {
		this.dato = dato;
	}

	@Override
	public int hashCode() {
		return dato.hashCode();
	}

}