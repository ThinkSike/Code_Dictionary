#include <iostream>
#include <vector>
#include <algorithm> // For sorting the array
using namespace std;

// Function to implement binary search
int binarySearch(const vector<int>& arr, int target) {
    int low = 0, high = arr.size() - 1;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) 
            return mid; // Element found
        else if (arr[mid] < target) 
            low = mid + 1; // Search in the right half
        else
            high = mid - 1; // Search in the left half
    }
    return -1; // Element not found
}

int main() {
    int n, target;

    // Input the number of elements
    cout << "Enter the number of elements: ";
    cin >> n;

    vector<int> arr(n);

    // Input the elements
    cout << "Enter the elements: ";
    for (int i = 0; i < n; i++) {
        cin >> arr[i];
    }

    // Sort the array before performing binary search
    sort(arr.begin(), arr.end());

    cout << "Enter the number to search: ";
    cin >> target;

    int result = binarySearch(arr, target);

    if (result != -1)
        cout << "Number found at index " << result << endl;
    else
        cout << "Number not found in the list.\n";

    return 0;
}
