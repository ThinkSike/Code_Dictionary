// Write a program to implement Linear search on Library Management System.
// [Library class fields: ISBN, bookName, authName, pubName]
// Search a book based on any of these fields.

#include <iostream>
#include <string>
using namespace std;

class Library {
    public:
        string ISBN;
        string bookName;
        string authName;
        string pubName;
};

int main() {
    int n;
    cout << "Enter the number of books: ";
    cin >> n;

    Library books[n];
    cout << "Enter the details of the books:\n";
    for (int i = 0; i < n; i++) {
        cout << "Book " << i + 1 << ":\n";
        cout << "ISBN: ";
        cin >> books[i].ISBN;
        cout << "Book Name: ";
        cin >> books[i].bookName;
        cout << "Author Name: ";
        cin >> books[i].authName;
        cout << "Publisher Name: ";
        cin >> books[i].pubName;
    }

    string search;
    cout << "Enter the field to search (ISBN, Book Name, Author Name, Publisher Name): ";
    cin >> search;

    if (search == "ISBN") {
        string ISBN;
        cout << "Enter the ISBN to search: ";
        cin >> ISBN;
        for (int i = 0; i < n; i++) {
            if (books[i].ISBN == ISBN) {
                cout << "Book found!\n";
                cout << "Book Name: " << books[i].bookName << "\n";
                cout << "Author Name: " << books[i].authName << "\n";
                cout << "Publisher Name: " << books[i].pubName << "\n";
                break;
            }
        }
    } else if (search == "Book Name") {
        string bookName;
        cout << "Enter the Book Name to search: ";
        cin >> bookName;
        for (int i = 0; i < n; i++) {
            if (books[i].bookName == bookName) {
                cout << "Book found!\n";
                cout << "ISBN: " << books[i].ISBN << "\n";
                cout << "Author Name: " << books[i].authName << "\n";
                cout << "Publisher Name: " << books[i].pubName << "\n";
                break;
            }
        }
    } else if (search == "Author Name") {
        string authName;
        cout << "Enter the Author Name to search: ";
        cin >> authName;
        for (int i = 0; i < n; i++) {
            if (books[i].authName == authName) {
                cout << "Book found!\n";
                cout << "ISBN: " << books[i].ISBN << "\n";
                cout << "Book Name: " << books[i].bookName << "\n";
                cout << "Publisher Name: " << books[i].pubName << "\n";
                break;
            }
        }
    } else if (search == "Publisher Name") {
        string pubName;
        cout << "Enter the Publisher Name to search: ";
        cin >> pubName;
        for (int i = 0; i < n; i++) {
            if (books[i].pubName == pubName) {
                cout << "Book found!\n";
                cout << "ISBN: " << books[i].ISBN << "\n";
                cout << "Book Name: " << books[i].bookName << "\n";
                cout << "Author Name: " << books[i].authName << "\n";
                break;
            }
        }
    } else {
        cout << "Invalid field!\n";
    }

    return 0;
}
