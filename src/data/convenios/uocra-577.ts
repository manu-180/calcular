// CCT 577/10 (UOCRA, obras de redes: canalización, líneas e instalación, empalme). Se negocia en la
// misma paritaria que el 76/75: cada acuerdo dice que lo pactado para el 76/75 se aplica al 577/10
// «conforme a las Tablas que se adjuntan como Anexo II». Los jornales de acá salen de esos Anexos II,
// no de aplicar el porcentaje a mano. Abril y mayo: acuerdo del 31/3/2026 (CAMARCO, scan con OCR,
// leído como imagen). Junio a agosto: Anexo II del PDF de UOCRA del segundo tramo (scan sin OCR,
// leído como imagen). Septiembre a noviembre: Anexo II del acuerdo del 21/9/2026 (CAMARCO, CI-067).
// scripts/check_planilla_uocra_577.ts valida cada tabla contra su propia aritmética (Zona C Austral
// = 2 × básico, Zona B ≈ +11 %, el % del acuerdo igual en las 12 filas de cada mes) y contra valores
// testigo copiados del PDF: un dígito mal leído se pone rojo.

import { MESES_UOCRA, UOCRA_FUENTES, type ZonaUocraId } from "./uocra";

export type RamaUocra577Id = "canalizacion" | "lineas" | "empalme";
export type CategoriaUocra577Id = "oficial-especializado" | "oficial" | "medio-oficial" | "ayudante";

export const RAMAS_UOCRA_577: { id: RamaUocra577Id; nombre: string }[] = [
  { id: "canalizacion", nombre: "Canalización" },
  { id: "lineas", nombre: "Líneas e instalación" },
  { id: "empalme", nombre: "Empalme" },
];

// Art. 12 del CCT 577/10: las cuatro categorías valen para las tres ramas. No hay sereno.
export const CATEGORIAS_UOCRA_577: { id: CategoriaUocra577Id; nombre: string }[] = [
  { id: "oficial-especializado", nombre: "Oficial especializado" },
  { id: "oficial", nombre: "Oficial" },
  { id: "medio-oficial", nombre: "Medio oficial" },
  { id: "ayudante", nombre: "Ayudante" },
];

type PorZona = Record<ZonaUocraId, number>;
type Tabla = Record<CategoriaUocra577Id, PorZona>;

export type MesUocra577 = {
  id: string;
  etiqueta: string;
  mes: number;
  anio: number;
  // «Total» de la tabla oficial por zona (el adicional por zona ya está adentro). Zona A = básico.
  jornales: Record<RamaUocra577Id, Tabla>;
  // El Anexo II repite la suma no remunerativa del 76/75: misma tabla por categoría y zona.
  snr: Record<CategoriaUocra577Id, PorZona>;
};

const t = (a: number, b: number, c: number, cAustral: number): PorZona => ({ a, b, c, "c-austral": cAustral });
const tabla = (filas: [PorZona, PorZona, PorZona, PorZona]): Tabla => ({
  "oficial-especializado": filas[0],
  oficial: filas[1],
  "medio-oficial": filas[2],
  ayudante: filas[3],
});

function snrDel7675(mesId: string): Record<CategoriaUocra577Id, PorZona> {
  const m = MESES_UOCRA.find((x) => x.id === mesId);
  if (!m) throw new Error(`MESES_UOCRA no tiene ${mesId}`);
  return {
    "oficial-especializado": m.snr["oficial-especializado"],
    oficial: m.snr.oficial,
    "medio-oficial": m.snr["medio-oficial"],
    ayudante: m.snr.ayudante,
  };
}

const MESES_ID: Record<number, string> = {
  4: "abril", 5: "mayo", 6: "junio", 7: "julio", 8: "agosto", 9: "septiembre", 10: "octubre", 11: "noviembre",
};

function mes(n: number, jornales: Record<RamaUocra577Id, Tabla>): MesUocra577 {
  const nombre = MESES_ID[n];
  const id = `${nombre}-2026`;
  return {
    id,
    etiqueta: `${nombre[0].toUpperCase()}${nombre.slice(1)} 2026`,
    mes: n,
    anio: 2026,
    jornales,
    snr: snrDel7675(id),
  };
}

