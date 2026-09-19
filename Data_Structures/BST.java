public class BST {
    private BSTNode root;

    public BST() {
        root = null;
    }

    // Insert a value into the BST
    public void insert(int value) {
        root = insertRec(root, value);
    }

    private BSTNode insertRec(BSTNode root, int value) {
        if (root == null) {
            return new BSTNode(value);
        }
        if (value < root.data) {
            root.left = insertRec(root.left, value);
        } else if (value > root.data) {
            root.right = insertRec(root.right, value);
        }
        return root;
    }

    // Search for a value in the BST
    public boolean search(int key) {
        return searchRec(root, key);
    }

    private boolean searchRec(BSTNode root, int key) {
        if (root == null) {
            return false;
        }
        if (root.data == key) {
            return true;
        }
        return key < root.data ? searchRec(root.left, key) : searchRec(root.right, key);
    }

    // Delete a node from the BST
    public void delete(int key) {
        root = deleteRec(root, key);
    }

    private BSTNode deleteRec(BSTNode root, int key) {
        if (root == null) return null;

        if (key < root.data) {
            root.left = deleteRec(root.left, key);
        } else if (key > root.data) {
            root.right = deleteRec(root.right, key);
        } else {
            // Node to be deleted found

            // Case 1: One or zero child
            if (root.left == null)
                return root.right;
            else if (root.right == null)
                return root.left;

            // Case 2: Node with two children
            root.data = minValue(root.right); // Find inorder successor
            root.right = deleteRec(root.right, root.data);
        }

        return root;
    }

    private int minValue(BSTNode root) {
        int minv = root.data;
        while (root.left != null) {
            root = root.left;
            minv = root.data;
        }
        return minv;
    }

    // Inorder traversal
    public void inorder() {
        System.out.print("Inorder: ");
        inorderRec(root);
        System.out.println();
    }

    private void inorderRec(BSTNode root) {
        if (root != null) {
            inorderRec(root.left);
            System.out.print(root.data + " ");
            inorderRec(root.right);
        }
    }

    // Preorder traversal
    public void preorder() {
        System.out.print("Preorder: ");
        preorderRec(root);
        System.out.println();
    }

    private void preorderRec(BSTNode root) {
        if (root != null) {
            System.out.print(root.data + " ");
            preorderRec(root.left);
            preorderRec(root.right);
        }
    }

    // Postorder traversal
    public void postorder() {
        System.out.print("Postorder: ");
        postorderRec(root);
        System.out.println();
    }

    private void postorderRec(BSTNode root) {
        if (root != null) {
            postorderRec(root.left);
            postorderRec(root.right);
            System.out.print(root.data + " ");
        }
    }
}
// // BST.java (Abstract Data Type)
// public class BST {
//     private BSTNode root;

//     public BST() {
//         root = null;
//     }

//     // Insert method
//     public void insert(int value) {
//         root = insertRec(root, value);
//     }

//     private BSTNode insertRec(BSTNode root, int value) {
//         if (root == null) {
//             root = new BSTNode(value);
//             return root;
//         }
//         if (value < root.data)
//             root.left = insertRec(root.left, value);
//         else if (value > root.data)
//             root.right = insertRec(root.right, value);
//         return root;
//     }

//     // Search method
//     public boolean search(int key) {
//         return searchRec(root, key);
//     }

//     private boolean searchRec(BSTNode root, int key) {
//         if (root == null) return false;
//         if (root.data == key) return true;
//         return key < root.data ? searchRec(root.left, key) : searchRec(root.right, key);
//     }

//     // Delete method
//     public void delete(int key) {
//         root = deleteRec(root, key);
//     }

//     private BSTNode deleteRec(BSTNode root, int key) {
//         if (root == null) return root;
//         if (key < root.data)
//             root.left = deleteRec(root.left, key);
//         else if (key > root.data)
//             root.right = deleteRec(root.right, key);
//         else {
//             // Node with one or no child
//             if (root.left == null) return root.right;
//             else if (root.right == null) return root.left;
//             // Node with two children
//             root.data = minValue(root.right);
//             root.right = deleteRec(root.right, root.data);
//         }
//         return root;
//     }

//     private int minValue(BSTNode node) {
//         int minv = node.data;
//         while (node.left != null) {
//             node = node.left;
//             minv = node.data;
//         }
//         return minv;
//     }

//     // Traversals
//     public void inorder() {
//         System.out.print("Inorder: ");
//         inorderRec(root);
//         System.out.println();
//     }

//     private void inorderRec(BSTNode root) {
//         if (root != null) {
//             inorderRec(root.left);
//             System.out.print(root.data + " ");
//             inorderRec(root.right);
//         }
//     }

//     public void preorder() {
//         System.out.print("Preorder: ");
//         preorderRec(root);
//         System.out.println();
//     }

//     private void preorderRec(BSTNode root) {
//         if (root != null) {
//             System.out.print(root.data + " ");
//             preorderRec(root.left);
//             preorderRec(root.right);
//         }
//     }

//     public void postorder() {
//         System.out.print("Postorder: ");
//         postorderRec(root);
//         System.out.println();
//     }

//     private void postorderRec(BSTNode root) {
//         if (root != null) {
//             postorderRec(root.left);
//             postorderRec(root.right);
//             System.out.print(root.data + " ");
//         }
//     }
// }

