Parte 2

A) Principalmente, se pueden tomar todos los campos RUT de las tablas como índice, ya que suple en gran parte la Ausencia de ID's únicos de las tablas

B) Se encuentra en primera forma normal, ya que si bien en parte tienen una llave foránea que las una, como sería el RUT, no tienen la capacidad de tener su propio
registro único como un ID, UUID, etc. Por lo que se vuelve complejo identificarlos. Al igual que las personas que existen en la BD, ya que se podría unificar
en una sola tabla personas, y las tablas Arrendatarios y Dueños tener la llave foránea id_persona, que provendría de la tabla ya mencionada con su propio ID.

Como optimización podría ser:

----
Personas:
ID
Nombre
Apellido
Rut
Fono
----

----
Casas:
ID
ID_Persona (Personas)
Ciudad
Calle
Numero
----

----
Arrendatarios:
ID
ID_Persona (Personas)
ID_Casa (Casas)
Deuda
----


----
Dueños
ID
ID_Persona (Personas)
ID_Casa (Casas)
----


C) En el esquema ya existente se considera como llaves primarias:
    RUT
    Id_Casa

    y como llaves foráneas
    RUT
    Id_Casa


En el esquema propuesto en el punto B), se consideran como llaves primarias:
    ID (Todos los de las tablas)

    y como llaves foráneas todas los prefijos con ID_ (Llevan en paréntesis la tabla primaria a la que están relacionadas)
    
