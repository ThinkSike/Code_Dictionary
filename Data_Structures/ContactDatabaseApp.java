import java.util.Scanner;

// Class representing a client/contact
class Client {
    String name;
    String mobile;
    String email;
    boolean isDeleted;

    Client(String name, String mobile, String email) {
        this.name = name;
        this.mobile = mobile;
        this.email = email;
        this.isDeleted = false;
    }
}

// Custom Hash Table
class ContactHashTable {
    private final int TABLE_SIZE = 10;
    private Client[] table;

    public ContactHashTable() {
        table = new Client[TABLE_SIZE];
    }

    // Hash function based on mobile number
    private int hash(String mobile) {
        long number = Long.parseLong(mobile);
        return (int) (number % TABLE_SIZE);
    }

    // Linear probing for collision resolution
    private int probeForInsert(String mobile) {
        int index = hash(mobile);
        int start = index;

        while (table[index] != null && !table[index].isDeleted) {
            index = (index + 1) % TABLE_SIZE;
            if (index == start) return -1; // Table full
        }

        return index;
    }

    // Insert client
    public void addClient(String name, String mobile, String email) {
        int index = probeForInsert(mobile);
        if (index == -1) {
            System.out.println("Hash table is full. Cannot add more clients.");
            return;
        }

        table[index] = new Client(name, mobile, email);
        System.out.println("Client added at index " + index);
    }

    // Search for a client
    public Client searchClient(String mobile) {
        int index = hash(mobile);
        int start = index;

        while (table[index] != null) {
            if (!table[index].isDeleted && table[index].mobile.equals(mobile)) {
                return table[index];
            }
            index = (index + 1) % TABLE_SIZE;
            if (index == start) break;
        }
        return null;
    }

    // Logical delete
    public void deleteClient(String mobile) {
        Client client = searchClient(mobile);
        if (client != null) {
            client.isDeleted = true;
            System.out.println("Client marked as deleted.");
        } else {
            System.out.println("Client not found.");
        }
    }

    // Display all clients
    public void displayAll() {
        System.out.println("\n--- Contact List ---");
        for (int i = 0; i < TABLE_SIZE; i++) {
            Client c = table[i];
            if (c != null && !c.isDeleted) {
                System.out.println("Index " + i + ": Name: " + c.name + ", Mobile: " + c.mobile + ", Email: " + c.email);
            }
        }
    }
}

public class ContactDatabaseApp {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        ContactHashTable db = new ContactHashTable();
        int choice;

        do {
            System.out.println("\n--- Contact Database Menu ---");
            System.out.println("1. Add Client");
            System.out.println("2. Display All Clients");
            System.out.println("3. Search Client");
            System.out.println("4. Delete Client");
            System.out.println("0. Exit");
            System.out.print("Enter your choice: ");
            choice = sc.nextInt();
            sc.nextLine();  // Consume newline

            switch (choice) {
                case 1:
                    System.out.print("Enter name: ");
                    String name = sc.nextLine();
                    System.out.print("Enter mobile number: ");
                    String mobile = sc.nextLine();
                    System.out.print("Enter email: ");
                    String email = sc.nextLine();
                    db.addClient(name, mobile, email);
                    break;

                case 2:
                    db.displayAll();
                    break;

                case 3:
                    System.out.print("Enter mobile number to search: ");
                    String searchMobile = sc.nextLine();
                    Client found = db.searchClient(searchMobile);
                    if (found != null) {
                        System.out.println("Client Found: Name = " + found.name + ", Email = " + found.email);
                    } else {
                        System.out.println("Client not found.");
                    }
                    break;

                case 4:
                    System.out.print("Enter mobile number to delete: ");
                    String deleteMobile = sc.nextLine();
                    db.deleteClient(deleteMobile);
                    break;

                case 0:
                    System.out.println("Exiting.");
                    break;

                default:
                    System.out.println("Invalid choice.");
            }

        } while (choice != 0);

        sc.close();
    }
}
