#include <iostream>

using namespace std;

// Function to add two sparse matrices
void addSparseMatrices(int A[][4], int B[][4], int result[][4], int rowCount, int colCount) {
    // Initialize the result matrix with zeros
    for (int i = 0; i < rowCount; ++i) {
        for (int j = 0; j < colCount; ++j) {
            result[i][j] = 0;
        }
    }

    // Add elements of matrix A to the result matrix
    for (int i = 0; i < rowCount; ++i) {
        for (int j = 0; j < colCount; ++j) {
            result[i][j] += A[i][j];
        }
    }

    // Add elements of matrix B to the result matrix
    for (int i = 0; i < rowCount; ++i) {
        for (int j = 0; j < colCount; ++j) {
            result[i][j] += B[i][j];
        }
    }
}

// Function to print the sparse matrix
void printSparseMatrix(int matrix[][4], int rowCount, int colCount) {
    for (int i = 0; i < rowCount; ++i) {
        for (int j = 0; j < colCount; ++j) {
            if (matrix[i][j] != 0) {
                cout << "Row: " << i << ", Col: " << j << ", Value: " << matrix[i][j] << endl;
            }
        }
    }
}

int main() {
    // Size of matrices
    const int rowCount = 4;
    const int colCount = 4;

    // Sparse matrix A (with rows and columns initialized, non-zero values filled in)
    int A[4][4] = {
        {0, 0, 3, 0},
        {4, 0, 0, 5},
        {0, 0, 0, 0},
        {7, 0, 0, 0}
    };

    // Sparse matrix B (with rows and columns initialized, non-zero values filled in)
    int B[4][4] = {
        {1, 0, 0, 0},
        {0, 2, 0, 0},
        {0, 0, 3, 0},
        {0, 0, 0, 4}
    };

    // Result matrix
    int result[4][4];

    // Add A and B and store the result in the result matrix
    addSparseMatrices(A, B, result, rowCount, colCount);

    // Print the resulting sparse matrix
    cout << "Resulting Sparse Matrix:" << endl;
    printSparseMatrix(result, rowCount, colCount);

    return 0;
}
