// Qué cosas cotidianas mide «¿Cuántas horas de trabajo te cuesta?» en calcular.ar y de dónde sale cada
// precio. Lo usan el script que lee las fuentes, la página, la tarjeta OG y el check. Sin «server-only»:
// el cliente lo importa para los nombres.
//
// Regla del repo: solo precios de fuente oficial con fecha. Descartados (2026-10-25), con motivo en
// docs/decisiones/horas-ar.md: iPhone (Apple no vende en la Argentina; el precio «importado» sería una
// cuenta nuestra con impuestos que cambian), alquiler (no hay precio oficial), subte y colectivo (la
// tarifa cambia todos los meses sin un dato abierto que se pueda leer solo).

export type FuenteCotidiano = "indec" | "energia" | "canasta" | "spotify";

export interface ItemCotidiano {
  // Va en el link compartido: no se cambia nunca.
  id: string;
  // Con artículo y en minúscula: «un kilo de asado». La frase arma «Un kilo de asado me cuesta…».
  nombre: string;
  corto: string;
  cantidad: string;
  fuente: FuenteCotidiano;
  // INDEC: id de la serie «IPC-GBA. Precios» en la API de series de tiempo de datos.gob.ar.
  serie?: string;
  // Litros de nafta que suma (el tanque): el precio es el del litro por esta cantidad.
  litros?: number;
}

export const ITEMS_COTIDIANOS: readonly ItemCotidiano[] = [
  { id: "asado", nombre: "un kilo de asado", corto: "Asado", cantidad: "1 kg", fuente: "indec", serie: "105.1_I2A_2016_M_14" },
  { id: "yerba", nombre: "medio kilo de yerba", corto: "Yerba", cantidad: "500 g", fuente: "indec", serie: "105.1_I2YM_2016_M_19" },
  { id: "pan", nombre: "un kilo de pan", corto: "Pan francés", cantidad: "1 kg", fuente: "indec", serie: "105.1_I2PFF_2016_M_27" },
  { id: "leche", nombre: "un litro de leche", corto: "Leche", cantidad: "1 litro", fuente: "indec", serie: "105.1_I2LFES_2016_M_35" },
  { id: "huevos", nombre: "una docena de huevos", corto: "Huevos", cantidad: "12 unidades", fuente: "indec", serie: "105.1_I2HG_2016_M_23" },
  { id: "dulce", nombre: "un dulce de leche", corto: "Dulce de leche", cantidad: "400 g", fuente: "indec", serie: "105.1_I2DL_2016_M_20" },
  { id: "cerveza", nombre: "un litro de cerveza", corto: "Cerveza", cantidad: "1 litro", fuente: "indec", serie: "105.1_I2CB_2016_M_24" },
  { id: "cafe", nombre: "medio kilo de café", corto: "Café molido", cantidad: "500 g", fuente: "indec", serie: "105.1_I2CM_2016_M_20" },
  { id: "nafta", nombre: "un litro de nafta súper", corto: "Nafta súper", cantidad: "1 litro", fuente: "energia" },
  { id: "tanque", nombre: "llenar un tanque de nafta", corto: "Tanque de nafta", cantidad: "50 litros", fuente: "energia", litros: 50 },
  { id: "spotify", nombre: "un mes de Spotify Premium", corto: "Spotify Premium", cantidad: "1 mes", fuente: "spotify" },
  { id: "canasta", nombre: "la canasta básica de un adulto", corto: "Canasta básica", cantidad: "1 mes", fuente: "canasta" },
];

export const ITEM_INICIAL = "asado";

export function itemCotidiano(id: string): ItemCotidiano | undefined {
  return ITEMS_COTIDIANOS.find((i) => i.id === id);
}

export const RUTA_HORAS_AR = "/cuantas-horas-de-trabajo";

// Las fuentes, tal como se muestran. La URL es la página oficial que una persona puede abrir; lo que lee
// el script (la API o el CSV) queda en cotidianos-ar.json.
export const FUENTES_COTIDIANOS = {
  indec: {
    organismo: "INDEC",
    titulo: "Precios al consumidor de productos seleccionados, Gran Buenos Aires",
    url: "https://www.indec.gob.ar/ftp/cuadros/economia/sh_ipc_precios_promedio.xls",
  },
  energia: {
    organismo: "Secretaría de Energía",
    titulo: "Precios en surtidor (Resolución 314/2016), estaciones de la Ciudad de Buenos Aires",
    url: "https://datos.gob.ar/dataset/precios-en-surtidor",
  },
} as const;

export const API_SERIES = (id: string) => `https://apis.datos.gob.ar/series/api/series/?ids=${id}&format=json&sort=desc&limit=2`;
export const CSV_SURTIDOR =
  "https://datos.energia.gob.ar/dataset/1c181390-5045-475e-94dc-410429be4b17/resource/80ac25de-a44a-4445-9215-090cf55cfda5/download/precios-en-surtidor-resolucin-3142016.csv";
export const PRODUCTO_SURTIDOR = "Nafta (súper) entre 92 y 95 Ron";
export const PROVINCIA_SURTIDOR = "CAPITAL FEDERAL";
// Una estación que no actualizó su precio en este plazo no entra en la mediana (Res. 314/2016 obliga a
// informar cada cambio, así que un precio viejo es casi siempre una estación que dejó de informar).
export const DIAS_SURTIDOR = 30;
export const MINIMO_ESTACIONES = 8;

// Vencimientos. Un precio mensual del INDEC del período P se muestra hasta el último día de P + 3 meses
// (el INDEC publica P a mediados de P + 1 y la API lo repite con unas semanas de atraso). La nafta, 45 días
// desde la lectura: la ronda mensual la relee el día 1.
export const MESES_VIGENCIA_PERIODO = 3;
export const DIAS_VIGENCIA_NAFTA = 45;

export function finDeVigenciaPeriodo(periodo: string): string {
  const [a, m] = periodo.split("-").map(Number);
  return new Date(Date.UTC(a, m - 1 + MESES_VIGENCIA_PERIODO + 1, 0)).toISOString().slice(0, 10);
}

export function sumarDias(fecha: string, dias: number): string {
  return new Date(Date.parse(`${fecha}T00:00:00Z`) + dias * 86_400_000).toISOString().slice(0, 10);
}

export interface PrecioIndec {
  monto: number;
  periodo: string;
  serie: string;
  consultadoEl: string;
}

export interface PrecioNafta {
  monto: number;
  consultadoEl: string;
  estaciones: number;
  // Fecha de vigencia más vieja que entró en la mediana.
  desde: string;
}

// src/lib/horas/cotidianos-ar.json. Lo escribe solo scripts/horas/actualizar_cotidianos_ar.ts.
export interface ArchivoCotidianos {
  version: 1;
  actualizadoEl: string;
  indec: Readonly<Record<string, PrecioIndec>>;
  nafta: PrecioNafta | null;
}
