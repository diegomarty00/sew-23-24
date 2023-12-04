import xml.etree.ElementTree as ET

def convertirXmlToKml(archivoXml):
    try:
        arbol = ET.parse(archivoXml)
    except IOError:
        print('No se encuentra el archivo', archivoXml)
        return
    except ET.ParseError:
        print("Error procesando el archivo XML =", archivoXml)
        return

    raiz = arbol.getroot()

    # Encontrar y procesar cada ruta
    for i, ruta in enumerate(raiz.findall('.//{http://www.uniovi.es}ruta')):
        kmlName = f"ruta{i + 1}.kml"
        with open(kmlName, 'w') as kml:
            kml.write('<?xml version="1.0" encoding="UTF-8"?>\n')
            kml.write('<kml xmlns="http://www.opengis.net/kml/2.2">\n')
            kml.write('<Document>\n')

            # Obtener nombre de la ruta
            rutaName = ruta.attrib.get('nombreRuta')
            kml.write(f'<name>ruta{i+1}.LOG</name>\n')

            # Iniciar LineString
            kml.write('<Placemark>\n')
            kml.write('<LineString>\n')
            kml.write('<extrude>1</extrude>\n')
            kml.write('<tessellate>1</tessellate>\n')
            kml.write('<coordinates>\n')

            # Obtener coordenadas de datos
            latitud = ruta.find('.//{http://www.uniovi.es}coordenadas/{http://www.uniovi.es}latitud').text
            longitud = ruta.find('.//{http://www.uniovi.es}coordenadas/{http://www.uniovi.es}longitud').text
            altitud = ruta.find('.//{http://www.uniovi.es}coordenadas/{http://www.uniovi.es}altitud').text

            # Escribir coordenadas de datos en el KML
            kml.write(f'{longitud},{latitud},{altitud}\n')

            # Obtener coordenadas de hitos
            for hito in ruta.findall('.//{http://www.uniovi.es}hito'):
                latitud = hito.find('.//{http://www.uniovi.es}coordenadasHito/{http://www.uniovi.es}latitud').text
                longitud = hito.find('.//{http://www.uniovi.es}coordenadasHito/{http://www.uniovi.es}longitud').text
                altitud = hito.find('.//{http://www.uniovi.es}coordenadasHito/{http://www.uniovi.es}altitud').text

                # Escribir coordenadas de hitos en el KML
                kml.write(f'{longitud},{latitud},{altitud}\n')

            # Finalizar LineString y Placemark
            kml.write('</coordinates>\n')
            kml.write('</LineString>\n')
            kml.write('<Style> id="lineaRoja">\n')
            kml.write('<LineStyle>\n')
            kml.write('<color>#ff0000ff</color>\n')
            kml.write('<width>5</width>\n')
            kml.write('</LineStyle>\n')
            kml.write('</Style>\n')
            kml.write('</Placemark>\n')

            kml.write('</Document>\n')
            kml.write('</kml>')

        print(f'Se ha convertido la ruta a KML en {kmlName}')

def main():
    archivoXml = input('Introduce el archivo XML de entrada: ')
    convertirXmlToKml(archivoXml)

if __name__ == "__main__":
    main()
