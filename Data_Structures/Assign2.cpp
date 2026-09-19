#include <iostream>

using namespace std;

// Function to transpose a matrix
void transpose(int matrix[][10], int row, int col, int transposed[][10]) {
    for (int i = 0; i < row; i++) {
        for (int j = 0; j < col; j++) {
            transposed[j][i] = matrix[i][j];
        }
    }
}

// Function to convert a matrix to upper triangular
void upperTriangular(int matrix[][10], int size, int upper[][10]) {
    for (int i = 0; i < size; i++) {
        for (int j = 0; j < size; j++) {
            if (i <= j) {
                upper[i][j] = matrix[i][j];
            } else {
                upper[i][j] = 0;
            }
        }
    }
}

int main() {
    int row1, col1, row2, col2, s;

    cout << "Enter dimensions of matrix 1 (row col): ";
    cin >> row1 >> col1;
    cout << "Enter dimensions of matrix 2 (row col): ";
    cin >> row2 >> col2;

    if (col1 != row2) {
    	
    	
        cout << "Matrix multiplication not possible!" << endl;
        return 1;
    }

    int matrix1[10][10], matrix2[10][10], result[10][10], transposed[10][10], upper[10][10];

    cout << "Enter elements of matrix 1:" << endl;
    for (int i = 0; i < row1; i++) {
        for (int j = 0; j < col1; j++) {
            cin >> matrix1[i][j];
        }
    }

    cout << "Enter elements of matrix 2:" << endl;
    for (int i = 0; i < row2; i++) {
        for (int j = 0; j < col2; j++) {
            cin >> matrix2[i][j];
        }
    }

    do {
        cout << "Enter 1.Addition 2.Subtraction 3.Multiplication 4.Transpose of Matrix 1 5.Upper Triangular Matrix of Matrix 1: ";
        cin >> s;

        switch (s) {
            case 1:
                if (row1 == row2 && col1 == col2) {
                    cout << "Addition Result:" << endl;
                    for (int i = 0; i < row1; i++) {
                        for (int j = 0; j < col1; j++) {
                            result[i][j] = matrix1[i][j] + matrix2[i][j];
                            cout << result[i][j] << " ";
                        }
                        cout << endl;
                    }
                } else {
                    cout << "Addition not possible!" << endl;
                }
                break;

            case 2:
                if (row1 == row2 && col1 == col2) {
                    cout << "Subtraction Result:" << endl;
                    for (int i = 0; i < row1; i++) {
                        for (int j = 0; j < col1; j++) {
                            result[i][j] = matrix1[i][j] - matrix2[i][j];
                            cout << result[i][j] << " ";
                        }
                        cout << endl;
                    }
                } else {
                    cout << "Subtraction not possible!" << endl;
                }
                break;

            case 3:
                cout << "Multiplication Result:" << endl;
                for (int i = 0; i < row1; i++) {
                    for (int j = 0; j < col2; j++) {
                        result[i][j] = 0;
                        for (int k = 0; k < col1; k++) {
                            result[i][j] += matrix1[i][k] * matrix2[k][j];
                        }
                        cout << result[i][j] << " ";
                    }
                    cout << endl;
                }
                break;

            case 4:
                transpose(matrix1, row1, col1, transposed);
                cout << "Transposed Matrix:" << endl;
                for (int i = 0; i < col1; i++) { // Note: Rows and columns are swapped
                    for (int j = 0; j < row1; j++) {
                        cout << transposed[i][j] << " ";
                    }
                    cout << endl;
                }
                break;

            case 5:
                upperTriangular(matrix1, min(row1, col1), upper);
                cout << "Upper Triangular Matrix:" << endl;
                for (int i = 0; i < min(row1, col1); i++) { // Use the smaller dimension
                    for (int j = 0; j < min(row1, col1); j++) {
                        cout << upper[i][j] << " ";
                    }
                    cout << endl;
                }
                break;

            default:
                cout << "Invalid option!" << endl;
        }

    } while (s >= 1 && s <= 5);

    return 0;
}
