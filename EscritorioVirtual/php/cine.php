<?php
class Cine {

    public string $peliculaPorDirector = " ";
    public string $todasLasPeliculas = " ";
    public string $mensaje = "";

    public function __construct() {
        $this->server = "localhost";
        $this->user = "DBUSER2023";
        $this->pass = "DBPSWD2023";
        $this->dbname = "cine";
    }

    public function createCine() {
        $conn = new mysqli($this->server, $this->user, $this->pass);
        if ($conn) {
            // Si la base de datos "biblioteca" no existe, la crea
            $sql = "CREATE DATABASE IF NOT EXISTS " . $this->dbname;
            if ($conn->multi_query($sql) === TRUE) {
                $this->mensaje .= "Base de datos creada exitosamente.";
            } else {
                $this->mensaje .= "Error al crear la base de datos: " . $conn->error;
            }
            
            mysqli_select_db($conn, $this->dbname);
            $sqlFile = file_get_contents('cine.sql');
            
            if ($conn->multi_query($sqlFile)) {
                $this->mensaje .= "Tablas creadas exitosamente.";
            } else {
                $this->mensaje .= "Error al crear las tablas: " . $conn->error;
            }
            $conn->close();
        }
    }

    public function createConnection() {
        $conn = new mysqli($this->server, $this->user, $this->pass, $this->dbname);
        if ($conn->connect_errno) {
            $this->mensaje .= "Error de conexión: " . $db->connect_error;
        }
        return $conn;
    }

    public function importCSV($cvs){
        $db = $this->createConnection();
        $selectedTabla = "";
        ini_set("auto_detect_line_endings", true);
        if (($handle = fopen($cvs, 'r')) !== false) {
            while ( ($fila = fgetcsv($handle, 2000, ",")) !== false) {
                // Verificar a qué tabla pertenece la fila
                switch ($fila[0]) {
                    case "IdDirector":
                        $selectedTabla = "director";
                        break;
                    case "IdProductora":
                        $selectedTabla = "productora";
                        break;
                    case "IdActor":
                        $selectedTabla = "actor";
                        break;
                    case "IdPelicula":
                        $selectedTabla = "pelicula";
                        break;
                    case "IdCartelera":
                        $selectedTabla = "cartelera";
                        break;
                    default:
                        switch ($selectedTabla) {
                            case "director":
                                $stmt = $db->prepare('INSERT INTO director (Nombre, Apellido) VALUES (?, ?)');
                                $stmt->bind_param('ss', $fila[1], $fila[2]);
                                $stmt->execute();
                                $stmt->close();
                                break;
                            case "productora":
                                $stmt = $db->prepare('INSERT INTO productora (Nombre, Direccion) VALUES (?, ?)');
                                $stmt->bind_param('ss', $fila[1], $fila[2]);
                                $stmt->execute();
                                $stmt->close();
                                break;
                            case "actor":
                                $stmt = $db->prepare('INSERT INTO actor (Nombre, Apellido) VALUES (?, ?)');
                                $stmt->bind_param('ss', $fila[1], $fila[2]);
                                $stmt->execute();
                                $stmt->close();
                                break;
                            case "pelicula":
                                $stmt = $db->prepare('INSERT INTO pelicula (Nombre, IdDirector, IdProductora, IdActor, YearPublicacion) VALUES (?, ?, ?, ?, ?)');
                                $stmt->bind_param('sssss', $fila[1], $fila[2], $fila[3], $fila[4], $fila[5]);
                                $stmt->execute();
                                $stmt->close();
                                break;
                            case "cartelera":
                                $stmt = $db->prepare('INSERT INTO cartelera (IdPelicula, FechaInicio, FechaFin, PrecioEntrada) VALUES (?, ?, ?, ?)');
                                $stmt->bind_param('ssss', $fila[1], $fila[2], $fila[3], $fila[4]);
                                $stmt->execute();
                                $stmt->close();
                                break;
                        }
                }
            }
        
            $db->close();
            fclose($handle);
        } else {
            $this->mensaje .= "Error al abrir el archivo CSV";
        }
    }

