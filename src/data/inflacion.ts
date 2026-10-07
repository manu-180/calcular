// Datos y fuentes del cluster de inflación.
// REGLA DE ORO: estos datos se verifican SOLO contra fuentes oficiales, nunca blogs.
//
// Verificado el 12/06/2026:
// - Serie IPC Nacional: API oficial de series de tiempo de datos.gob.ar
//   (serie 148.3_INIVELNAL_DICI_M_26, nivel general, base dic-2016 = 100, mensual).
//   La serie completa vive en src/data/ipc-serie.ts, GENERADA por scripts/gen_ipc_serie.ts
//   (la API tarda >30s: se embebe en build, jamás se consulta desde el navegador).
//   El INDEC publica cada dato ~día 10-15 del mes siguiente → regenerar en cada redeploy.
// - Alquileres: DNU 70/2023 (B.O. 21/12/2023), verificado texto literal en Infoleg:
//   art. 249 derogó la Ley 27.551 (ley de alquileres) y art. 257 sustituyó el art. 1199
//   del Código Civil y Comercial: "Las partes podrán pactar el ajuste del valor de los
//   alquileres. Será válido el uso de cualquier índice pactado por las partes, público o
//   privado, expresado en la misma moneda en la que se pactaron los alquileres."
// - Los contratos firmados durante la vigencia de la Ley 27.551/27.737 (jul-2020 a
//   dic-2023) mantienen en general su esquema original (ajuste anual por ICL): el art. 7
//   del CCyC dispone que las nuevas leyes supletorias no alcanzan a los contratos en curso.

export const INFLACION_FUENTES = {
  ipc: {
    nombre: "INDEC: IPC Nacional, nivel general (API oficial de series de tiempo)",
    url: "https://datos.gob.ar/series/api/series/?ids=148.3_INIVELNAL_DICI_M_26&format=json",
  },
  indec: {
    nombre: "INDEC: Índice de precios al consumidor (informes técnicos mensuales)",
    url: "https://www.indec.gob.ar/indec/web/Nivel4-Tema-3-5-31",
  },
  dnu: {
    nombre: "DNU 70/2023: arts. 249 y 257 (alquileres: libre pacto del índice de ajuste)",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/395000-399999/395521/norma.htm",
  },
  ccyc1199: {
    nombre: "Código Civil y Comercial, art. 1199 (texto según DNU 70/2023)",
    url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/235000-239999/235975/texact.htm",
  },
  consultadoEl: "12 de junio de 2026",
};

// Día aproximado del mes en que el INDEC publica el IPC del mes anterior.
export const IPC_DIA_PUBLICACION = "entre el 10 y el 15";

// Periodicidades de ajuste de alquiler más usadas post-DNU 70/2023.
export const PERIODICIDADES_ALQUILER = [3, 4, 6, 12] as const;
