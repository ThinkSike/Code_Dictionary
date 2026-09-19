import java.util.*;

public class CityMap {
    private Map<String, List<String>> adjList;

    public CityMap() {
        adjList = new HashMap<>();
    }

    // 1. Add a city (node)
    public void addCity(String city) {
        adjList.putIfAbsent(city, new ArrayList<>());
    }

    // 2. Add a road (edge between two cities, undirected)
    public void addRoad(String city1, String city2) {
        if (!adjList.containsKey(city1) || !adjList.containsKey(city2)) {
            System.out.println("One or both cities do not exist.");
            return;
        }
        adjList.get(city1).add(city2);
        adjList.get(city2).add(city1);
    }

    // Display the adjacency list
    public void displayCityMap() {
        System.out.println("\n--- City Map (Adjacency List) ---");
        for (String city : adjList.keySet()) {
            System.out.println(city + " -> " + adjList.get(city));
        }
    }

    // 3. Breadth-First Search (BFS)
    public void bfs(String startCity) {
        if (!adjList.containsKey(startCity)) {
            System.out.println("City not found in map.");
            return;
        }

        Set<String> visited = new HashSet<>();
        Queue<String> queue = new LinkedList<>();

        visited.add(startCity);
        queue.offer(startCity);

        System.out.print("BFS traversal from " + startCity + ": ");
        while (!queue.isEmpty()) {
            String current = queue.poll();
            System.out.print(current + " ");

            for (String neighbor : adjList.get(current)) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    queue.offer(neighbor);
                }
            }
        }
        System.out.println();
    }

    // 4. Depth-First Search (DFS)
    public void dfs(String startCity) {
        if (!adjList.containsKey(startCity)) {
            System.out.println("City not found in map.");
            return;
        }

        Set<String> visited = new HashSet<>();
        System.out.print("DFS traversal from " + startCity + ": ");
        dfsHelper(startCity, visited);
        System.out.println();
    }

    private void dfsHelper(String city, Set<String> visited) {
        visited.add(city);
        System.out.print(city + " ");

        for (String neighbor : adjList.get(city)) {
            if (!visited.contains(neighbor)) {
                dfsHelper(neighbor, visited);
            }
        }
    }

    // 5. Check path existence using BFS
    public boolean isPathExists(String src, String dest) {
        if (!adjList.containsKey(src) || !adjList.containsKey(dest)) {
            return false;
        }

        Set<String> visited = new HashSet<>();
        Queue<String> queue = new LinkedList<>();

        visited.add(src);
        queue.offer(src);

        while (!queue.isEmpty()) {
            String current = queue.poll();
            if (current.equals(dest)) {
                return true;
            }

            for (String neighbor : adjList.get(current)) {
                if (!visited.contains(neighbor)) {
                    visited.add(neighbor);
                    queue.offer(neighbor);
                }
            }
        }

        return false;
    }

    // --- MAIN FUNCTION ---
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        CityMap cityMap = new CityMap();

        System.out.print("Enter number of cities: ");
        int cityCount = sc.nextInt();
        sc.nextLine();

        System.out.println("Enter city names:");
        for (int i = 0; i < cityCount; i++) {
            String city = sc.nextLine();
            cityMap.addCity(city);
        }

        System.out.print("Enter number of roads: ");
        int roadCount = sc.nextInt();
        sc.nextLine();

        System.out.println("Enter roads (city1 city2):");
        for (int i = 0; i < roadCount; i++) {
            String[] edge = sc.nextLine().split(" ");
            cityMap.addRoad(edge[0], edge[1]);
        }

        cityMap.displayCityMap();

        System.out.print("\nEnter a city to start BFS and DFS: ");
        String startCity = sc.nextLine();
        cityMap.bfs(startCity);
        cityMap.dfs(startCity);

        System.out.print("\nCheck path existence:\nEnter source city: ");
        String src = sc.nextLine();
        System.out.print("Enter destination city: ");
        String dest = sc.nextLine();

        if (cityMap.isPathExists(src, dest)) {
            System.out.println("✅ Path exists between " + src + " and " + dest);
        } else {
            System.out.println("❌ No path between " + src + " and " + dest);
        }

        sc.close();
    }
}
