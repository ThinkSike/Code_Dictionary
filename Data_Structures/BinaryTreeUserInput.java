import java.util.*;

class Node {
    int data;
    Node left, right;

    public Node(int data) {
        this.data = data;
        this.left = this.right = null;
    }
}

class BinaryTree {
    Node root;

    // Function to construct a binary tree level-wise
    public Node constructTree(int numNodes, int levels) {
        if (numNodes <= 0 || levels <= 0) return null;
        
        Scanner scanner = new Scanner(System.in);
        Queue<Node> queue = new LinkedList<>();
        
        System.out.print("Enter root node value: ");
        Node root = new Node(scanner.nextInt());
        queue.add(root);
        
        int count = 1, level = 1;
        while (!queue.isEmpty() && count < numNodes && level < levels) {
            int size = queue.size();
            
            for (int i = 0; i < size && count < numNodes; i++) {
                Node current = queue.poll();
                
                System.out.print("Enter left child of " + current.data + " (or -1 for no child): ");
                int leftVal = scanner.nextInt();
                if (leftVal != -1) {
                    current.left = new Node(leftVal);
                    queue.add(current.left);
                    count++;
                }

                if (count < numNodes) {
                    System.out.print("Enter right child of " + current.data + " (or -1 for no child): ");
                    int rightVal = scanner.nextInt();
                    if (rightVal != -1) {
                        current.right = new Node(rightVal);
                        queue.add(current.right);
                        count++;
                    }
                }
            }
            level++;
        }
        scanner.close();
        return root;
    }

    // Inorder traversal for verification
    public void inorderTraversal(Node node) {
        if (node == null) return;
        inorderTraversal(node.left);
        System.out.print(node.data + " ");
        inorderTraversal(node.right);
    }
}

public class BinaryTreeUserInput {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        System.out.print("Enter number of nodes: ");
        int numNodes = scanner.nextInt();
        
        System.out.print("Enter number of levels: ");
        int levels = scanner.nextInt();
        
        BinaryTree tree = new BinaryTree();
        tree.root = tree.constructTree(numNodes, levels);
        
        System.out.println("Inorder Traversal of the tree: ");
        tree.inorderTraversal(tree.root);
        scanner.close();
    }
}
