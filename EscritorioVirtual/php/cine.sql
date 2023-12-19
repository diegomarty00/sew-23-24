drop table IF EXISTS cartelera;
drop table IF EXISTS pelicula;
drop table IF EXISTS actor;
drop table IF EXISTS productora;
drop table IF EXISTS director;

-- Crear la tabla director
CREATE TABLE IF NOT EXISTS director(
    IdDirector INTEGER PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(50),
    Apellido VARCHAR(50)
);

-- Crear la tabla productora
CREATE TABLE IF NOT EXISTS productora(
    IdProductora INTEGER PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100),
    Direccion VARCHAR(255)
);

-- Crear la tabla actor
CREATE TABLE IF NOT EXISTS actor(
    IdActor INTEGER PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(50),
    Apellido VARCHAR(50)
);

-- Crear la tabla pelicula
CREATE TABLE IF NOT EXISTS pelicula(
    IdPelicula INTEGER PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100),
    IdDirector INTEGER,
    IdProductora INTEGER,
    IdActor INTEGER,
    YearPublicacion INTEGER,
    FOREIGN KEY (IdDirector) REFERENCES director(IdDirector),
    FOREIGN KEY (IdActor) REFERENCES actor(IdActor),
    FOREIGN KEY (IdProductora) REFERENCES productora(IdProductora)
);

-- Crear la tabla cartelera
CREATE TABLE IF NOT EXISTS cartelera(
    IdCartelera INTEGER PRIMARY KEY AUTO_INCREMENT,
    IdPelicula INTEGER,
    FechaInicio VARCHAR(50),
    FechaFin VARCHAR(50),
    PrecioEntrada DOUBLE,
    FOREIGN KEY (IdPelicula) REFERENCES pelicula(IdPelicula)
);