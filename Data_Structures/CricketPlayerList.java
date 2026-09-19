import java.util.LinkedList;
import java.util.Scanner;

// Create a Linked list to store cricket player information like [Player_ID, Name, mobileNo, age].
// Implement operations on this list such as
// 1. Add a new player,
// 2. Delete player from the list,
// 3. Display list of all players,
// 4. Search a player in the list (search on name)
// 5. Update mobile number of a player.

class Player {
    int playerID;
    String name;
    String mobileNo;
    int age;

    Player(int playerID, String name, String mobileNo, int age) {
        this.playerID = playerID;
        this.name = name;
        this.mobileNo = mobileNo;
        this.age = age;
    }

    @Override
    public String toString() {
        return "Player ID: " + playerID + ", Name: " + name + ", Mobile No: " + mobileNo + ", Age: " + age;
    }
}

public class CricketPlayerList {
    LinkedList<Player> playerList = new LinkedList<>();

    public void addPlayer(int playerID, String name, String mobileNo, int age) {
        Player player = new Player(playerID, name, mobileNo, age);
        playerList.add(player);
    }

    public void deletePlayer(int playerID) {
        playerList.removeIf(player -> player.playerID == playerID);
    }

    public void displayPlayers() {
        for (Player player : playerList) {
            System.out.println(player);
        }
    }

    public Player searchPlayer(String name) {
        for (Player player : playerList) {
            if (player.name.equalsIgnoreCase(name)) {
                return player;
            }
        }
        return null;
    }

    public void updateMobileNo(int playerID, String newMobileNo) {
        for (Player player : playerList) {
            if (player.playerID == playerID) {
                player.mobileNo = newMobileNo;
                break;
            }
        }
    }

    public static void main(String[] args) {
        CricketPlayerList list = new CricketPlayerList();
        Scanner scanner = new Scanner(System.in);
        int choice;

        do {
            System.out.println("1. Add Player");
            System.out.println("2. Delete Player");
            System.out.println("3. Display Players");
            System.out.println("4. Search Player");
            System.out.println("5. Update Mobile No");
            System.out.println("6. Exit");
            System.out.print("Enter your choice: ");
            choice = scanner.nextInt();

            switch (choice) {
                case 1:
                    System.out.print("Enter Player ID: ");
                    int playerID = scanner.nextInt();
                    scanner.nextLine(); // consume newline
                    System.out.print("Enter Name: ");
                    String name = scanner.nextLine();
                    System.out.print("Enter Mobile No: ");
                    String mobileNo = scanner.nextLine();
                    System.out.print("Enter Age: ");
                    int age = scanner.nextInt();
                    list.addPlayer(playerID, name, mobileNo, age);
                    break;
                case 2:
                    System.out.print("Enter Player ID to delete: ");
                    playerID = scanner.nextInt();
                    list.deletePlayer(playerID);
                    break;
                case 3:
                    list.displayPlayers();
                    break;
                case 4:
                    System.out.print("Enter Name to search: ");
                    scanner.nextLine(); // consume newline
                    name = scanner.nextLine();
                    Player player = list.searchPlayer(name);
                    if (player != null) {
                        System.out.println(player);
                    } else {
                        System.out.println("Player not found.");
                    }
                    break;
                case 5:
                    System.out.print("Enter Player ID to update mobile no: ");
                    playerID = scanner.nextInt();
                    scanner.nextLine(); // consume newline
                    System.out.print("Enter new Mobile No: ");
                    String newMobileNo = scanner.nextLine();
                    list.updateMobileNo(playerID, newMobileNo);
                    break;
                case 6:
                    System.out.println("Exiting...");
                    break;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        } while (choice != 6);

        scanner.close();
    }
}