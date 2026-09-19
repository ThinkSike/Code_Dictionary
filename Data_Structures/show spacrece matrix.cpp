//sparce matrix store it in a array

#include <iostream>
using namespace std;

const int MAX = 100;

void createSparseMatrix(int sparseMatrix[][3], int row, int col, int matrix[][MAX]) {
    int k = 0;
    for (int i = 0; i < row; i++) {
        for (int j = 0; j < col; j++) {
            if (matrix[i][j] != 0) {
                sparseMatrix[k][0] = i;
                sparseMatrix[k][1] = j;
                sparseMatrix[k][2] = matrix[i][j];
                k++;
            }
        }
    }
}

void printSparseMatrix(int sparseMatrix[][3], int size) {
    cout << "Row\tColumn\tValue\n";
    for (int i = 0; i < size; i++) {
        cout << sparseMatrix[i][0] << "\t" << sparseMatrix[i][1] << "\t" << sparseMatrix[i][2] << "\n";
    }
}

int main() {
    int matrix[MAX][MAX];
    int row, col;

    cout << "Enter the number of rows and columns of the matrix: ";
    cin >> row >> col;

    cout << "Enter the elements of the matrix:\n";
    for (int i = 0; i < row; i++) {
        for (int j = 0; j < col; j++) {
            cin >> matrix[i][j];
        }
    }

    int sparseMatrix[MAX][3];
    createSparseMatrix(sparseMatrix, row, col, matrix);

    cout << "Sparse Matrix Representation:\n";
    printSparseMatrix(sparseMatrix, row * col);

    return 0;
}


