import java.util.LinkedList;
import java.util.Queue;
import java.util.Scanner;

public class PizzaParlour {
    public static void main(String[] args) {
        Queue<String> orders = new LinkedList<>();
        Scanner scanner = new Scanner(System.in);
        int choice;

        do {
            System.out.println("1. Accept the order");
            System.out.println("2. Deliver the order");
            System.out.println("3. Display all orders in waiting");
            System.out.println("4. Exit");
            System.out.print("Enter your choice: ");
            choice = scanner.nextInt();
            scanner.nextLine(); // consume newline

            switch (choice) {
                case 1:
                    System.out.print("Enter the order: ");
                    String order = scanner.nextLine();
                    orders.add(order);
                    System.out.println("Order accepted.");
                    break;
                case 2:
                    if (orders.isEmpty()) {
                        System.out.println("No orders to deliver.");
                    } else {
                        System.out.println("Delivered: " + orders.poll());
                    }
                    break;
                case 3:
                    if (orders.isEmpty()) {
                        System.out.println("No orders in waiting.");
                    } else {
                        System.out.println("Orders in waiting: " + orders);
                    }
                    break;
                case 4:
                    System.out.println("Exiting...");
                    break;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        } while (choice != 4);

        scanner.close();
    }
}