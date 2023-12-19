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
	<link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
	<link rel="stylesheet" type="text/css" href="estilo/viajes.css" />
	<link rel="icon" href="multimedia/imagenes/rino-32px.ico" type="image/x-icon">
	<script src="https://code.jquery.com/jquery-3.7.1.min.js"
		integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
	<!--jquery min-->
	<script src="js/viajes.js"></script>
</head>
<?php
    class Carrusel{
        private $params;
        private $url;
        private $encodedParams;
        private $imagenes;
        public function __construct($pais,$capital){
            $tags = $pais . ",landscape";
            $this->imagenes = array();
            $this->params = array(
                'tags' => $tags ,
                'tagmode' => 'all',
                'format' => 'php_serial',
            );
                
            $this->encodedParams = array();
            foreach ($this->params as $k => $v){
                $this->encodedParams[] = urlencode($k).'='.urlencode($v);
            }
                
            $this->url = "https://api.flickr.com/services/feeds/photos_public.gne?".implode('&',$this->encodedParams);
                
            $this->hacerConsulta();
        }

        private function hacerConsulta(){
            $rsp = file_get_contents($this->url);
            $rsp_obj = unserialize($rsp);
            if(count($rsp_obj['items']) >0 ){
                for ($i = 0; $i < 10; $i++) {
                    $this->imagenes[$i] = $rsp_obj['items'][$i]['l_url'];
                }
            }
        }
        public function getImg(){
            foreach($this->imagenes as $n => $imagen){
                echo "<img src='".$imagen."' alt='Imagen del carrusel".$n."'>";
            }
        }

    }
    class Moneda {
        private $monedaLocal;
        private $monedaCambio;
        
        public function __construct($monedaLocal, $monedaCambio) {
            $this->monedaLocal = $monedaLocal;
            $this->monedaCambio = $monedaCambio;
        }
        
        public function getCambio(){
            $api_key = "7b61f0b3d5f7b4798ae815df1dd0aaeefc9dd9e4";
            $amount = 1;
            $url = "https://api.getgeoapi.com/v2/currency/convert?api_key=".$api_key."&from=".$this->monedaLocal."&to=".$this->monedaCambio."&amount=".$amount."&format=json";
            $response = file_get_contents($url);
            $result = json_decode($response, true);
            echo "<p>El cambio de moneda de euros a dólar trinitense és: 1€ = ".$result['rates']['TTD']['rate']."TT$</p>";
        }
    }
    $c = new Carrusel("Trinidad and Tobago", "Puerto España");
    $m = new Moneda("EUR","TTD");
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
			<a href="viajes.php" tabindex="6" class="active" accesskey="v">Viajes</a>
			<a href="juegos.html" tabindex="7" accesskey="j">Juegos</a>
		</nav>
	</header>
	<main>
		<h2>Viajes</h2>
		<button onclick="viajes.getMapaEstaticoGoogle('estatico')">Obtener mapa estático</button>
        <figure id="estatico"></figure>
        <figure id="dinamico"></figure>
        <section data-element="fileUpload">
            <h3>Carga de archivos</h3>
            <p>Carga el archivo rutasEsquema.xml para ver su contenido: </p>
            <input type="file" accept=".xml" onchange="viajes.leerArchivoXML(this.files)">
            <p>Carga archivos KML para representarlos en el mapa dinámico</p>
            <input type="file" accept=".kml"  onchange="viajes.leerArchivoKML(this.files)" multiple>
            <p>Carga archivos SVG para representarlos en el documento</p>
            <input type="file" accept=".svg"  onchange="viajes.leerArchivoSVG(this.files)" multiple>
        </section>
	</main>
	<script>
		let viajes = new Viajes();

		function initMap() {
			viajes.getMapaDinamicoGoogle();
		}

		$("button[data-action='next']").on("click", viajes.carruselSiguiente());
		$("button[data-action='prev']").on("click", viajes.carruselAnterior());

	</script>
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCCrbYGj55x3xpStJ_qDNQu9SLTiaHDbto&callback=initMap"></script>
</body>


</html>