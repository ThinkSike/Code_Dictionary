import java.util.HashMap;
import java.util.Scanner;

public class DictionarywithBST {
    private static HashMap<String, String> dictionary = new HashMap<>();

    public static void add(String keyword, String meaning) {
        dictionary.put(keyword, meaning);
        System.out.println("Keyword added successfully.");
    }

    public static void delete(String keyword) {
        if (dictionary.containsKey(keyword)) {
            dictionary.remove(keyword);
            System.out.println("Keyword deleted successfully.");
        } else {
            System.out.println("Keyword not found.");
        }
    }

    public static void display() {
        if (dictionary.isEmpty()) {
            System.out.println("Dictionary is empty.");
        } else {
            System.out.println("Dictionary contents:");
            for (String key : dictionary.keySet()) {
                System.out.println(key + " : " + dictionary.get(key));
            }
        }
    }

    public static void search(String keyword) {
        if (dictionary.containsKey(keyword)) {
            System.out.println(keyword + " : " + dictionary.get(keyword));
        } else {
            System.out.println("Keyword not found.");
        }
    }

    public static void update(String keyword, String newMeaning) {
        if (dictionary.containsKey(keyword)) {
            dictionary.put(keyword, newMeaning);
            System.out.println("Meaning updated successfully.");
        } else {
            System.out.println("Keyword not found.");
        }
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int choice;
        String keyword, meaning;

        do {
            System.out.println("\n--- Dictionary Menu ---");
            System.out.println("1. Add Keyword");
            System.out.println("2. Delete Keyword");
            System.out.println("3. Display Dictionary");
            System.out.println("4. Search Keyword");
            System.out.println("5. Update Meaning");
            System.out.println("6. Exit");
            System.out.print("Enter your choice: ");
            choice = sc.nextInt();
            sc.nextLine(); // consume newline

            switch (choice) {
                case 1:
                    System.out.print("Enter keyword: ");
                    keyword = sc.nextLine();
                    System.out.print("Enter meaning: ");
                    meaning = sc.nextLine();
                    add(keyword, meaning);
                    break;
                case 2:
                    System.out.print("Enter keyword to delete: ");
                    keyword = sc.nextLine();
                    delete(keyword);
                    break;
                case 3:
                    display();
                    break;
                case 4:
                    System.out.print("Enter keyword to search: ");
                    keyword = sc.nextLine();
                    search(keyword);
                    break;
                case 5:
                    System.out.print("Enter keyword to update: ");
                    keyword = sc.nextLine();
                    System.out.print("Enter new meaning: ");
                    meaning = sc.nextLine();
                    update(keyword, meaning);
                    break;
                case 6:
                    System.out.println("Exiting... Bye!");
                    break;
                default:
                    System.out.println("Invalid choice!");
            }
        } while (choice != 6);

        sc.close();
    }
}