    public function exportCSV() {
        $conn = $this->createConnection();
        // Nombre del archivo CSV de salida
        $csvFile = 'cineExp.csv';
        // Establecer encabezados para la descarga
        header('Content-Type: text/csv');
        header('Content-Disposition: attachment; filename="' . $csvFile . '"');
        // Abrir el archivo CSV para escritura
        $file = fopen('php://output', 'w');

        // Exportar datos de la tabla director
        $query_director = "SELECT * FROM director";
        $result_director = $conn->query($query_director);
        if ($result_director->num_rows > 0) {
            // Encabezados
            fputcsv($file, array('IdDirector', 'Nombre', 'Apellido'));
            // Datos
            while ($row = $result_director->fetch_assoc()) {
                fputcsv($file, $row);
            }
        }
        // Exportar datos de la tabla productora
        $query_productora = "SELECT * FROM productora";
        $result_productora = $conn->query($query_productora);
        if ($result_productora->num_rows > 0) {
            // Encabezados
            fputcsv($file, array('IdProductora', 'Nombre', 'Direccion'));

            // Datos
            while ($row = $result_productora->fetch_assoc()) {
                fputcsv($file, $row);
            }
        }
        // Exportar datos de la tabla actor
        $query_actor = "SELECT * FROM actor";
        $result_actor = $conn->query($query_actor);
        if ($result_actor->num_rows > 0) {
            // Encabezados
            fputcsv($file, array('IdActor', 'Nombre', 'Apellido'));

            // Datos
            while ($row = $result_actor->fetch_assoc()) {
                fputcsv($file, $row);
            }
        }
        // Exportar datos de la tabla pelicula
        $query_pelicula = "SELECT * FROM pelicula";
        $result_pelicula = $conn->query($query_pelicula);
        if ($result_pelicula->num_rows > 0) {
            // Encabezados
            fputcsv($file, array('IdPelicula', 'Nombre', 'IdDirector', 'IdProductora', 'IdActor', 'YearPublicacion'));

            // Datos
            while ($row = $result_pelicula->fetch_assoc()) {
                fputcsv($file, $row);
            }
        }
        // Exportar datos de la tabla cartelera
        $query_cartelera = "SELECT * FROM cartelera";
        $result_cartelera = $conn->query($query_cartelera);
        if ($result_cartelera->num_rows > 0) {
            // Encabezados
            fputcsv($file, array('IdCartelera', 'IdPelicula', 'FechaInicio', 'FechaFin', 'PrecioEntrada'));

            // Datos
            while ($row = $result_cartelera->fetch_assoc()) {
                fputcsv($file, $row);
            }
        }
        fclose($file);
        $conn->close();
        exit;
    }

    public function todasLasPeliculas() {
        $db = $this->createConnection();
        // Consulta: todas las películas en la base de datos
        $query1 = "SELECT Nombre FROM pelicula";
        $stmt = $db->prepare($query1);
        // Ejecutar la consulta
        $stmt->execute();
        // Obtener los resultados
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $this->todasLasPeliculas = "<article data-element='peliculas'><h4>Todas las películas</h4><ul>";
            while ($row = $result->fetch_assoc()) {
                $this->todasLasPeliculas .= "<li>Película: " . $row["Nombre"] . "</li>";
            }
            $this->todasLasPeliculas .= "</ul></article>";
        } else {
            $this->todasLasPeliculas = "<p>No hay películas en la base de datos.</p>";
        }
        $stmt->close();
        $db->close();
        return $this->todasLasPeliculas;
    }

    // consultar las películas de un director
    public function peliculaPorDirector($director) {
        $db = $this->createConnection();
        // Consulta: películas en la base de datos por director
        $query1 = "SELECT pelicula.Nombre FROM pelicula JOIN director ON pelicula.IdDirector = director.IdDirector WHERE LOWER(director.Nombre) LIKE LOWER(?) OR LOWER(director.Apellido) LIKE LOWER(?)";
        $stmt = $db->prepare($query1);
        // Vincular los parámetros: se pone % por si no es el nombre completo 
        $param = "%{$director}%";
        $stmt->bind_param("ss", $param, $param);
        // Ejecutar la consulta
        $stmt->execute();
        // Obtener los resultados
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $this->peliculaPorDirector = "<article data-element='peliculasDirector'><h4>Películas del director</h4><ul>";
            while ($row = $result->fetch_assoc()) {
                $this->peliculaPorDirector .= "<li>Película: " . $row["Nombre"] . "</li>";
            }
            $this->peliculaPorDirector .= "</ul></article>";
        } else {
            $this->peliculaPorDirector = "<p>No hay películas de ese director.</p>";
        }
        $stmt->close();
        $db->close();
        return $this->peliculaPorDirector;
    }
}

