// Registro de novedades: cada dato oficial nuevo que llegó a calcular.ar, con su fuente.
// Lo agranda solo scripts/datos-vivos/novedades.ts (lo corre el workflow datos-vivos): agrega lo que
// falta y nunca borra. Una entrada a mano (escala de un gremio, una corrección) se suma acá con el
// mismo formato y el script la conserva. publicadoEl = día que lo publicó el organismo; cargadoEl =
// día que llegó al sitio. Si no se sabe uno de los dos, se omite: nunca se adivina.
import type { Novedad } from "@/lib/novedades";

export const NOVEDADES_REGISTRADAS: Novedad[] = [
  {
    "id": "aportes-casas-2026-09",
    "serie": "aportes-casas",
    "organismo": "ARCA",
    "tipo": "dato",
    "cargadoEl": "2026-10-07",
    "titulo": "Aportes de casas particulares de septiembre",
    "detalle": "ARCA publicó lo que se paga por mes por una trabajadora registrada en septiembre de 2026. Con 16 horas semanales o más son $ 44.270,19, entre obra social, jubilación y ART.",
    "fuente": {
      "nombre": "ARCA · Aportes, contribuciones y ART de casas particulares",
      "url": "https://www.arca.gob.ar/casasparticulares/aportes-contribuciones-ART/documentos/2026/Casas-particulares-aportes-y-contribuciones-08-26.pdf"
    },
    "rutas": [
      "/aportes-empleada-domestica",
      "/deduccion-empleada-domestica"
    ]
  },
  {
    "id": "bono-2026-10",
    "serie": "bono",
    "organismo": "Gobierno nacional",
    "tipo": "dato",
    "publicadoEl": "2026-09-28",
    "cargadoEl": "2026-09-28",
    "rigeDesde": "2026-10-01",
    "titulo": "Bono de $ 70.000 para jubilados en octubre",
    "detalle": "Lo confirmó el Decreto 1108/2026. Con la jubilación mínima, el total del mes llega a $ 505.748,51. Con haberes más altos el bono se achica, hasta desaparecer.",
    "fuente": {
      "nombre": "Decreto 1108/2026 · Boletín Oficial",
      "url": "https://www.boletinoficial.gob.ar/detalleAviso/primera/348024/20260928"
    },
    "rutas": [
      "/jubilacion",
      "/puam",
      "/pension-no-contributiva"
    ]
  },
  {
    "id": "asignaciones-2026-10",
    "serie": "asignaciones",
    "organismo": "ANSES",
    "tipo": "dato",
    "publicadoEl": "2026-09-23",
    "cargadoEl": "2026-09-23",
    "rigeDesde": "2026-10-01",
    "titulo": "Asignaciones familiares y AUH de octubre: suben 1,66%",
    "detalle": "ANSES actualizó los montos y los topes de ingreso. Ojo: si una sola persona del hogar gana más de $ 3.209.863 por mes, el grupo entero deja de cobrar.",
    "fuente": {
      "nombre": "Resolución ANSES 283/2026 · Boletín Oficial",
      "url": "https://www.boletinoficial.gob.ar/detalleAviso/primera/347831/20260923"
    },
    "rutas": [
      "/asignaciones-familiares"
    ]
  },
  {
    "id": "haberes-2026-10",
    "serie": "haberes",
    "organismo": "ANSES",
    "tipo": "dato",
    "publicadoEl": "2026-09-23",
    "cargadoEl": "2026-09-23",
    "rigeDesde": "2026-10-01",
    "titulo": "Jubilaciones de octubre: suben 1,66%",
    "detalle": "ANSES fijó la jubilación mínima en $ 435.748,51 y la máxima en $ 2.932.174,85. La PUAM queda en $ 348.598,81.",
    "fuente": {
      "nombre": "Resolución ANSES 284/2026 · Boletín Oficial",
      "url": "https://www.boletinoficial.gob.ar/detalleAviso/primera/347832/20260923"
    },
    "rutas": [
      "/jubilacion",
      "/puam",
      "/pension-no-contributiva",
      "/edad-avanzada"
    ]
  },
  {
    "id": "uocra-acuerdo-2026-09-21",
    "serie": "uocra",
    "organismo": "UOCRA y CAMARCO",
    "tipo": "dato",
    "publicadoEl": "2026-09-21",
    "cargadoEl": "2026-09-28",
    "rigeDesde": "2026-09-01",
    "titulo": "Construcción (UOCRA): aumentos de septiembre a noviembre",
    "detalle": "El acuerdo del 21 de septiembre suma 1,9% en septiembre, 1,8% en octubre y 1,7% en noviembre, sin sumas no remunerativas. Cada mes se aplica sobre el anterior.",
    "fuente": {
      "nombre": "Acuerdo UOCRA, CAMARCO y FAEC del 21/9/2026 · PDF firmado",
      "url": "https://www.camarco.org.ar/wp-content/uploads/2026/09/CI-067-ADJ-Ac-Sal-UOCRA-sep-nov26.pdf"
    },
    "rutas": [
      "/convenios/uocra",
      "/sueldo-neto/construccion"
    ]
  },
  {
    "id": "camioneros-correccion-2026-09-20",
    "serie": "camioneros",
    "organismo": "Camioneros (FADEEAC)",
    "tipo": "correccion",
    "cargadoEl": "2026-09-20",
    "rigeDesde": "2026-07-01",
    "titulo": "Camioneros: corregimos los básicos de julio y agosto",
    "detalle": "Estaban 2,68% por debajo de lo que firmaron el gremio y las empresas, porque la revisión de junio fue de 4,22% y no de 1,5%. Ahora salen de la planilla oficial: un chofer de primera cobra $ 1.075.910,44 en agosto.",
    "fuente": {
      "nombre": "FADEEAC · Planillas salariales firmadas del CCT 40/89",
      "url": "https://www.fadeeac.org.ar/departamento-legislacion-legales-y-seguros/"
    },
    "rutas": [
      "/convenios/camioneros",
      "/sueldo-neto/camioneros"
    ]
  },
  {
    "id": "casas-particulares-res-cntcp-7-2026",
    "serie": "casas-particulares",
    "organismo": "Comisión de Casas Particulares",
    "tipo": "correccion",
    "publicadoEl": "2026-09-18",
    "cargadoEl": "2026-09-28",
    "rigeDesde": "2026-11-01",
    "titulo": "Casas particulares: la Comisión corrigió noviembre y diciembre",
    "detalle": "Los anexos originales tenían un error y el aumento de esos dos meses es 1,6%, como dice la resolución, y no 1,7%. Si calculaste noviembre o diciembre antes del 28 de septiembre, volvé a hacer la cuenta.",
    "fuente": {
      "nombre": "Resolución CNTCP 7/2026 · Boletín Oficial",
      "url": "https://www.boletinoficial.gob.ar/detalleAviso/primera/347648/20260918"
    },
    "rutas": [
      "/empleada-domestica"
    ]
  },
  {
    "id": "canasta-crianza-2026-08",
    "serie": "canasta-crianza",
    "organismo": "INDEC",
    "tipo": "dato",
    "cargadoEl": "2026-09-15",
    "titulo": "Canasta de crianza de agosto",
    "detalle": "Criar a un chico de 6 a 12 años costó $ 713.070 en agosto de 2026, sumando bienes y tiempo de cuidado. Es la referencia que usa la cuenta de cuota alimentaria.",
    "fuente": {
      "nombre": "INDEC · Canasta de crianza",
      "url": "https://www.indec.gob.ar/indec/web/Nivel4-Tema-4-43-173"
    },
    "rutas": [
      "/cuota-alimentaria"
    ]
  },
  {
    "id": "canasta-basica-2026-08",
    "serie": "canasta-basica",
    "organismo": "INDEC",
    "tipo": "dato",
    "cargadoEl": "2026-09-13",
    "titulo": "Canasta básica de agosto: $ 519.578 por adulto",
    "detalle": "Es la línea de pobreza que marca el INDEC para una persona adulta en el Gran Buenos Aires en agosto de 2026. La de indigencia quedó en $ 235.103.",
    "fuente": {
      "nombre": "INDEC · Canasta básica alimentaria y total",
      "url": "https://www.indec.gob.ar/indec/web/Nivel4-Tema-4-43-149"
    },
    "rutas": [
      "/canasta-basica"
    ]
  },
  {
    "id": "ipc-2026-08",
    "serie": "ipc",
    "organismo": "INDEC",
    "tipo": "dato",
    "cargadoEl": "2026-09-11",
    "titulo": "La inflación de agosto fue de 1,7%",
    "detalle": "El INDEC publicó el índice de precios de agosto de 2026. Ya lo usan las cuentas de inflación, ajuste de alquiler, plazo fijo y actualización de deudas laborales.",
    "fuente": {
      "nombre": "INDEC · Índice de precios al consumidor",
      "url": "https://www.indec.gob.ar/indec/web/Nivel4-Tema-3-5-31"
    },
    "rutas": [
      "/inflacion",
      "/inflacion/alquiler",
      "/plazo-fijo",
      "/actualizacion-creditos-laborales"
    ]
  },
  {
    "id": "aportes-casas-2026-08",
    "serie": "aportes-casas",
    "organismo": "ARCA",
    "tipo": "dato",
    "cargadoEl": "2026-09-05",
    "titulo": "Aportes de casas particulares de agosto",
    "detalle": "ARCA publicó lo que se paga por mes por una trabajadora registrada en agosto de 2026. Con 16 horas semanales o más son $ 43.733, entre obra social, jubilación y ART.",
    "fuente": {
      "nombre": "ARCA · Aportes, contribuciones y ART de casas particulares",
      "url": "https://www.arca.gob.ar/casasparticulares/aportes-contribuciones-ART/documentos/2026/Casas-particulares-aportes-y-contribuciones-08-26.pdf"
    },
    "rutas": [
      "/aportes-empleada-domestica",
      "/deduccion-empleada-domestica"
    ]
  },
  {
    "id": "casas-particulares-res-cntcp-6-2026",
    "serie": "casas-particulares",
    "organismo": "Comisión de Casas Particulares",
    "tipo": "dato",
    "publicadoEl": "2026-09-03",
    "cargadoEl": "2026-09-15",
    "rigeDesde": "2026-08-01",
    "titulo": "Empleadas domésticas: nueva escala de agosto a diciembre",
    "detalle": "Los sueldos suben 1,9% en agosto, 1,8% en septiembre, 1,7% en octubre y 1,6% en noviembre y en diciembre. Además, parte de una suma fija pasa al básico, así que el aumento real es un poco mayor que el porcentaje.",
    "fuente": {
      "nombre": "Resolución CNTCP 6/2026 · Boletín Oficial",
      "url": "https://www.boletinoficial.gob.ar/detalleAviso/primera/346855/20260903"
    },
    "rutas": [
      "/empleada-domestica",
      "/art-empleada-domestica"
    ]
  },
  {
    "id": "salario-minimo-res-4-2026",
    "serie": "salario-minimo",
    "organismo": "Consejo del Salario",
    "tipo": "dato",
    "publicadoEl": "2026-09-02",
    "rigeDesde": "2026-09-01",
    "titulo": "Salario mínimo fijado hasta abril de 2027",
    "detalle": "Sin acuerdo en el Consejo del Salario, quedó fijado por laudo mes a mes. En octubre es de $ 391.200 por mes, o $ 1.956 la hora.",
    "fuente": {
      "nombre": "Resolución 4/2026 del Consejo del Salario · Boletín Oficial",
      "url": "https://www.boletinoficial.gob.ar/detalleAviso/primera/346775/20260902"
    },
    "rutas": [
      "/salario-minimo",
      "/desempleo"
    ]
  },
  {
    "id": "asignaciones-2026-09",
    "serie": "asignaciones",
    "organismo": "ANSES",
    "tipo": "dato",
    "publicadoEl": "2026-09-01",
    "rigeDesde": "2026-09-01",
    "titulo": "Asignaciones familiares y AUH de septiembre: suben 2,11%",
    "detalle": "ANSES actualizó los montos y los topes de ingreso. Ojo: si una sola persona del hogar gana más de $ 3.157.449 por mes, el grupo entero deja de cobrar.",
    "fuente": {
      "nombre": "Resolución ANSES 260/2026 · Boletín Oficial",
      "url": "https://www.boletinoficial.gob.ar/detalleAviso/primera/346684/20260901"
    },
    "rutas": [
      "/asignaciones-familiares"
    ]
  },
  {
    "id": "haberes-2026-09",
    "serie": "haberes",
    "organismo": "ANSES",
    "tipo": "dato",
    "publicadoEl": "2026-09-01",
    "rigeDesde": "2026-09-01",
    "titulo": "Jubilaciones de septiembre: suben 2,11%",
    "detalle": "ANSES fijó la jubilación mínima en $ 428.633,20 y la máxima en $ 2.884.295,54. La PUAM queda en $ 342.906,56.",
    "fuente": {
      "nombre": "Resolución ANSES 257/2026 · Boletín Oficial",
      "url": "https://www.boletinoficial.gob.ar/detalleAviso/primera/346683/20260901"
    },
    "rutas": [
      "/jubilacion",
      "/puam",
      "/pension-no-contributiva",
      "/edad-avanzada"
    ]
  },
  {
    "id": "bono-2026-09",
    "serie": "bono",
    "organismo": "Gobierno nacional",
    "tipo": "dato",
    "publicadoEl": "2026-08-31",
    "rigeDesde": "2026-09-01",
    "titulo": "Bono de $ 70.000 para jubilados en septiembre",
    "detalle": "Lo confirmó el Decreto 824/2026. Con la jubilación mínima, el total del mes llega a $ 498.633,20. Con haberes más altos el bono se achica, hasta desaparecer.",
    "fuente": {
      "nombre": "Decreto 824/2026 · Boletín Oficial",
      "url": "https://www.boletinoficial.gob.ar/detalleAviso/primera/346555/20260831"
    },
    "rutas": [
      "/jubilacion",
      "/puam",
      "/pension-no-contributiva"
    ]
  },
  {
    "id": "uma-2026-07",
    "serie": "uma",
    "organismo": "Corte Suprema",
    "tipo": "dato",
    "publicadoEl": "2026-08-20",
    "rigeDesde": "2026-07-01",
    "titulo": "UMA de julio: $ 104.220",
    "detalle": "La Corte Suprema fijó el valor de la unidad que se usa para regular honorarios desde julio de 2026 (Resolución 1930/2026).",
    "fuente": {
      "nombre": "Corte Suprema · Resolución 1930/2026",
      "url": "https://www.csjn.gov.ar/documentos/descargar?ID=160993"
    },
    "rutas": [
      "/honorarios-periciales"
    ]
  },
  {
    "id": "comercio-acuerdo-2026-07-22",
    "serie": "comercio",
    "organismo": "FAECYS",
    "tipo": "dato",
    "publicadoEl": "2026-07-28",
    "rigeDesde": "2026-07-01",
    "titulo": "Comercio: escalas de julio de 2026 a mayo de 2027",
    "detalle": "FAECYS publicó la circular con las escalas del acuerdo del 22 de julio: 5,7% para el trimestre, en tres tramos, y un bono de $ 50.000 en dos cuotas.",
    "fuente": {
      "nombre": "FAECYS · Circular del acuerdo de julio de 2026",
      "url": "https://www.faecys.org.ar/circular-acuerdo-julio-2026/"
    },
    "rutas": [
      "/convenios/comercio",
      "/sueldo-neto/comercio"
    ]
  },
];
