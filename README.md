## Priority Queue Todo List

### Idea to implement Priority Queue for a todo list

Let's implement a priority queue for a todo list.

#### Tasks List

- **Task 1**: _Do laundry_ 🧺  
  **Priority**: 4 — _Low priority task_

- **Task 2**: _Go grocery shopping_ 🛒  
  **Priority**: 3 — _Medium priority task_

- **Task 3**: _Pay bills_ 💸  
  **Priority**: 2 — _High priority task_

- **Task 4**: _Call relatives_ 📞  
  **Priority**: 5 — _Lowest priority task_

### Implementation: Naive Method (Bubble Sort)

1. Insert Do laundry (4)

   ```text
   [ Do laundry (4) ]
   ```

2. Insert Go grocery shopping (3)

   ```text
   [ Do laundry (4), Go grocery shopping (3) ]
   ```

3. Swap (since 3 < 4)

   ```text
   [ Go grocery shopping (3), Do laundry (4) ]
   ```

4. Insert Pay bills (2)

   ```text
   [ Go grocery shopping (3), Do laundry (4), Pay bills (2) ]
   ```

5. Swap (since 2 < 4)

   ```text
   [ Go grocery shopping (3), Pay bills (2), Do laundry (4) ]
   ```

6. Swap (since 2 < 3)

   ```text
   [ Pay bills (2), Go grocery shopping (3), Do laundry (4) ]
   ```

7. Insert Call relatives (5)

   ```text
   [ Pay bills (2), Go grocery shopping (3), Do laundry (4), Call relatives (5) ]
   ```

8. No swaps needed (5 is the lowest priority)

   ```text
   [ Pay bills (2), Go grocery shopping (3), Do laundry (4), Call relatives (5) ]
   ```

### Implementation: Efficient Method (Heap)

1. Insert Do laundry (4)

```text
        4
      [Do laundry(4)]
```

2. Insert Go grocery shopping (3)

```text
Insert at next available position

        4
      /
    3
[Do laundry(4), Go grocery shopping(3)]
```

```text
 Compare with parent (3 < 4), so swap

        3
      /
    4
[Go grocery shopping(3), Do laundry(4)]
```

3. Insert Pay bills (2)

```text
Insert at next available position

        3
      /   \
    4      2
[Go grocery shopping(3), Do laundry(4), Pay bills(2)]
```

```text
Compare with parent (2 < 3), so swap

          2
        /   \
      4      3
[Pay bills(2), Do laundry(4), Go grocery shopping(3)]
```

4. Insert Call relatives (5)

```text
Insert at next available position (left of 4)
5 > 4 → no swap needed

        2
      /   \
    4      3
   /
 5
[Pay bills(2), Go grocery shopping(3), Do laundry(4), Call relatives(5)]
```

### Compare brute force method with priority queue method

Time to insert a new task: n = number of tasks

- Brute force method: `O(n)` This is because we have to compare each element with every other element.
- Priority queue method: `O(log n)` This is because we have to compare each element with its parent.

Example:
Assume this list is already sorted in ascending order of priority (lower number = higher priority):
[
Pay bills (priority: 2),
Go grocery shopping (priority: 3),
Do laundry (priority: 4),
Call relatives (priority: 5)
]

New Task to Insert:

- **Task**: _Take medicine_ 💊  
  **Priority**: 1 — _Highest priority task_

Brute Force Method `O(n)`:

1. Insert at the end: [2, 3, 4, 5, 1]

   ```text
   [Pay bills(2), Go grocery shopping(3), Do laundry(4), Call relatives(5), Take medicine(1)]
   ```

2. Compare with previous element (5 > 1) → swap: [2, 3, 4, 1, 5]

   ```text
   [Pay bills(2), Go grocery shopping(3), Do laundry(4), Take medicine(1), Call relatives(5)]
   ```

3. Compare with 4 > 1 → swap: [2, 3, 1, 4, 5]

   ```text
   [Pay bills(2), Go grocery shopping(3), Take medicine(1), Do laundry(4), Call relatives(5)]
   ```

4. Compare with 3 > 1 → swap: [2, 1, 3, 4, 5]

   ```text
   [Pay bills(2), Take medicine(1), Go grocery shopping(3), Do laundry(4), Call relatives(5)]
   ```

5. Compare with 2 > 1 → swap: [1, 2, 3, 4, 5]
   ```text
   [Take medicine(1), Pay bills(2), Go grocery shopping(3), Do laundry(4), Call relatives(5)]
   ```

4 comparisons/swaps = `O(n)` steps in this insert

Priority Queue Method `O(log n)`:

1. Insert at next available position (right of 3):

```text
[2, 3, 4, 5, 1] => [Pay bills(2), Go grocery shopping(3), Do laundry(4), Call relatives(5), Take medicine(1)]
          2
        /   \
      3       4
     / \
    5   1
```

2. Compare with parent (3 > 1)

