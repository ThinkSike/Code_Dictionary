#include <iostream>
using namespace std;

int max(int m, int n) { return (m > n) ? m : n; }

int* add(int A[], int B[], int m, int n)
{
    int size = max(m, n);
    int* sum = new int[size];

    for (int i = 0; i < m; i++)
        sum[i] = A[i];

    for (int i = 0; i < n; i++)
        sum[i] += B[i];

    return sum;
}

void printPoly(int poly[], int n)
{
    for (int i = 0; i < n; i++) {
        cout << poly[i];
        if (i != 0)
            cout << "x^" << i;
        if (i != n - 1)
            cout << " + ";
    }
}

int main()
{
    int m, n;

    // Get input for the first polynomial
    cout << "Enter the number of coefficients for the first polynomial: ";
    cin >> m;
    int A[m];  // Declare array based on the number of coefficients
    cout << "Enter the coefficients of the first polynomial: ";
    for (int i = 0; i < m; i++) {
        cin >> A[i];
    }

    // Get input for the second polynomial
    cout << "Enter the number of coefficients for the second polynomial: ";
    cin >> n;
    int B[n];  // Declare array based on the number of coefficients
    cout << "Enter the coefficients of the second polynomial: ";
    for (int i = 0; i < n; i++) {
        cin >> B[i];
    }

    cout << "First polynomial is \n";
    printPoly(A, m);
    cout << "\nSecond polynomial is \n";
    printPoly(B, n);

    // Perform addition of the polynomials
    int* sum = add(A, B, m, n);
    int size = max(m, n);

    cout << "\nSum polynomial is \n";
    printPoly(sum, size);

    delete[] sum;

    return 0;
}
