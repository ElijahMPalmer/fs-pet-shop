--[{"age":5,"kind":"snake","name":"Buttons"},{"age":7,"kind":"snake","name":"fiona"},{"age":7,"kind":"snake","name":"Luna"},{"name":"Cornflake","age":3,"kind":"parakeet"},{"name":"Cornflake","age":3,"kind":"parakeet"},{"age":3,"kind":"snake","name":"barnas"}]
DROP TABLE IF EXISTS pets;
CREATE TABLE pets (
    id SERIAL PRIMARY KEY,
    name TEXT,
    age INTEGER,
    kind TEXT
);

INSERT INTO pets(age, name, kind) VALUES (7, 'fido', 'dog');
INSERT INTO pets(age, name, kind) VALUES (5, 'buttons', 'snake');
