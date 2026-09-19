import java.io.*;
import java.util.Scanner;

// Implement basic record level operations (create, display, add, delete) on File.

public class FileOperations {

    private static final String FILE_NAME = "records.txt";

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        while (true) {
            System.out.println("1. Create File");
            System.out.println("2. Display Records");
            System.out.println("3. Add Record");
            System.out.println("4. Delete Record");
            System.out.println("5. Exit");
            System.out.print("Enter your choice: ");
            int choice = scanner.nextInt();
            scanner.nextLine(); // consume newline

            switch (choice) {
                case 1:
                    createFile();
                    break;
                case 2:
                    displayRecords();
                    break;
                case 3:
                    addRecord(scanner);
                    break;
                case 4:
                    deleteRecord(scanner);
                    break;
                case 5:
                    System.exit(0);
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        }
    }

    private static void createFile() {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(FILE_NAME))) {
            System.out.println("File created successfully.");
        } catch (IOException e) {
            System.out.println("An error occurred while creating the file.");
            e.printStackTrace();
        }
    }

    private static void displayRecords() {
        try (BufferedReader reader = new BufferedReader(new FileReader(FILE_NAME))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            System.out.println("An error occurred while reading the file.");
            e.printStackTrace();
        }
    }

    private static void addRecord(Scanner scanner) {
        System.out.print("Enter record to add: ");
        String record = scanner.nextLine();
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(FILE_NAME, true))) {
            writer.write(record);
            writer.newLine();
            System.out.println("Record added successfully.");
        } catch (IOException e) {
            System.out.println("An error occurred while adding the record.");
            e.printStackTrace();
        }
    }

    private static void deleteRecord(Scanner scanner) {
        System.out.print("Enter record to delete: ");
        String recordToDelete = scanner.nextLine();
        File inputFile = new File(FILE_NAME);
        File tempFile = new File("temp_" + FILE_NAME);

        try (BufferedReader reader = new BufferedReader(new FileReader(inputFile));
             BufferedWriter writer = new BufferedWriter(new FileWriter(tempFile))) {
            String line;
            boolean found = false;
            while ((line = reader.readLine()) != null) {
                if (line.trim().equals(recordToDelete.trim())) {
                    found = true;
                    continue;
                }
                writer.write(line);
                writer.newLine();
            }
            if (found) {
                System.out.println("Record deleted successfully.");
            } else {
                System.out.println("Record not found.");
            }
        } catch (IOException e) {
            System.out.println("An error occurred while deleting the record.");
            e.printStackTrace();
        }

        if (!inputFile.delete()) {
            System.out.println("Could not delete original file.");
            return;
        }
        if (!tempFile.renameTo(inputFile)) {
            System.out.println("Could not rename temporary file.");
        }
    }
}