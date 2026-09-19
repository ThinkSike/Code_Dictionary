#include <iostream>
using namespace std;

int main() {
    const int MAX_SIZE = 100;
    int a[MAX_SIZE];
    int n, key, low = 0, high, mid, flag = 0;

    cout << "Enter the number of elements (up to " << MAX_SIZE << "): ";
    cin >> n;

    if (n > MAX_SIZE) {
        cout << "Error: Number of elements exceeds maximum size.\n";
        return 1;
    }

    cout << "Enter " << n << " sorted elements:\n";
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    cout << "Enter Key to Find: ";
    cin >> key;

    high = n - 1;

    while (low <= high) {
        mid = (high + low) / 2;

        if (a[mid] == key) {
            flag = 1;
            break;
        } else if (a[mid] > key) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }

    if (flag != 0) {
        cout << "Key found at index: " << mid;
    } else {
        cout << "Wrong key";
    }

    return 0;
}
