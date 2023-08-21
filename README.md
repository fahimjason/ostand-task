# ostand-task

#### SQL: 1
Given the two tables below, write a SQL query that uses a join statement to list all users from the user table, their average correct answers, and the time of their most recently taken test. All user entries should appear, even if they have not taken a test.
```sql
SELECT
    u.id,
    u.first_name,
    AVG(t.correct) AS average_correct_answers,
    MAX(t.time_taken) AS most_recent_test_time
FROM
    user u
LEFT JOIN
    test_result t ON u.id = t.user_id
GROUP BY
    u.id;
```

#### SQL: 2
Let's have a table where we store the values of different types of triangle arms. Each row represents a single triangle. \
**Equilateral:** It's a triangle with sides of equal length. \
**Isosceles:** It's a triangle with sides of equal length. \
**Scalene:** It's a triangle with sides of differing lengths. \
**Not A Triangle:** The given values of A, B, and C don't form a triangle. \
Write an SQL query to determine the type of triangle.
```sql
SELECT
    arm_a,
    arm_b,
    arm_c,
    CASE
        WHEN arm_a = arm_b AND arm_b = arm_c THEN 'Equilateral'
        WHEN arm_a = arm_b OR arm_b = arm_c OR arm_a = arm_c THEN 'Isosceles'
        WHEN arm_a <> arm_b AND arm_b <> arm_c AND arm_a <> arm_c THEN 'Scalene'
        ELSE 'Not A Triangle'
    END AS Triangle_Type
FROM
    triangles;
```
