import xml.etree.ElementTree as ET


def prologo(kml, name):
    kml.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    kml.write('<kml xmlns="http://www.opengis.net/kml/2.2">\n')
    kml.write('<Document>\n')
    kml.write('<Placemark>\n')
    kml.write('<name>' + name + '</name>\n')
    kml.write('<LineString>\n')
    kml.write('<extrude>1</extrude>\n')
    kml.write('<tessellate>1</tessellate>\n')
    kml.write('<coordinates>\n')

def setCoordenadas(coor, kml):
    longitud = coor.find("./{http://www.uniovi.es}latitud")
    latitud = coor.find("./{http://www.uniovi.es}longitud")
    altitud = coor.find("./{http://www.uniovi.es}altitud")
    kml.write(longitud.text + "," + latitud.text + "," + altitud.text + "\n")

def epilogo(kml):
    kml.write('</coordinates>\n')
    kml.write('<altitudeMode>clampToGround</altitudeMode>\n')
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

def xml2kml(xml):
    try:
        arbol = ET.parse(xml)
    except IOError:
        print('No se encuentra el archivo', xml)
        exit()
    except ET.ParseError:
        print("Error procesando el archivo XML =", xml)
        exit()

    raiz = arbol.getroot()

    # Encontrar y procesar cada ruta
    for i, ruta in enumerate(raiz.findall('.//{http://www.uniovi.es}ruta')):
        kmlName = "ruta" + str(i+1) +".kml"
        print(i)
        print(kmlName)
        kml = open(kmlName,"w")
        prologo(kml, kmlName)
        coorRuta  = ruta.find(".//{http://www.uniovi.es}coordenadasRuta")
        setCoordenadas(coorRuta, kml)
        for coorHito in ruta.findall(".//{http://www.uniovi.es}coordenadasHito"):
            setCoordenadas(coorHito, kml)
        epilogo(kml)
        kml.close()
            
        print(f'Se ha convertido la ruta a KML en {kmlName}')

def main():
    xml = input('Introduce el archivo XML de entrada: ')
    xml2kml(xml)

if __name__ == "__main__":
    main()