```text
swap: [2, 1, 4, 5, 3] => [Pay bills(2), Take medicine(1), Do laundry(4), Call relatives(5), Go grocery shopping(3)]
          2
        /   \
      1       4
     / \
    5   3
```

3. Compare with parent (2 > 1)

```text
swap: [1, 2, 4, 5, 3] => [Take medicine(1), Pay bills(2), Do laundry(4), Call relatives(5), Go grocery shopping(3)]
          1
        /   \
      2       4
     / \
    5   3
```

Only 2 comparisons/swaps were needed = `O(log n)` steps in this insert.
n = 5 (number of elements in the priority queue) and **log(n) ≈ 2.32 = 2**

We can see using the priority queue method is faster than the brute force method because it requires less comparisons/swaps.

### Remove the high priority task from the list (naive approach)

This is our list:

```text
[1, 2, 3, 4, 5]
[Take medicine(1), Pay bills(2), Go grocery shopping(3), Do laundry(4), Call relatives(5)]
```

1. Remove the first element: [2, 3, 4, 5]
   [Pay bills(2), Go grocery shopping(3), Do laundry(4), Call relatives(5)]

### Remove the high priority task from the list (priority queue approach)

This is our list:

```text
   [1, 2, 4, 5, 3]
   [Take medicine(1), Pay bills(2), Do laundry(4), Call relatives(5), Go grocery shopping(3)]

          1
        /   \
      2       4
     / \
    5   3
```

1. Remove the root and replace it with the last element

```text
[1, 2, 4, 5, 3] => [3, 2, 4, 5]
          3
        /   \
      2       4
     /
    5
```

2. Now, we need to "heapify" the tree (make sure the heap property is maintained):

```text
Compare the root 3 with its children (2 and 4).
The smallest child is 2, so we swap 3 with 2.

          2
        /   \
      3       4
     /
    5

    [Pay bills(2), Go grocery shopping(3), Do laundry(4), Call relatives(5)]
```

#### Summary of removing a task:

- Sorted List: `O(n)` (due to shifting elements after removal).
  To remove the highest priority task from a sorted list is `O(1)` but we have to shift all elements left so it is `O(n)`.

- Min Heap: `O(log n)` (due to the heapify operation).
  To remove the highest priority task from a min heap is `O(1)` but we have to heapify the tree so it is `O(log n)`.
  This involves comparing the root with its children and swapping if necessary.

### How do we figure out the parent of an element in array in a heap?

Lets look at the tree equivalent of the array

```text
    Tree:
        1
       / \
      2   4
     / \
    5   3


    Array: [1, 2, 4, 5, 3]
```

What is the parent of the element 4? Looking at the tree it is easy to see that the parent is 1. But how do we figure out the parent of the element 4 in the array?

Let's revist the tree and try to figure and label each branch with its corresponding index

```text
    Tree:
        1(0)
        /  \
      2(1)  4(2)
      / \
    5(3) 3(4)


    Array: [1, 2, 4, 5, 3]
```

Can we figure out a formula to get the index of the children of a parent in the array? For example what is the index of the children of the parent 1?
1 is index 0. 2 is index 1 and 4 is index 2.
What formula can we use to get index 1 and 2 using index 0? To get the left child we can use 2i + 1 and to get the right child we can use 2i + 2.
`2 * 0 + 1 = 1` -> index of element 2
`2 * 0 + 2 = 2` -> index of element 4

Let's try to figure out a formula to get the index of the parent of an element in the array.

If 2i + 2 is to get the right child of element 1 which is 4. How can we manipulate the formula to get the parent of 4 which is 1?
Lets use simple arithmetic

```text
2i + 2 = 2 (this is elemnt 4)
i = (2 - 1) / 2
i = 1/2
i = 0.5 -> round down since it isn't a whole number and decimal numbers can't be an index.
i = 0
```

To get i. we did the following:

1. Subtract 1 from 2 (this is the right child of 1)
2. Divide by 2

This leads us to the formula: `i = (childIndex - 1) / 2`

Lets try another example lets find the parent of the element 2 in this list `[1, 2, 4, 5, 3]`
We can see in the tree below that index 1 is the parent

```text
    Tree:
        1(0)
        /  \
      2(1)  4(2)
      / \
    5(3) 3(4)

    Array: [1, 2, 4, 5, 3]
```

Lets use our formula: `i = (childIndex - 1) / 2`

```text
i = (childIndex - 1) / 2
i = (1 - 1) / 2
i = 0
```

Now we know how to get the index of the parent of an element in the array.
From this array `[1, 2, 4, 5, 3]` we can get the parent of any element by using the formula `i = (childIndex - 1) / 2`

```text
    Tree:
        1(0)
        /  \
      2(1)  4(2)
      / \
    5(3) 3(4)

    Array: [1, 2, 4, 5, 3]
```

Parent of element 3(index 4) is (4 - 1) / 2 = 1.5 -> round down to 1
Parent of element 5(index 3) is (3 - 1) / 2 = 1
So the parent of both elements 3 and 5 is 2 which is index 1. We can verify by looking at the tree.
