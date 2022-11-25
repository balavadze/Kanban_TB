-- on the terminal: psql -f todo.sql

DROP DATABASE IF EXISTS mytodo;

-- -- Create database

CREATE DATABASE mytodo;

\c mytodo;


DROP TABLE IF EXISTS todo;

-- Create table

CREATE TABLE todo(task_id SERIAL PRIMARY KEY,
                                         name VARCHAR (200) NOT NULL,
                                                            content TEXT, tag VARCHAR(20),
                                                                              priority VARCHAR (20) NOT NULL,
                                                                                                    status VARCHAR (200) NOT NULL,
                                                                                                                         duedate DATE NOT NULL);


INSERT INTO todo(task_id, name, content, tag, status, priority, duedate)
VALUES('75',
       'BackUp',
       'Push To GitHub Everything not saved will be lost',
       'private',
       'todo',
       'high',
       '2022-11-23');


INSERT INTO todo(task_id, name, content, tag, status, priority, duedate)
VALUES('76',
       'brainstorming',
       'brainstorm final project',
       'work',
       'completed',
       'medium',
       '2022-11-23');


INSERT INTO todo(task_id, name, content, tag, status, priority, duedate)
VALUES('77',
       'Clean Up',
       'Wipe Down Counters before mom arrives',
       'home',
       'progress',
       'high',
       '2022-11-23');


INSERT INTO todo(task_id, name, content, tag, status, priority, duedate)
VALUES('78',
       'Smile :)',
       'in the mirror: Mirror, mirror, on the wall, who is the ...',
       'private',
       'review',
       'high',
       '2022-11-23');


INSERT INTO todo(task_id, name, content, tag, status, priority, duedate)
VALUES('79',
       'Contemporary Dance',
       'find a dance school. Put on your red shoes and dance the blues',
       'private',
       'review',
       'low',
       '2022-11-23');


INSERT INTO todo(task_id, name, content, tag, status, priority, duedate)
VALUES('80',
       'Fox',
       'The quick brown fox jumps over the lazy dog',
       'work',
       'low',
       'progress',
       '2022-11-23');


SELECT *
FROM todo;