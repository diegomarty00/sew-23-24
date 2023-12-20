<!DOCTYPE HTML>

<html lang="es">

<head>
	<!-- Datos que describen el documento -->
	<meta charset="UTF-8" />
	<meta name="author" content="Diego Martinez Menendez" />
	<meta name="description" content="ESCRIBEME" />
	<meta name="keywords" content="HTML, HTML5, W3C, estandar, whatwg, viajes" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Escritorio Virtual - Viajes</title>
    <link rel="stylesheet" type="text/css" href="../estilo/layout.css" />
	<link rel="stylesheet" type="text/css" href="../estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="../estilo/carrusel.css" />
    <link rel="stylesheet" type="text/css" href="../estilo/viajes.css" />
	<link rel="icon" href="../multimedia/imagenes/rino-32px.ico" type="image/x-icon">
	<script src="https://code.jquery.com/jquery-3.7.1.min.js"
		integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
	<!--jquery min-->
	<script src="../js/viajes.js"></script>
</head>
<?php
    class Carrusel {
        public string $capital = "";
        public string $pais = "";

        public function __construct($nombreCapital, $nombrePais) {
            $this->capital = $nombreCapital;
            $this->pais = $nombrePais;
        }

        function getPhotos() {
            $api_key = 'a09054d9591e63f243358ca426c788d1';
            $tag = $this->capital;
            $perPage = 10;
            // Fotos públicas recientes
            $url = 'http://api.flickr.com/services/feeds/photos_public.gne?';
            $url.= '&api_key='.$api_key;
            $url.= '&tags='.$tag;
            $url.= '&per_page='.$perPage;
            $url.= '&format=json';
            $url.= '&nojsoncallback=1';

            $respuesta = file_get_contents($url);
            $json = json_decode($respuesta);

            $carrusel = "<article data-element='carrusel'><h3>Carrusel de imágenes</h3>";
            for($i=0;$i<$perPage;$i++) {
                $titulo = $json->items[$i]->title;
                $URLfoto = str_replace("_m.jpg", "_b.jpg", $json->items[$i]->media->m);
                $img = "<img data-element='carruselImg' alt='".$titulo."' src='".$URLfoto."' />";
                $carrusel .= $img;
            }
            $carrusel .= "<button onclick=\"viajes.nextCarrusel()\" data-action='next'> > </button>
            <button data-action='previous' onclick=\"viajes.previousCarrusel()\"> < </button></article>";
            return $carrusel;
        }
    }

    class Moneda {
        private string $app_id = "8e4ad58943d642fbb9261b32fd4b1765";

        public function __construct($moneda, $cambio) {
            $this->monedaPropia = $moneda;
            $this->monedaCambio = $cambio;
        }

        public function consultaCambio() {
            $url = "https://openexchangerates.org/api/latest.json?app_id=" . $this->app_id . "&symbols=" . $this->monedaCambio . "," . $this->monedaPropia;
            $respuesta = file_get_contents($url);
            $json = json_decode($respuesta);
            $moneda = $json->rates->{$this->monedaPropia};
            $cambio = $json->rates->{$this->monedaCambio};
            $equivalencia = round($moneda/$cambio, 2);
            $resultado = "<p> 1€ = " . $equivalencia . " M </p>";
            return $equivalencia;
        }
    }
?>
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
			<a href="viajes.php" tabindex="6" class="active" accesskey="v">Viajes</a>
			<a href="../juegos.html" tabindex="7" accesskey="j">Juegos</a>
		</nav>
	</header>
    <main>
        <h2>Viajes</h2>
        <section data-element="top">
            <?php 
                $carrusel = new Carrusel('Maseru', 'Lesoto');
                echo $carrusel->getPhotos();
            ?>
            <article>
                <h3>Cambio de moneda</h3>
                <p>Conversión de moneda europea y Lesoto</p>
                <?php 
                    $cambio = new Moneda('LSL', 'EUR');
                    echo "<p> 1€ = " . $cambio->consultaCambio() . "M </p>";
                    $cambio = new Moneda('EUR', 'LSL');
                    echo "<p> 1L = " . $cambio->consultaCambio() . "€ </p>";
                ?>
            </article>
        </section>

        <section data-element="mapas">
            <button onclick="viajes.getMapaEstaticoGoogle('estatico')">Pulsa aqui para obtener el mapa estático</button>
            <figure id="estatico"></figure>
            <h3>Mapa dinamico</h3>
            <figure id="dinamico"></figure>
        </section>
        <section data-element="fileUpload">
                <h3>Carga de archivos</h3>
                <p>Carga el archivo rutasEsquema.xml para ver su contenido: </p>
                <input type="file" accept=".xml" onchange="viajes.xml2web(this.files)">
                <p>Carga archivos KML para representarlos en el mapa dinámico</p>
                <input type="file" accept=".kml"  onchange="viajes.kml2web(this.files)" multiple>
                <p>Carga archivos SVG para representarlos en el documento</p>
                <input type="file" accept=".svg"  onchange="viajes.svg2web(this.files)" multiple>
        </section>
	</main>
	<script>
		let viajes = new Viajes();

		function initMap() {
			viajes.getMapaDinamicoGoogle();
		}

		$("button[data-action='next']").on("click", viajes.nextCarrusel());
		$("button[data-action='previous']").on("click", viajes.previousCarrusel());

	</script>
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCCrbYGj55x3xpStJ_qDNQu9SLTiaHDbto&callback=initMap"></script>
</body>
</html>