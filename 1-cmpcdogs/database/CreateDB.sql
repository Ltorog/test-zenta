CREATE TABLE IF NOT EXISTS breed(
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL
);


CREATE TABLE IF NOT EXISTS sub_breed(
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    id_breed INTEGER REFERENCES breed (id)
);


CREATE TABLE IF NOT EXISTS dog(
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    url_src VARCHAR(255),
    id_sub_breed INTEGER REFERENCES sub_breed (id)
);


INSERT INTO breed (description)
SELECT 'Pastor'
WHERE
    NOT EXISTS (
        SELECT b.description
        FROM breed b
        WHERE
            b.description = 'Pastor'
        );


INSERT INTO breed (description)
SELECT 'Pitbull'
WHERE
    NOT EXISTS (
        SELECT b.description
        FROM breed b
        WHERE
            b.description = 'Pitbull'
        );


INSERT INTO sub_breed (description, id_breed)
SELECT 'Alemán', 1
WHERE
    NOT EXISTS (
        SELECT sb.description
        FROM sub_breed sb
        WHERE
            sb.description = 'Alemán' and sb.id_breed = 1
        );


INSERT INTO sub_breed (description, id_breed)
SELECT 'Suizo', 1
WHERE
    NOT EXISTS (
        SELECT sb.description
        FROM sub_breed sb
        WHERE
            sb.description = 'Suizo' and sb.id_breed = 1
        );



INSERT INTO sub_breed (description, id_breed)
SELECT 'Francés', 2
WHERE
    NOT EXISTS (
        SELECT sb.description
        FROM sub_breed sb
        WHERE
            sb.description = 'Francés' and sb.id_breed = 2
        );


INSERT INTO sub_breed (description, id_breed)
SELECT 'Coreano', 2
WHERE
    NOT EXISTS (
        SELECT sb.description
        FROM sub_breed sb
        WHERE
            sb.description = 'Francés' and sb.id_breed = 2
        );


INSERT INTO dog (description, url_src, id_sub_breed)
SELECT 'Bobby', null, 1
WHERE
    NOT EXISTS (
        SELECT d.description
        FROM dog d
        WHERE
            d.description = 'Bobby' and d.id_sub_breed = 1
        );


INSERT INTO dog (description, url_src, id_sub_breed)
SELECT 'Cachupin', null, 2
WHERE
    NOT EXISTS (
        SELECT d.description
        FROM dog d
        WHERE
            d.description = 'Cachupin' and d.id_sub_breed = 2
        );


INSERT INTO dog (description, url_src, id_sub_breed)
SELECT 'Thor', null, 1
WHERE
    NOT EXISTS (
        SELECT d.description
        FROM dog d
        WHERE
            d.description = 'Thor' and d.id_sub_breed = 3
        );



INSERT INTO dog (description, url_src, id_sub_breed)
SELECT 'Avalancha', null, 2
WHERE
    NOT EXISTS (
        SELECT d.description
        FROM dog d
        WHERE
            d.description = 'Avalancha' and d.id_sub_breed = 4
        );