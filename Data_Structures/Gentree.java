import java.util.LinkedList;
import java.util.Queue;

public class Gentree {
    public static class Node{
        int data;
        Node left;
        Node right;
        Node(int data){
            this.data = data;
            this.left = null;
            this.right = null;
        }
    }
    public static Gentree.Node insert(Node root, int data){
        if(root == null){
            root = new Node(data);
            return root;
        }
        if(root.data > data){
            root.left = insert(root.left, data);
        }
        else{
            root.right = insert(root.right, data);
        }
        return root;
    }

    public static void inorder(Node root){
        if(root == null){
            return;
        }
        inorder(root.left);
        System.out.print(root.data + " ");
        inorder(root.right);
    }

    public static void preorder(Node root){
        if(root == null){
            return;
        }
        System.out.print(root.data + " ");
        preorder(root.left);
        preorder(root.right);
    }

    public static void postorder(Node root){
        if(root == null){
            return;
        }
        postorder(root.left);
        postorder(root.right);
        System.out.print(root.data + " ");
    }
    
    public static void levelOrder(Node root){
        if(root == null){
            return;
        }
        Queue<Node> queue = new LinkedList<>();
        queue.add(root);
        while(!queue.isEmpty()){
            Node current = queue.poll();
            System.out.print(current.data + " ");
            if(current.left != null){
                queue.add(current.left);
            }
            if(current.right != null){
                queue.add(current.right);
            }
        }
    }

    public static void main(String[] args){
        Node root = new Node(2);
        root.left = new Node(7);
        root.right = new Node(5);

        root.left.left = new Node(2);
        root.left.right = new Node(6);

        root.left.right.left = new Node(5);
        root.left.right.right = new Node(11);;
        root.right.right = new Node(9);
        root.right.right.left = new Node(4);

        System.out.println("Inorder traversal of binary tree:");
        inorder(root);
        System.out.println("\nPreorder traversal of binary tree:");
        preorder(root);
        System.out.println("\nPostorder traversal of binary tree:");
        postorder(root);

        System.out.println("\nLevelorder traversal of binary tree:");
        levelOrder(root);
            }
         
}
