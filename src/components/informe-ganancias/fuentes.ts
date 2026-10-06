import { GANANCIAS_FUENTES } from "@/data/ganancias";
import { ALQUILER_FUENTES } from "@/data/deduccion-alquiler";
import { DEDUCCION_FUENTES } from "@/data/deduccion-domestica";
import { DEDUCCIONES_GENERALES_FUENTES } from "@/data/deducciones-generales";

// Fecha de consulta en ISO para `fechaLarga`. Las que vienen de los datos del sitio ya tienen la suya.
const HOY = "2026-10-06";

export const FUENTES_INFORME: { texto: string; url: string; consultado: string }[] = [
  { texto: GANANCIAS_FUENTES.escala.nombre, url: GANANCIAS_FUENTES.escala.url, consultado: "2026-07-29" },
  { texto: GANANCIAS_FUENTES.deducciones.nombre, url: GANANCIAS_FUENTES.deducciones.url, consultado: "2026-07-29" },
  {
    texto: "Ley de Impuesto a las Ganancias (t.o. Dec. 824/2019), arts. 30 y 85 — texto actualizado, InfoLEG (incluye el inc. j) de la Ley 27.701 y las modificaciones de la Ley 27.802)",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/330000-334999/332890/texact.htm",
    consultado: HOY,
  },
  {
    texto: "ARCA — ¿Cuáles son las deducciones generales? (conceptos, topes por año y requisitos)",
    url: "https://www.afip.gob.ar/gananciasYBienes/ganancias/personas-humanas-sucesiones-indivisas/deducciones/deducciones-generales.asp",
    consultado: HOY,
  },
  {
    texto: "ARCA — SiRADIG: qué datos cargar y plazo del 31 de marzo",
    url: "https://www.afip.gob.ar/572Web/carga-datos/que-datos-cargar.asp",
    consultado: HOY,
  },
  {
    texto: "ARCA — SiRADIG: cargas de familia (hijos al 50% o al 100%)",
    url: "https://www.afip.gob.ar/572Web/carga-datos/familia.asp",
    consultado: HOY,
  },
  {
    texto: "ARCA — Guía paso a paso «SiRADIG: ¿Cómo se presenta?»",
    url: "https://www.afip.gob.ar/guias/paso-a-paso/Guia-SiRADIG-Como-presentar-Y-Como-Cargar-Pluriempleo.pdf",
    consultado: HOY,
  },
  {
    texto: "ARCA — SiRADIG: alquileres (requisitos del 40%)",
    url: "https://www.afip.gob.ar/572Web/carga-datos/alquileres.asp",
    consultado: HOY,
  },
  {
    texto: "Ley 26.063, art. 16 — deducción del personal de casas particulares, InfoLEG",
    url: DEDUCCION_FUENTES.lista[0].url,
    consultado: "2026-08-13",
  },
  {
    texto: "Art. 26 inc. n) LIG, sustituido por el art. 192 de la Ley 27.802 (B.O. 6/3/2026): el 10% del alquiler ya no corre para la vivienda",
    url: ALQUILER_FUENTES.lista[1].url,
    consultado: "2026-08-14",
  },
  {
    texto: "Ley 27.743, art. 78 — ajuste por IPC del tope de seguros, InfoLEG",
    url: DEDUCCIONES_GENERALES_FUENTES.lista[1].url,
    consultado: "2026-09-16",
  },
];
