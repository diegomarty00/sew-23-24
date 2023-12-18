<!DOCTYPE HTML>

<html lang="es">

<head>
	<!-- Datos que describen el documento -->
	<meta charset="UTF-8" />
	<meta name="author" content="Diego Martinez Menendez" />
	<meta name="description" content="ESCRIBEME" />
	<meta name="keywords" content="HTML, HTML5, W3C, estandar, whatwg, juegos, videojuegos, game" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Escritorio Virtual - Juegos</title>
	<link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
	<link rel="stylesheet" type="text/css" href="estilo/crucigrama.css" />
	<link rel="stylesheet" type="text/css" href="estilo/botonera.css" />
	<link rel="icon" href="multimedia/imagenes/rino-32px.ico" type="image/x-icon">
	<script src="https://code.jquery.com/jquery-3.7.1.min.js"
		integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
	<!--jquery min-->
	<script src="js/crucigrama.js"></script>
</head>

<?php class Record
{

    private $server;
    private $user;
    private $pass;
    private $dbname;
    public function __construct()
    {
        $this->server = "localhost";
        $this->user = "DBUSER2023";
        $this->pass = "DBPSWD2023";
        $this->dbname = "records";
        $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);
        if ($db->connect_error) {
            die("Conexión fallida: " . $db->connect_error);
        }
    }

    public function almacenarDatos($nombre, $apellidos, $nivel, $tiempo)
    {
        $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

        if ($db->connect_error) {
            echo "Conexión fallida: " . $db->connect_error;
        } else {
            $db->select_db($this->dbname);

            $stmt = $db->prepare("INSERT INTO registro (nombre, apellidos, nivel, tiempo) VALUES (?, ?, ?, ?)");

            $stmt->bind_param("sssi", $nombre, $apellidos, $nivel, $tiempo);
            $stmt->execute();

            $stmt->close();
            $db->close();

            $this->getRecords($nivel);
        }
    }

    public function getRecords($nivel)
    {
        $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

        if ($db->connect_error) {
            echo "Conexión fallida: " . $db->connect_error;
        } else {
            $db->select_db($this->dbname);

            $stmt = $db->prepare("SELECT nombre, apellidos, tiempo FROM registro WHERE nivel = ? ORDER BY tiempo ASC LIMIT 10");

            $stmt->bind_param("s", $nivel);
            $stmt->execute();

            $result = $stmt->get_result();
            //Crea la lista ordenada con los resultados
            echo "<section><h3>Top 10</h3>";
            echo "<ol>";
            while ($row = $result->fetch_assoc()) {
                $tiempoFormateado = gmdate("H:i:s", $row["tiempo"]);
                echo "<li>" . $row["nombre"] . " " . $row["apellidos"] . " - " . $tiempoFormateado . "</li>";
            }
            echo "</ol>";
            echo "</section>";


            $stmt->close();
            $db->close();
        }
    }
}
$record = new Record();

?>

<body>
	<!-- Datos con el contenidos que aparece en el navegador -->
	<header>
		<h1>Escritorio Virtual</h1>
		<nav>

			<a href="index.html" tabindex="1" accesskey="i">Inicio</a>
			<a href="sobremi.html" tabindex="2" accesskey="s">Sobre mi</a>
			<a href="noticias.html" tabindex="3" accesskey="n">Noticias</a>
			<a href="agenda.html" tabindex="4" accesskey="a">Agenda</a>
			<a href="meteorologia.html" tabindex="5" accesskey="m">Meteorología</a>
			<a href="viajes.html" tabindex="6" accesskey="v">Viajes</a>
			<a href="juegos.html" tabindex="7" class="active" accesskey="j">Juegos</a>

		</nav>
	</header>
	<section>
		<h2>Lista de juegos disponibles</h2>
		<nav>
			<a href="memoria.html" tabindex="8">Memoria</a>
			<a href="sudoku.html" tabindex="9">Sudoku</a>
			<a href="crucigrama.html" tabindex="10" class="active">Crucigrama</a>
			<a href="api.html" tabindex="11">API</a>
		</nav>
	</section>

	<main>
		<script>
			var juego = new Crucigrama(3);
			var finish = false;
			juego.paintMathword();

			document.addEventListener("keydown", (event) => {
				const keyValue = event.key;
				if (finish) {
					juego.finish();
				} else {
					const selectedCell = document.querySelector('p[data-state="clicked"]');
					if (selectedCell) {
						if (juego.introduceElement(keyValue)) {
							finish = true;
						}
					}
				}
			});
		</script>
	</main>

	<section data-type="botonera">
		<h2>Botonera</h2>
		<article data-type="numeros">
			<button onclick="juego.introduceElement(1)">1</button>
			<button onclick="juego.introduceElement(2)">2</button>
			<button onclick="juego.introduceElement(3)">3</button>
			<button onclick="juego.introduceElement(4)">4</button>
			<button onclick="juego.introduceElement(5)">5</button>
			<button onclick="juego.introduceElement(6)">6</button>
			<button onclick="juego.introduceElement(7)">7</button>
			<button onclick="juego.introduceElement(8)">8</button>
			<button onclick="juego.introduceElement(9)">9</button>
		</article>
		<article data-type="operadores">
			<button onclick="juego.introduceElement('*')">*</button>
			<button onclick="juego.introduceElement('/')">/</button>
			<button onclick="juego.introduceElement('-')">-</button>
			<button onclick="juego.introduceElement('+')">+</button>
		</article>
	</section>


</body>

</html>