// Canasta básica alimentaria (CBA) y canasta básica total (CBT) del ADULTO EQUIVALENTE,
// Gran Buenos Aires (INDEC). GENERADO por scripts/gen_canasta_basica.ts — NO editar a mano.
//   https://apis.datos.gob.ar/series/api/series/?ids=150.1_CSTA_BARIA_0_D_26,150.1_CSTA_BATAL_0_D_20,150.1_LA_INDICIA_0_D_16,150.1_LA_POBREZA_0_D_13&format=json&limit=1000
// Descargado el 2026-08-15. Último período: julio 2026 (CBA 229131.47 · CBT 506380.55).
//
// QUÉ SIGNIFICAN (metodología INDEC N° 22):
//   · CBA = costo mensual de los alimentos que cubren los requerimientos kilocalóricos y proteicos
//     de un varón adulto de 30 a 60 años con actividad moderada. Es la LÍNEA DE INDIGENCIA por
//     adulto equivalente.
//   · CBT = CBA ampliada por el coeficiente de Engel para cubrir bienes y servicios no alimentarios.
//     Es la LÍNEA DE POBREZA por adulto equivalente.
// Para un hogar concreto, ambas se multiplican por sus adultos equivalentes (src/data/adulto-equivalente.ts).
//
// ⚠️ NO es una medición de pobreza de una persona: el INDEC mide pobreza por INGRESO del hogar
// comparado contra su CBT. Un hogar con ingresos por debajo de la CBT de su composición es pobre;
// por debajo de la CBA, indigente. Es un umbral estadístico, no una categoría legal ni un beneficio.
//
// El INDEC publica el informe ~día 14-15 de cada mes: regenerar en cada redeploy mensual.

export type MesCanastaBasica = {
  periodo: string; // "2026-06"
  /** Canasta básica alimentaria del adulto equivalente, en pesos corrientes. */
  cba: number;
  /** Canasta básica total del adulto equivalente, en pesos corrientes. */
  cbt: number;
};

