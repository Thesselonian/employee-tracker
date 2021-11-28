INSERT INTO departments
    (name)
VALUES
    ('Front End'),
    ('Back End'),
    ('Janitor'),
    ('Senior Developer');

INSERT INTO roles
    (title, salary, department_id)
VALUES 
    ('Developer', '30000.01', 1),
    ('Tester', '50000.02', 1),
    ('Planner', '60000.06', 1),
    ('Manager', '80000.06', 1),
    ('Developer', '30000.01', 2),
    ('Tester', '50000.02', 2),
    ('Planner', '60000.06', 2),
    ('Manager', '430000.06', 2),
    ('Toilet Cleaner', '100000.52', 3),
    ('Floor Sweeper', '200000.52', 3),
    ('Manager', '300000.52', 3),
    ('Fixer', '150000.01', 4),
    ('Tester', '50000.02', 4),
    ('Planner', '60000.06', 4),
    ('Manager', '90000.06', 4);

INSERT INTO employees   
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Eric', 'Young', 1, 4),
    ('Bob', 'Willbanks', 2, 4),
    ('Travis', 'Jones', 3, 4),
    ('James', 'Fraser', 4, 15),
  ('Jack', 'London', 5, 8),
  ('Robert', 'Bruce', 6, 8),
  ('Peter', 'Greenaway', 7, 8),
  ('Derek', 'Jarman', 8, 15),
  ('Paolo', 'Pasolini', 9, 11),
  ('Heathcote', 'Williams', 10, 11),
  ('Sandy', 'Powell', 11, NULL),
  ('Emil', 'Zola', 12, 15),
  ('Sissy', 'Coalpits', 13, 15),
  ('Antoinette', 'Capet', 14, 15),
  ('Samuel', 'Delany', 15, NULL);
  