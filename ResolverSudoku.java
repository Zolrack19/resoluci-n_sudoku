public class ResolverSudoku {

  public int matriz[][] = {
    {4, 6, 0, 0, 0, 0, 0, 0, 8},
    {3, 7, 8, 0, 0, 0, 0, 6, 0},
    {9, 1, 0, 0, 6, 0, 0, 0, 7},
    {2, 0, 9, 6, 0, 1, 4, 8, 0},
    {0, 0, 0, 0, 0, 0, 0, 0, 0},
    {0, 8, 0, 0, 4, 5, 0, 1, 0},
    {6, 3, 0, 0, 5, 2, 8, 0, 1},
    {8, 0, 0, 0, 0, 6, 0, 0, 0},
    {0, 0, 0, 7, 0, 4, 0, 0, 0},
  };

  public boolean start() {
    int[] celda = celdaVacia();
    if (celda == null) {
      return true;
    }

    int row = celda[0];
    int col = celda[1];

    for (int num = 1; num < 10; num++) {
      if (esValido(num, row, col)) {
        matriz[row][col] = num;
        if (start()) {
          return true;
        } else {
          matriz[row][col] = 0;
        }
      }
    }
    return false;
  }

  public int[] celdaVacia() {
    for (int row = 0; row < 9; row++) {
      for (int col = 0; col < 9; col++) {
        if (matriz[row][col] == 0) {
          return new int[] {row, col};
        }
      }
    }
    return null;
  }

  public boolean esValido(int n, int row, int col) {
    for (int i = (row / 3) * 3; i < ((row / 3) + 1) * 3; i++) {
      for (int j = (col / 3) * 3; j < ((col / 3) + 1) * 3; j++) {
        if (matriz[i][j] == n && (row != i && col != j)) return false;
      }
    }
    
    for (int j = 0; j < 9; j++) {
      if (matriz[row][j] == n && j != col) {
        return false;
      }
    }

    for (int i = 0; i < 9; i++) {
      if (matriz[i][col] == n && i != row) {
        return false;
      } 
    }

    return true;
  } 

  public static void main(String[] args) {
    ResolverSudoku borrar = new ResolverSudoku();
    boolean resp = borrar.start();
    if (resp) {
      for (int[] row: borrar.matriz) {
        for (int col : row) {
          System.out.print(col + " ");
        }
        System.out.println();
      }
    } else {
      System.out.println("No hay solución para este sudoku");
    }
  }
}
