import xml.etree.ElementTree as ET


def prologo(svg):
    svg.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    svg.write('<svg xmlns="http://www.w3.org/2000/svg" version="2.0">\n')
    svg.write('<polyline points = "')

def epilogo(svg, hitos):
    svg.write('"\n')
    svg.write(" \" style=\"fill:white;stroke:red;stroke-width:4\"/>\n")
    for hito in hitos:
        svg.write("<text  x=\""+ str(hito[1])+"\" y=\""+str(hito[2])+"\" style=\"writing-mode: tb; glyph-orientation-vertical: 0;\">" + hito[0]+"</text>\n")
    svg.write("</svg>")

def xml2perfil(xml):
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
    for i, ruta in raiz.findall('.//{http://www.uniovi.es}ruta'):
        hitos = []
        svgName = "perfil" + str(n) +".svg"
        svg = open(svgName,"x")
        prologo(svg)
        incremento = 40 
        base = 200

        for j, hito in ruta.findall(".//{http://www.uniovi.es}hito"):
            name = hito.get('name')
            if(hito.find(".//{http://www.uniovi.es}distanciaHitoAnterior") != None ):
                incremento = incremento + int((int(hito.find(".//{http://www.uniovi.es}distanciaHitoAnterior").text))/10)
            altitud = int((int(hito.find(".//{http://www.uniovi.es}altitud").text))/10)
            datosHitos = [name, incremento, base]
            hitos.insert(j, datosHitos)
            svg.write(str(incremento) + "," + str(base - altitud) + " \n")
        epilogo(svg, hitos)
        svg.close()
        n = n +1
            
        print(f'Se ha convertido la ruta a SVG en {svgName}')

def main():
    xml = input('Introduce el archivo XML de entrada: ')
    xml2perfil(xml)

if __name__ == "__main__":
    main()
