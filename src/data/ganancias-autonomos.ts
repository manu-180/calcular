// Ganancias para autónomos que trabajan personalmente: la deducción especial del art. 30 inc. c)
// apartado 1 LIG (t.o. 2019) y la de "nuevos profesionales/emprendedores" del Dec. 862/2019 art. 99.
//
// Los montos viven en data/ganancias.ts (DEDUCCIONES) y rotan con el resto cada semestre. Acá sólo
// van los textos verbatim y las reglas. Los MONTOS de las categorías de autónomos no se publican a
// propósito (NO-GO escrito en data/aportes-obligatorios.ts): la calculadora pide lo que la persona
// paga, así la página no vence con cada resolución de ARCA.
//
// "Incrementar en 2,5 veces" el inciso a) es sumarle 2,5 veces más: la especial vale 3,5 × MNI
// (4 × MNI para nuevos). ARCA publica exactamente esos montos; el check lo ancla.

export const ANIO_AUTONOMOS = 2026;

export const MESES_NUEVO_PROFESIONAL = 36;

export const AUTONOMOS_TEXTOS = {
  apartado1:
    "Dos coma cinco (2,5) veces, cuando se trate de ganancias netas comprendidas en el artículo 53, siempre que trabajen personalmente en la actividad o empresa y de ganancias netas incluidas en el artículo 82, excepto que queden incluidas en el apartado siguiente.",
  nuevos:
    "el incremento será de tres (3) veces, en lugar de dos coma cinco (2,5) veces, cuando se trate de “nuevos profesionales” o “nuevos emprendedores”, en los términos que establezca la reglamentación.",
  condicionAportes:
    "Es condición indispensable para el cómputo de la deducción a que se refiere este apartado, en relación con las rentas y actividad respectiva, el pago de los aportes que, como trabajadores autónomos, deban realizar obligatoriamente al Sistema Integrado Previsional Argentino (SIPA) o a la caja de jubilaciones sustitutiva que corresponda.",
  reglamento99:
    "los profesionales con hasta TRES (3) años de antigüedad en la matrícula y los trabajadores independientes con hasta TRES (3) años de antigüedad contados desde su inscripción como tales",
};

export const AUTONOMOS_FUENTES = {
  consultadoEl: "22 de septiembre de 2026",
  lista: [
    {
      nombre: "Ley de Impuesto a las Ganancias (t.o. Decreto 824/2019), art. 30, texto actualizado",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/330000-334999/332890/texact.htm",
      detalle: "inciso c) apartado 1: la deducción especial de 2,5 veces (3 para nuevos) y la condición de pagar los aportes.",
    },
    {
      nombre: "Decreto 862/2019 (reglamentación de la ley), art. 99, texto actualizado",
      url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/330000-334999/332991/texact.htm",
      detalle: "quién es «nuevo profesional» o «nuevo emprendedor»: hasta tres años de matrícula o de inscripción.",
    },
    {
      nombre: "ARCA: Deducciones personales art. 30 LIG (julio a diciembre 2026)",
      url: "https://www.afip.gob.ar/gananciasYBienes/ganancias/personas-humanas-sucesiones-indivisas/deducciones/documentos/Deducciones-personales-art-30-jul-dic-2026.pdf",
      detalle: "ganancia no imponible, cargas de familia y las dos deducciones especiales del apartado 1, en pesos.",
    },
    {
      nombre: "ARCA: Tabla escala art. 94 LIG (julio a diciembre 2026)",
      url: "https://www.afip.gob.ar/gananciasYBienes/ganancias/personas-humanas-sucesiones-indivisas/declaracion-jurada/documentos/Tabla-Art-94-LIG-per-jul-a-dic-2026.pdf",
      detalle: "la escala progresiva del 5% al 35% acumulada a diciembre.",
    },
  ],
};
