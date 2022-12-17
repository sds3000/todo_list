DROP TABLE IF EXISTS task;

CREATE TABLE task(
    id SERIAL,
    name TEXT,
    description TEXT,
    list_id INTEGER
);

-- DROP TABLE IF EXISTS category;
-- can create category to sort by with step in the process
-- after writing the basic todo list
-- CREATE TABLE category(
--     id  SERIAL,
--     name TEXT, 
--     step INTEGER,
--     user_id INTEGER
-- );

DROP TABLE IF EXISTS list;

CREATE TABLE list(
    id SERIAL PRIMARY KEY NOT NULL,
    name TEXT
    
);

INSERT INTO list(name) VALUES('Morning routine');
INSERT INTO task(name, description) VALUES('take dogs out', 'take out dogs')