export const MESES_UOCRA_577: MesUocra577[] = [
  mes(4, {
    canalizacion: tabla([t(6591, 7314, 10150, 13182), t(5385, 5972, 9048, 10772), t(4838, 5365, 8514, 9675), t(4360, 4839, 8066, 8720)]),
    lineas: tabla([t(6765, 7507, 10418, 13529), t(5509, 6109, 9255, 11018), t(4883, 5415, 8593, 9765), t(4474, 4965, 8277, 8948)]),
    empalme: tabla([t(6954, 7717, 10710, 13909), t(5673, 6291, 9531, 11347), t(5091, 5646, 8959, 10181), t(4614, 5121, 8537, 9229)]),
  }),
  mes(5, {
    canalizacion: tabla([t(6710, 7446, 10333, 13420), t(5483, 6080, 9211, 10966), t(4925, 5462, 8668, 9850), t(4439, 4926, 8212, 8878)]),
    lineas: tabla([t(6887, 7642, 10606, 13774), t(5609, 6220, 9423, 11218), t(4971, 5513, 8749, 9942), t(4555, 5055, 8426, 9110)]),
    empalme: tabla([t(7080, 7857, 10904, 14161), t(5776, 6405, 9704, 11552), t(5183, 5748, 9121, 10365), t(4698, 5214, 8691, 9396)]),
  }),
  mes(6, {
    canalizacion: tabla([t(7310, 8112, 11257, 14620), t(5973, 6624, 10035, 11947), t(5366, 5951, 9443, 10730), t(4836, 5367, 8946, 9672)]),
    lineas: tabla([t(7503, 8326, 11554, 15006), t(6110, 6776, 10265, 12220), t(5415, 6006, 9531, 10831), t(4962, 5507, 9180, 9924)]),
    empalme: tabla([t(7713, 8560, 11878, 15427), t(6292, 6978, 10571, 12585), t(5646, 6262, 9937, 11292), t(5118, 5680, 9468, 10236)]),
  }),
  mes(7, {
    canalizacion: tabla([t(7456, 8274, 11482, 14912), t(6093, 6756, 10236, 12186), t(5473, 6070, 9632, 10945), t(4933, 5474, 9125, 9865)]),
    lineas: tabla([t(7653, 8492, 11785, 15306), t(6232, 6911, 10470, 12465), t(5524, 6126, 9722, 11047), t(5061, 5617, 9363, 10123)]),
    empalme: tabla([t(7868, 8731, 12116, 15736), t(6418, 7118, 10783, 12837), t(5759, 6387, 10136, 11518), t(5220, 5793, 9657, 10440)]),
  }),
  mes(8, {
    canalizacion: tabla([t(8137, 9029, 12530, 16273), t(6649, 7373, 11170, 13298), t(5972, 6624, 10511, 11944), t(5383, 5974, 9958, 10766)]),
    lineas: tabla([t(8352, 9267, 12861, 16703), t(6801, 7542, 11426, 13603), t(6028, 6685, 10609, 12056), t(5523, 6130, 10218, 11047)]),
    empalme: tabla([t(8586, 9528, 13222, 17172), t(7004, 7767, 11767, 14008), t(6285, 6970, 11061, 12569), t(5697, 6322, 10539, 11393)]),
  }),
  mes(9, {
    canalizacion: tabla([t(8291, 9201, 12768, 16583), t(6775, 7513, 11382, 13551), t(6086, 6750, 10711, 12171), t(5485, 6087, 10147, 10970)]),
    lineas: tabla([t(8510, 9443, 13106, 17020), t(6931, 7686, 11643, 13861), t(6142, 6812, 10811, 12285), t(5628, 6246, 10412, 11257)]),
    empalme: tabla([t(8749, 9709, 13473, 17498), t(7137, 7915, 11991, 14275), t(6404, 7103, 11271, 12808), t(5805, 6442, 10739, 11610)]),
  }),
  mes(10, {
    canalizacion: tabla([t(8440, 9367, 12998, 16881), t(6897, 7648, 11587, 13795), t(6195, 6871, 10904, 12390), t(5584, 6197, 10330, 11168)]),
    lineas: tabla([t(8663, 9613, 13341, 17327), t(7055, 7824, 11853, 14111), t(6253, 6935, 11005, 12506), t(5730, 6359, 10600, 11459)]),
    empalme: tabla([t(8906, 9883, 13716, 17813), t(7266, 8057, 12206, 14531), t(6519, 7230, 11474, 13038), t(5909, 6558, 10932, 11819)]),
  }),
  mes(11, {
    canalizacion: tabla([t(8584, 9526, 13219, 17168), t(7014, 7778, 11784, 14029), t(6301, 6988, 11089, 12601), t(5679, 6302, 10506, 11357)]),
    lineas: tabla([t(8811, 9777, 13568, 17621), t(7175, 7957, 12054, 14350), t(6359, 7053, 11192, 12719), t(5827, 6467, 10780, 11654)]),
    empalme: tabla([t(9058, 10051, 13949, 18116), t(7389, 8194, 12414, 14779), t(6630, 7353, 11669, 13260), t(6010, 6670, 11118, 12020)]),
  }),
];

// Art. 13 b): 0,50 % del jornal básico (sin adicional por zona) por año con el mismo empleador.
// Es la diferencia más visible con el 76/75, que no tiene antigüedad.
export const UOCRA_577_ANTIGUEDAD_POR_ANIO = 0.005;

export const UOCRA_577_FUENTES = {
  cct: {
    nombre:
      "Texto del CCT 577/10 (B.O. 5/3/2010): art. 11 asistencia perfecta 20%, art. 12 ramas y categorías, art. 13 antigüedad 0,5% por año, art. 17 jornada de 44 horas. Copia del Consejo Profesional de Ciencias Económicas de Salta",
    url: "https://www.consejosalta.org.ar/boletin/doc/422/nov_nac_convenio_577.doc",
  },
  abrilMayo: {
    nombre: "Acuerdo UOCRA-CAMARCO-FAEC 31/3/2026: Anexo II con las tablas del CCT 577/10 de abril y mayo 2026",
    url: "https://www.camarco.org.ar/wp-content/uploads/2026/04/76.75-31.3.pdf",
  },
  junioAgosto: {
    nombre: "UOCRA: segundo tramo CCT 76/75 y 577/10, Anexo II con las tablas del 577/10 de junio, julio y agosto 2026",
    url: UOCRA_FUENTES.anexoTramo2.url,
  },
  septiembreNoviembre: {
    nombre:
      "Acuerdo UOCRA-CAMARCO-FAEC 21/9/2026: Anexo II con las tablas del CCT 577/10 de septiembre, octubre y noviembre 2026",
    url: UOCRA_FUENTES.acuerdoTramo3.url,
  },
  consultadoEl: "26 de noviembre de 2026",
};
