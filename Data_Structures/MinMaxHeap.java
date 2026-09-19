import java.util.Scanner;

class MinHeap {
    int[] heap;
    int size;

    MinHeap(int capacity) {
        heap = new int[capacity];
        size = 0;
    }

    void insert(int val) {
        heap[size] = val;
        int i = size;
        size++;
        while (i > 0 && heap[i] < heap[(i - 1) / 2]) {
            int temp = heap[i];
            heap[i] = heap[(i - 1) / 2];
            heap[(i - 1) / 2] = temp;
            i = (i - 1) / 2;
        }
    }

    void deleteMin() {
        if (size == 0) {
            System.out.println("Heap is empty.");
            return;
        }
        System.out.println("Deleted Min: " + heap[0]);
        heap[0] = heap[size - 1];
        size--;
        minHeapify(0);
    }

    void minHeapify(int i) {
        int smallest = i;
        int left = 2 * i + 1, right = 2 * i + 2;

        if (left < size && heap[left] < heap[smallest]) smallest = left;
        if (right < size && heap[right] < heap[smallest]) smallest = right;

        if (smallest != i) {
            int temp = heap[i];
            heap[i] = heap[smallest];
            heap[smallest] = temp;
            minHeapify(smallest);
        }
    }

    void display() {
        System.out.print("Min Heap: ");
        for (int i = 0; i < size; i++) System.out.print(heap[i] + " ");
        System.out.println();
    }
}

class MaxHeap {
    int[] heap;
    int size;

    MaxHeap(int capacity) {
        heap = new int[capacity];
        size = 0;
    }

    void insert(int val) {
        heap[size] = val;
        int i = size;
        size++;
        while (i > 0 && heap[i] > heap[(i - 1) / 2]) {
            int temp = heap[i];
            heap[i] = heap[(i - 1) / 2];
            heap[(i - 1) / 2] = temp;
            i = (i - 1) / 2;
        }
    }

    void deleteMax() {
        if (size == 0) {
            System.out.println("Heap is empty.");
            return;
        }
        System.out.println("Deleted Max: " + heap[0]);
        heap[0] = heap[size - 1];
        size--;
        maxHeapify(0);
    }

    void maxHeapify(int i) {
        int largest = i;
        int left = 2 * i + 1, right = 2 * i + 2;

        if (left < size && heap[left] > heap[largest]) largest = left;
        if (right < size && heap[right] > heap[largest]) largest = right;

        if (largest != i) {
            int temp = heap[i];
            heap[i] = heap[largest];
            heap[largest] = temp;
            maxHeapify(largest);
        }
    }

    void display() {
        System.out.print("Max Heap: ");
        for (int i = 0; i < size; i++) System.out.print(heap[i] + " ");
        System.out.println();
    }
}

public class MinMaxHeap {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        MinHeap minHeap = new MinHeap(50);
        MaxHeap maxHeap = new MaxHeap(50);
        int choice;

        do {
            System.out.println("\n1. Insert MinHeap\n2. Delete Min\n3. Display MinHeap");
            System.out.println("4. Insert MaxHeap\n5. Delete Max\n6. Display MaxHeap\n7. Exit");
            System.out.print("Enter your choice: ");
            choice = sc.nextInt();

            switch (choice) {
                case 1:
                    System.out.print("Enter element to insert into MinHeap: ");
                    minHeap.insert(sc.nextInt());
                    break;
                case 2:
                    minHeap.deleteMin();
                    break;
                case 3:
                    minHeap.display();
                    break;
                case 4:
                    System.out.print("Enter element to insert into MaxHeap: ");
                    maxHeap.insert(sc.nextInt());
                    break;
                case 5:
                    maxHeap.deleteMax();
                    break;
                case 6:
                    maxHeap.display();
                    break;
                case 7:
                    System.out.println("Exiting...");
                    break;
                default:
                    System.out.println("Invalid choice!");
            }
        } while (choice != 7);

        sc.close();
    }
}