export const CANASTA_BASICA: MesCanastaBasica[] = [
  { periodo: "2016-04", cba: 1514.53, cbt: 3663.66 },
  { periodo: "2016-05", cba: 1561.35, cbt: 3830.77 },
  { periodo: "2016-06", cba: 1614.32, cbt: 3942.67 },
  { periodo: "2016-07", cba: 1666.48, cbt: 4033.76 },
  { periodo: "2016-08", cba: 1675.05, cbt: 4041.87 },
  { periodo: "2016-09", cba: 1711.22, cbt: 4089.82 },
  { periodo: "2016-10", cba: 1739.34, cbt: 4191.81 },
  { periodo: "2016-11", cba: 1762.65, cbt: 4247.99 },
  { periodo: "2016-12", cba: 1766.62, cbt: 4257.55 },
  { periodo: "2017-01", cba: 1789.15, cbt: 4311.85 },
  { periodo: "2017-02", cba: 1821.02, cbt: 4425.08 },
  { periodo: "2017-03", cba: 1876.56, cbt: 4560.04 },
  { periodo: "2017-04", cba: 1915.47, cbt: 4692.9 },
  { periodo: "2017-05", cba: 1937.24, cbt: 4746.24 },
  { periodo: "2017-06", cba: 1956.42, cbt: 4793.23 },
  { periodo: "2017-07", cba: 1984.64, cbt: 4862.37 },
  { periodo: "2017-08", cba: 2021.98, cbt: 4933.63 },
  { periodo: "2017-09", cba: 2049.39, cbt: 5000.51 },
  { periodo: "2017-10", cba: 2079.23, cbt: 5073.32 },
  { periodo: "2017-11", cba: 2125.84, cbt: 5187.05 },
  { periodo: "2017-12", cba: 2150.29, cbt: 5397.23 },
  { periodo: "2018-01", cba: 2197.26, cbt: 5493.15 },
  { periodo: "2018-02", cba: 2261.23, cbt: 5675.69 },
  { periodo: "2018-03", cba: 2294.56, cbt: 5782.29 },
  { periodo: "2018-04", cba: 2308.11, cbt: 5908.76 },
  { periodo: "2018-05", cba: 2418.65, cbt: 6095 },
  { periodo: "2018-06", cba: 2537.45, cbt: 6343.62 },
  { periodo: "2018-07", cba: 2627.37, cbt: 6515.88 },
  { periodo: "2018-08", cba: 2701.48, cbt: 6753.7 },
  { periodo: "2018-09", cba: 2931.88, cbt: 7300.38 },
  { periodo: "2018-10", cba: 3150.62, cbt: 7845.04 },
  { periodo: "2018-11", cba: 3276.02, cbt: 8157.29 },
  { periodo: "2018-12", cba: 3300.17, cbt: 8250.42 },
  { periodo: "2019-01", cba: 3423.03, cbt: 8557.58 },
  { periodo: "2019-02", cba: 3597.77, cbt: 8922.47 },
  { periodo: "2019-03", cba: 3767.01, cbt: 9304.51 },
  { periodo: "2019-04", cba: 3833.28, cbt: 9544.87 },
  { periodo: "2019-05", cba: 3911.58, cbt: 9818.07 },
  { periodo: "2019-06", cba: 4016.09, cbt: 10080.39 },
  { periodo: "2019-07", cba: 4133.91, cbt: 10334.77 },
  { periodo: "2019-08", cba: 4290.72, cbt: 10683.89 },
  { periodo: "2019-09", cba: 4502.88, cbt: 11257.2 },
  { periodo: "2019-10", cba: 4596.2, cbt: 11536.46 },
  { periodo: "2019-11", cba: 4886.34, cbt: 12166.99 },
  { periodo: "2019-12", cba: 5043.41, cbt: 12608.52 },
  { periodo: "2020-01", cba: 5332.94, cbt: 13065.7 },
  { periodo: "2020-02", cba: 5432.32, cbt: 13200.54 },
  { periodo: "2020-03", cba: 5615.94, cbt: 13590.57 },
  { periodo: "2020-04", cba: 5791.79, cbt: 13784.46 },
  { periodo: "2020-05", cba: 5785.01, cbt: 13941.87 },
  { periodo: "2020-06", cba: 5834.66, cbt: 14178.22 },
  { periodo: "2020-07", cba: 5929.29, cbt: 14408.17 },
  { periodo: "2020-08", cba: 6081.69, cbt: 14717.69 },
  { periodo: "2020-09", cba: 6288.17, cbt: 15280.25 },
  { periodo: "2020-10", cba: 6702.33, cbt: 16152.62 },
  { periodo: "2020-11", cba: 6981.61, cbt: 16755.86 },
  { periodo: "2020-12", cba: 7340.12, cbt: 17542.89 },
  { periodo: "2021-01", cba: 7677.09, cbt: 18271.47 },
  { periodo: "2021-02", cba: 7953.14, cbt: 18769.41 },
  { periodo: "2021-03", cba: 8312.33, cbt: 19700.22 },
  { periodo: "2021-04", cba: 8633.31, cbt: 20374.61 },
  { periodo: "2021-05", cba: 8874.89, cbt: 20855.99 },
  { periodo: "2021-06", cba: 9195.41, cbt: 21517.26 },
  { periodo: "2021-07", cba: 9386.04, cbt: 21869.47 },
  { periodo: "2021-08", cba: 9454.13, cbt: 22122.66 },
  { periodo: "2021-09", cba: 9713.21, cbt: 22826.04 },
  { periodo: "2021-10", cba: 10008.2, cbt: 23419.19 },
  { periodo: "2021-11", cba: 10266.79, cbt: 23921.62 },
  { periodo: "2021-12", cba: 10667.86, cbt: 24642.76 },
  { periodo: "2022-01", cba: 11111.27, cbt: 25444.81 },
  { periodo: "2022-02", cba: 12108.08, cbt: 27122.1 },
  { periodo: "2022-03", cba: 12900.45, cbt: 29026.01 },
  { periodo: "2022-04", cba: 13762.77, cbt: 30828.6 },
  { periodo: "2022-05", cba: 14400.84, cbt: 32257.88 },
  { periodo: "2022-06", cba: 15056.75, cbt: 33727.12 },
  { periodo: "2022-07", cba: 16008.28, cbt: 36018.63 },
  { periodo: "2022-08", cba: 17148.8, cbt: 38756.29 },
  { periodo: "2022-09", cba: 18359.84, cbt: 41493.24 },
  { periodo: "2022-10", cba: 20098.92, cbt: 45222.57 },
  { periodo: "2022-11", cba: 20715.93, cbt: 47232.32 },
  { periodo: "2022-12", cba: 21743.48, cbt: 49357.7 },
  { periodo: "2023-01", cba: 23315.04, cbt: 52925.14 },
  { periodo: "2023-02", cba: 26046.32, cbt: 57301.9 },
  { periodo: "2023-03", cba: 28388.12, cbt: 61886.1 },
  { periodo: "2023-04", cba: 30468.76, cbt: 65812.52 },
  { periodo: "2023-05", cba: 32055.87, cbt: 70522.91 },
  { periodo: "2023-06", cba: 33730.51, cbt: 75219.04 },
  { periodo: "2023-07", cba: 36130.15, cbt: 80570.23 },
  { periodo: "2023-08", cba: 42262.25, cbt: 92131.7 },
  { periodo: "2023-09", cba: 47858.79, cbt: 103372.83 },
  { periodo: "2023-10", cba: 51974.93, cbt: 111746.1 },
  { periodo: "2023-11", cba: 59886.86, cbt: 126361.27 },
  { periodo: "2023-12", cba: 77889.58, cbt: 160452.53 },
  { periodo: "2024-01", cba: 92414.67, cbt: 193146.66 },
  { periodo: "2024-02", cba: 104482.59, cbt: 223592.74 },
  { periodo: "2024-03", cba: 115873.35, cbt: 250286.44 },
  { periodo: "2024-04", cba: 120726.29, cbt: 268012.36 },
  { periodo: "2024-05", cba: 125235.49, cbt: 275518.08 },
  { periodo: "2024-06", cba: 127287.79, cbt: 282578.89 },
  { periodo: "2024-07", cba: 131293.57, cbt: 291471.7313915858 },
  { periodo: "2024-08", cba: 136399.3, cbt: 304170.44 },
  { periodo: "2024-09", cba: 138744.31, cbt: 312174.7 },
  { periodo: "2024-10", cba: 140653.57, cbt: 319283.6 },
  { periodo: "2024-11", cba: 142148.73, cbt: 324099.1 },
  { periodo: "2024-12", cba: 145408.96, cbt: 331532.43 },
  { periodo: "2025-01", cba: 146726.23, cbt: 334535.8 },
  { periodo: "2025-02", cba: 151491.17, cbt: 342370.04 },
  { periodo: "2025-03", cba: 160393.45, cbt: 356073.46 },
  { periodo: "2025-04", cba: 162553.77, cbt: 359243.83 },
  { periodo: "2025-05", cba: 161903.21, cbt: 359425.13 },
  { periodo: "2025-06", cba: 163756.66, cbt: 365177.35 },
  { periodo: "2025-07", cba: 166797.7, cbt: 371958.87 },
  { periodo: "2025-08", cba: 168456.04, cbt: 375656.97 },
  { periodo: "2025-09", cba: 170788.46, cbt: 380858.27 },
  { periodo: "2025-10", cba: 176150.29, cbt: 392815.15 },
  { periodo: "2025-11", cba: 183289.46, cbt: 406902.6 },
  { periodo: "2025-12", cba: 190780.09, cbt: 423531.8 },
  { periodo: "2026-01", cba: 201938.62, cbt: 440226.19 },
  { periodo: "2026-02", cba: 208442.85, cbt: 452320.98 },
  { periodo: "2026-03", cba: 212948.52, cbt: 464227.77 },
  { periodo: "2026-04", cba: 215227.62, cbt: 475653.04 },
  { periodo: "2026-05", cba: 220467.99, cbt: 485029.58 },
  { periodo: "2026-06", cba: 223253.29, cbt: 495622.3 },
  { periodo: "2026-07", cba: 229131.47, cbt: 506380.55 },
];

/** Último mes publicado por el INDEC. */
export const CANASTA_BASICA_ULTIMO: MesCanastaBasica = CANASTA_BASICA[CANASTA_BASICA.length - 1];

export const CANASTA_BASICA_FUENTE = {
  nombre:
    "INDEC — Valorización mensual de la canasta básica alimentaria y de la canasta básica total, Gran Buenos Aires",
  api: "https://apis.datos.gob.ar/series/api/series/?ids=150.1_CSTA_BARIA_0_D_26,150.1_CSTA_BATAL_0_D_20,150.1_LA_INDICIA_0_D_16,150.1_LA_POBREZA_0_D_13&format=json&limit=1000",
  informe: "https://www.indec.gob.ar/indec/web/Nivel4-Tema-4-43-149",
  serie: "https://www.indec.gob.ar/ftp/cuadros/sociedad/serie_cba_cbt.xls",
  metodologia: "https://www.indec.gob.ar/ftp/cuadros/sociedad/EPH_metodologia_22_pobreza.pdf",
  consultadoEl: "2026-08-15",
  ultimoPeriodo: "2026-07",
};
