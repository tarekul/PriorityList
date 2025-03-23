## Priority Queue Todo List

### Idea to implement Priority Queue for a todo list

Let's implement a priority queue for a todo list.

Task 1: Do laundry (priority: 4) -> this is a low priority task

Task 2: Go grocery shopping (priority: 3) -> this is a medium priority task

Task 3: Pay bills (priority: 2) -> this is a high priority task

Task 4: Call relatives (priority: 5) -> this is a highest priority task

### Implementation: brute force method

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

5. Swap (since 2 < 3)

   ```text
   [ Pay bills (2), Go grocery shopping (3), Do laundry (4) ]
   ```

6. Swap (since 2 < 4)

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

### Implementation: priority queue method

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
      3      4
[Pay bills(2), Go grocery shopping(3), Do laundry(4)]
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

Time to insert a new task:

- Brute force method: O(n) This is because we have to compare each element with every other element.
- Priority queue method: O(log n) This is because we have to compare each element with its parent.

Example:
Assume this list is already sorted in ascending order of priority (lower number = higher priority):
[
Pay bills (priority: 2),
Go grocery shopping (priority: 3),
Do laundry (priority: 4),
Call relatives (priority: 5)
]

New Task to Insert: Take medicine (priority: 1)

Brute Force Method (O(n)):
Step-by-step:

1. Insert at the end: [2, 3, 4, 5, 1] => [Pay bills(2), Go grocery shopping(3), Do laundry(4), Call relatives(5), Take medicine(1)]
2. Compare with previous element (5 > 1) → swap: [2, 3, 4, 1, 5] => [Pay bills(2), Go grocery shopping(3), Do laundry(4), Take medicine(1), Call relatives(5)]
3. Compare with 4 > 1 → swap: [2, 3, 1, 4, 5] => [Pay bills(2), Go grocery shopping(3), Take medicine(1), Do laundry(4), Call relatives(5)]
4. Compare with 3 > 1 → swap: [2, 1, 3, 4, 5] => [Pay bills(2), Take medicine(1), Go grocery shopping(3), Do laundry(4), Call relatives(5)]
5. Compare with 2 > 1 → swap: [1, 2, 3, 4, 5] => [Take medicine(1), Pay bills(2), Go grocery shopping(3), Do laundry(4), Call relatives(5)]

4 comparisons/swaps = O(n) steps in this insert

Priority Queue Method (O(log n)):

1. Insert at next available position (left of 4): [2, 3, 4, 5, 1] => [Pay bills(2), Go grocery shopping(3), Do laundry(4), Call relatives(5), Take medicine(1)]

```text
          2
        /   \
      3       4
     / \
    5   1
```

2. Compare with parent (3 > 1) → swap: [2, 1, 3, 4, 5] => [Pay bills(2), Take medicine(1), Go grocery shopping(3), Do laundry(4), Call relatives(5)]

```text
          2
        /   \
      1       4
     / \
    5   3
```

3. Compare with parent (2 > 1) → swap: [1, 2, 3, 4, 5] => [Take medicine(1), Pay bills(2), Go grocery shopping(3), Do laundry(4), Call relatives(5)]

```text
          1
        /   \
      2       4
     / \
    5   3
```

Only 2 comparisons/swaps were needed = O(log n) steps in this insert. n = 5 (number of elements in the priority queue) and log(n) ≈ 2.32 = 2

We can see using the priority queue method is faster than the brute force method because it requires less comparisons/swaps.
