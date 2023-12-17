import xml.etree.ElementTree as ET


def prologo(svg):
    svg.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    svg.write('<svg xmlns="http://www.w3.org/2000/svg" version="2.0">\n')
    svg.write('<polyline points = "')

def epilogo(svg, hitos):
    svg.write(" \" style=\"fill:white;stroke:red;stroke-width:4\"/>\n")
    for hito in hitos:
        svg.write("<text  x=\""+ str(hito[1])+"\" y=\""+str(hito[2])+"\" style=\"writing-mode: tb; glyph-orientation-vertical: 0;\">" + hito[0] + "</text>\n")
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
    for i, ruta in enumerate(raiz.findall('.//{http://www.uniovi.es}ruta')):
        hitos = []
        svgName = "perfil" + str(i+1) +".svg"
        svg = open(svgName,"w")
        prologo(svg)
        incremento = 100 
        base = 150

        for j, hito in enumerate(ruta.findall(".//{http://www.uniovi.es}hito")):
            name = hito.get('nombreHito')
            if(hito.find(".//{http://www.uniovi.es}distancia") != None ):
                incremento = incremento + int((int(hito.find(".//{http://www.uniovi.es}distancia").text))/10)
            altitud = (float(hito.find(".//{http://www.uniovi.es}altitud").text))
            datosHitos = [name, incremento, base]
            hitos.insert(j, datosHitos)
            svg.write(str(incremento) + "," + str(base - altitud) + " \n")
        epilogo(svg, hitos)
        svg.close()
            
        print(f'Se ha convertido la ruta a SVG en {svgName}')

def main():
    xml = input('Introduce el archivo XML de entrada: ')
    xml2perfil(xml)

if __name__ == "__main__":
    main()