$cine = new Cine();
// el post para importar el csv
if (isset($_POST['importar_csv'])) {
    // crear la bd
    $cine->createCine();
    // leer csv y rellenar bd
    $cine->importCSV($_FILES['importarCSV']['tmp_name']);
    $cine->todasLasPeliculas();
}
// el post para exportar el csv
if (isset($_POST['exportar_csv'])) {
    // descargar datos insertados en la bd
    $cine->exportCSV();
}
// el post para consultar libros por autor
if (isset($_POST['peliculaDirector'])) {
    // descargar datos insertados en la bd
    $cine->peliculaPorDirector($_POST["director"]);
}
if (isset($_POST['peliculas'])) {
    $cine->todasLasPeliculas();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
	<!-- Datos que describen el documento -->
	<meta charset="UTF-8" />
	<meta name="author" content="Diego Martinez Menendez" />
	<meta name="description" content="ESCRIBEME" />
	<meta name="keywords" content="HTML, HTML5, W3C, estandar, whatwg, juegos, videojuegos, game" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Escritorio Virtual - Juegos</title>
    <link rel="stylesheet" type="text/css" href="../estilo/layout.css" />
	<link rel="stylesheet" type="text/css" href="../estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="../estilo/cine.css" />
	<link rel="icon" href="../multimedia/imagenes/rino-32px.ico" type="image/x-icon">
</head>

<body>
	<!-- Datos con el contenidos que aparece en el navegador -->
	<header>
		<h1>Escritorio Virtual</h1>
		<nav>

			<a href="../index.html" tabindex="1" accesskey="i">Inicio</a>
			<a href="../sobremi.html" tabindex="2" accesskey="s">Sobre mi</a>
			<a href="../noticias.html" tabindex="3" accesskey="n">Noticias</a>
			<a href="../agenda.html" tabindex="4" accesskey="a">Agenda</a>
			<a href="../meteorologia.html" tabindex="5" accesskey="m">Meteorología</a>
			<a href="viajes.php" tabindex="6" accesskey="v">Viajes</a>
			<a href="../juegos.html" tabindex="7" class="active" accesskey="j">Juegos</a>

		</nav>
	</header>
	<section>
		<h2>Lista de juegos disponibles</h2>
		<nav>
			<a href="../memoria.html" tabindex="8">Memoria</a>
			<a href="../sudoku.html" tabindex="9">Sudoku</a>
			<a href="crucigrama.php" tabindex="10">Crucigrama</a>
			<a href="../api.html" tabindex="11">API</a>
            <a href="cine.php" tabindex="12" class="active">Cine</a>
		</nav>
	</section>
    <main>
        <h3>Consultar cartelera</h3>
        <form action="#" method="post" enctype="multipart/form-data">
            <label for="importarCSV">Importar CSV para añadir los datos a la base de datos</label>
            <input id="importarCSV" name="importarCSV" type="file" accept=".csv" />
            <input type="submit" name="importar_csv" value="Importar" />
        </form>
        <form action="#" method="post" >
            <label for="exportarCSV">Exportar datos de la biblioteca</label>
            <input id="exportarCSV" type="submit" name="exportar_csv" value="Exportar" />
        </form>
        <form action="#" method="post">
            <label for="director">Consultar peliculas del director:</label>
            <input id="director" name="director" type="text" placeholder="Christopher, James..." />
            <input id="consultarPorDirector" type="submit" name="peliculaDirector" value="Buscar" />
        </form>
        <form action="#" method="post">
            <label for="todasLasPeliculas">Películas ofrecidas</label>
            <input id="todasLasPeliculas" type="submit" name="peliculas" value="Buscar" />
        </form>
        <?php echo $cine->peliculaPorDirector ?>
        <?php echo $cine->todasLasPeliculas ?>
    </main>
    </body>
</html>