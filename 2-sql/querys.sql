-- Parte 1
-- -- Suponiendo que es POSTGRESQL


-- A
SELECT (Arrendatario.Nombre || ' ' || Arrendatario.Apellido) as Nombre_Completo
FROM Arrendatario
INNER JOIN Arrienda ON Arrendatario.RUT = Arrienda.RUT
INNER JOIN Casa ON Casa.Id_casa == Arrienda.Id_casa
WHERE
    Casa.Ciudad = 'Santiago'
    Casa.Calle = 'Carrera'
    Casa.Nro = 1024

-- B
SELECT Dueño.RUT, SUM(Arrienda.Deuda) AS LE_DEBEN
FROM Dueño
INNER JOIN Casa ON Casa.RUT = Dueño.RUT
INNER JOIN Arrienda ON Arrienda.Id_casa = Casa.Id_casa
WHERE
    Dueño.Nombre = 'María' AND
    Dueño.Apellido = 'Pérez' AND
    Arrienda.Deuda > 0
GROUP BY Dueño.RUT

-- C
SELECT Dueño.RUT, SUM(Arrienda.Deuda) AS LE_DEBEN
FROM Dueño
INNER JOIN Casa ON Casa.RUT = Dueño.RUT
INNER JOIN Arrienda ON Arrienda.Id_casa = Casa.Id_casa
WHERE
    Arrienda.Deuda > 0
GROUP BY Dueño.RUT


-- C
-- -- Realicé el group by debido a que pueden haber dueños que eventualmente
-- -- sean arrentarios, por lo que con esto descartamos los duplicados
SELECT Personas.Nombre, Personas.Apellido FROM (
    SELECT Dueño.Nombre, Dueño.Apellido
    FROM Dueño

    UNION

    SELECT Arrendatario.Nombre, Arrendatario.Apellido
    FROM Arrendatario
    ) AS Personas
GROUP BY Personas.Nombre, Personas.Apellido


-- D 
SELECT arr.Nombre, arr.Apellido
FROM Arrendatarios AS arr
WHERE (
    SELECT COUNT(*) 
    FROM Arrendatarios AS arr1
    WHERE arr.RUT = arr1.RUT
    ) > 3


