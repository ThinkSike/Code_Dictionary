#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

class Book {
public:
    string ISBN;
    string bookName;
    string authName;
    string pubName;

    // Default constructor
    Book() : ISBN(""), bookName(""), authName(""), pubName("") {}

    // Parameterized constructor
    Book(string isbn, string name, string author, string publisher) {
        ISBN = isbn;
        bookName = name;
        authName = author;
        pubName = publisher;
    }
};

bool compareByISBN(const Book& a, const Book& b) {
    return a.ISBN < b.ISBN;
}

void linearSearchByName(Book books[], int n, const string& searchTerm) {
    bool found = false;

    for (int i = 0; i < n; i++) {
        if (books[i].bookName == searchTerm) {
            cout << "Book found:\n";
            cout << "ISBN: " << books[i].ISBN << "\n";
            cout << "Book Name: " << books[i].bookName << "\n";
            cout << "Author Name: " << books[i].authName << "\n";
            cout << "Publisher Name: " << books[i].pubName << "\n";
            found = true;
            break;
        }
    }

    if (!found) {
        cout << "Book not found by name.\n";
    }
}

int binarySearchByISBN(Book books[], int n, const string& searchTerm) {
    int low = 0;
    int high = n - 1;

    while (low <= high) {
        int mid = (low + high) / 2;

        if (books[mid].ISBN == searchTerm) {
            return mid; // Return index of the found book
        } else if (books[mid].ISBN < searchTerm) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return -1; // Not found
}

void addBook(Book books[], int& n) {
    string isbn, name, author, publisher;
    cout << "Enter ISBN: ";
    cin.ignore(); // Ignore the newline character
    getline(cin, isbn);
    cout << "Enter Book Name: ";
    getline(cin, name);
    cout << "Enter Author Name: ";
    getline(cin, author);
    cout << "Enter Publisher Name: ";
    getline(cin, publisher);

    books[n++] = Book(isbn, name, author, publisher);
    cout << "Book added successfully.\n";
}

void deleteBook(Book books[], int& n, const string& isbn) {
    int index = binarySearchByISBN(books, n, isbn);
    if (index != -1) {
        for (int i = index; i < n - 1; i++) {
            books[i] = books[i + 1]; // Shift books to the left
        }
        n--; // Reduce the count of books
        cout << "Book deleted successfully.\n";
    } else {
        cout << "Book not found by ISBN.\n";
    }
}

void listBooks(Book books[], int n) {
    if (n == 0) {
        cout << "No books available.\n";
        return;
    }
    
    cout << "List of Books:\n";
    for (int i = 0; i < n; i++) {
        cout << "ISBN: " << books[i].ISBN << ", Book Name: " << books[i].bookName
             << ", Author Name: " << books[i].authName << ", Publisher Name: " << books[i].pubName << "\n";
    }
}

int main() {
    const int MAX_BOOKS = 100;
    Book books[MAX_BOOKS]; // This now works because of the default constructor
    int n = 0; // Current number of books in the system
    int choice;

    do {
        cout << "\nLibrary Management System\n";
        cout << "1. Add Book\n";
        cout << "2. Delete Book\n";
        cout << "3. Search Book\n";
        cout << "4. List All Books\n";
        cout << "5. Exit\n";
        cout << "Enter your choice: ";
        cin >> choice;

        switch (choice) {
            case 1:
                addBook(books, n);
                break;
            case 2: {
                string isbn;
                cout << "Enter ISBN of the book to delete: ";
                cin.ignore(); // Ignore the newline character
                getline(cin, isbn);
                deleteBook(books, n, isbn);
                break;
            }
            case 3: {
                char searchChoice;
                cout << "Do you want to search by ISBN (i) or Book Name (n)? ";
                cin >> searchChoice;
                cin.ignore(); // Ignore the newline character after the choice input

                if (searchChoice == 'n') {
                    string searchTerm;
                    cout << "Enter Book Name to search: ";
                    getline(cin, searchTerm);
                    linearSearchByName(books, n, searchTerm);
                } else if (searchChoice == 'i') {
                    string searchTerm;
                    cout << "Enter ISBN to search: ";
                    getline(cin, searchTerm);

                    // Sort books by ISBN for binary search
                    sort(books, books + n, compareByISBN);

                    int index = binarySearchByISBN(books, n, searchTerm);
                    if (index != -1) {
                        cout << "Book found:\n";
                        cout << "ISBN: " << books[index].ISBN << "\n";
                        cout << "Book Name: " << books[index].bookName << "\n";
                        cout << "Author Name: " << books[index].authName << "\n";
                        cout << "Publisher Name: " << books[index].pubName << "\n";
                    } else {
                        cout << "Book not found by ISBN.\n";
                    }
                } else {
                    cout << "Invalid choice. Please enter 'i' for ISBN or 'n' for Book Name.\n";
                }
                break;
            }
            case 4:
                listBooks(books, n);
                break;
            case 5:
                cout << "Exiting the program.\n";
                break;
            default:
                cout << "Invalid choice. Please try again.\n";
        }
    } while (choice != 5);

    return 0;
}
