// Escalas UOCRA (CCT 76/75) de junio 2024 a marzo 2026: el histórico que necesita quien reclama
// diferencias salariales. Lo pidió una compradora el 19/10/2026 (oficial mal registrado desde
// junio 2024): la planilla sólo arrancaba en abril 2026 y no le servía.
//
// Cada valor sale del Anexo I del acuerdo FIRMADO que publica CAMARCO (columna "Total" de cada
// zona, con el adicional ya sumado). Varios PDFs son escaneos con OCR: ningún mes se cargó sin que
// scripts/check_uocra_historico.ts reproduzca su tabla desde el mes anterior con el porcentaje
// que fija el acuerdo (±$2 por el redondeo de la tabla oficial). Si un dígito quedó mal, ese
// check se pone rojo.
//
// Meses sin acuerdo propio: julio 2024 (el acuerdo del 23/4/2024 vencía el 30/6 y el de agosto
// aplica el 5% "sobre los salarios básicos vigentes al 30 de junio 2024") y abril 2025 (el de
// enero vencía el 31/3 y el de mayo aplica el aumento "sobre los salarios básicos vigentes al
// 31 de marzo 2025"). En los dos rige la tabla del mes anterior, sin suma no remunerativa.
//
// Las sumas no remunerativas fijas iguales para todas las categorías (bono de $150.000 de
// nov-2024 a ene-2025 y $20.000 de feb y mar 2025) se cargan en el mes en que se pagan.

import type { CategoriaUocraId, MesUocra, ZonaUocraId } from "./uocra";

type Zonas = Record<ZonaUocraId, number>;
type Fila = [number, number, number, number];

const z = ([a, b, c, ca]: Fila): Zonas => ({ a, b, c, "c-austral": ca });

const plano = (monto: number): Record<CategoriaUocraId, Zonas> => {
  const zonas = z([monto, monto, monto, monto]);
  return {
    "oficial-especializado": zonas,
    oficial: zonas,
    "medio-oficial": zonas,
    ayudante: zonas,
    sereno: zonas,
  };
};

const porCategoria = (s: { esp: Fila; of: Fila; medio: Fila; ayud: Fila }): Record<CategoriaUocraId, Zonas> => ({
  "oficial-especializado": z(s.esp),
  oficial: z(s.of),
  "medio-oficial": z(s.medio),
  ayudante: z(s.ayud),
  // Actas complementarias del 29/5/2025 y siguientes: el sereno cobra la misma SNR que el ayudante.
  sereno: z(s.ayud),
});

type Tabla = { esp: Fila; of: Fila; medio: Fila; ayud: Fila; sereno: Fila };

function mes(
  id: string,
  etiqueta: string,
  m: number,
  anio: number,
  t: Tabla,
  snr: Record<CategoriaUocraId, Zonas>,
  cambios: string,
): MesUocra {
  return {
    id,
    etiqueta,
    mes: m,
    anio,
    cambios,
    jornales: {
      "oficial-especializado": z(t.esp),
      oficial: z(t.of),
      "medio-oficial": z(t.medio),
      ayudante: z(t.ayud),
    },
    serenoMensual: z(t.sereno),
    snr,
  };
}

const JUN_24: Tabla = {
  esp: [3613, 4011, 5547, 7226],
  of: [3079, 3420, 5181, 6158],
  medio: [2839, 3147, 4988, 5678],
  ayud: [2606, 2906, 4831, 5213],
  sereno: [472871, 526819, 790575, 945786],
};
const MAR_25: Tabla = {
  esp: [4741, 5262, 7278, 9482],
  of: [4056, 4504, 6824, 8111],
  medio: [3748, 4154, 6585, 7496],
  ayud: [3450, 3846, 6394, 6899],
  sereno: [626681, 698150, 1047675, 1253362],
};

const SIN_SNR = plano(0);
const SNR_MAY_JUN_25 = porCategoria({
  esp: [40000, 44400, 74100, 80000],
  of: [38000, 42200, 70400, 76000],
  medio: [34000, 37700, 63000, 68000],
  ayud: [33000, 36600, 61200, 66000],
});
const SNR_JUL_AGO_25 = porCategoria({
  esp: [48000, 53200, 89000, 96000],
  of: [46000, 51000, 85300, 92000],
  medio: [42000, 46600, 77900, 84000],
  ayud: [40000, 44400, 74200, 80000],
});
const SNR_SEP_OCT_25 = porCategoria({
  esp: [74200, 82400, 137600, 148400],
  of: [71000, 78800, 131700, 142000],
  medio: [64900, 72000, 120400, 129800],
  ayud: [61800, 68600, 114600, 123600],
});
const SNR_NOV_DIC_25 = porCategoria({
  esp: [103300, 114700, 158600, 206600],
  of: [96200, 106800, 147700, 192400],
  medio: [88100, 97800, 135200, 176200],
  ayud: [83200, 92400, 127700, 166400],
});
const SNR_ENE_FEB_26 = porCategoria({
  esp: [121800, 135200, 187000, 243600],
  of: [112200, 124600, 172300, 224400],
  medio: [102800, 114100, 157800, 205600],
  ayud: [96800, 107500, 148600, 193600],
});
const SNR_MAR_26 = porCategoria({
  esp: [147000, 163200, 225700, 294000],
  of: [134100, 148900, 206000, 268200],
  medio: [123000, 136500, 188800, 246000],
  ayud: [115500, 128300, 177300, 231000],
});

export const MESES_UOCRA_HISTORICO: MesUocra[] = [
  mes("junio-2024", "Junio 2024", 6, 2024, JUN_24, SIN_SNR,
    "+11% sobre los básicos de mayo (acuerdo del 23/4/2024, tercer mes del tramo abril-junio)."),
  mes("julio-2024", "Julio 2024", 7, 2024, JUN_24, SIN_SNR,
    "Sin acuerdo para julio: rige la tabla de junio. El acuerdo de agosto aplica el aumento sobre los básicos vigentes al 30/6/2024."),
  mes("agosto-2024", "Agosto 2024", 8, 2024, {
    esp: [3794, 4211, 5825, 7588],
    of: [3233, 3591, 5440, 6466],
    medio: [2981, 3304, 5238, 5962],
    ayud: [2736, 3052, 5072, 5474],
    sereno: [496514, 553160, 830103, 993075],
  }, SIN_SNR, "+5% sobre los básicos de junio (acuerdo del 21/8/2024, homologado por DI-2024-2018-APN-DNRYRT#MT)."),
  mes("septiembre-2024", "Septiembre 2024", 9, 2024, {
    esp: [3946, 4380, 6058, 7891],
    of: [3362, 3734, 5658, 6725],
    medio: [3100, 3436, 5447, 6200],
    ayud: [2846, 3174, 5275, 5692],
    sereno: [516375, 575287, 863308, 1032798],
  }, SIN_SNR, "+4% acumulativo sobre agosto (acuerdo del 21/8/2024)."),
  mes("octubre-2024", "Octubre 2024", 10, 2024, {
    esp: [4104, 4555, 6300, 8207],
    of: [3497, 3884, 5884, 6994],
    medio: [3224, 3573, 5665, 6448],
    ayud: [2960, 3301, 5486, 5920],
    sereno: [537030, 598298, 897840, 1074110],
  }, SIN_SNR, "+4% sobre septiembre (acuerdo de octubre 2024, tramo octubre-diciembre)."),
  mes("noviembre-2024", "Noviembre 2024", 11, 2024, {
    esp: [4268, 4737, 6552, 8535],
    of: [3637, 4039, 6119, 7274],
    medio: [3353, 3716, 5892, 6706],
    ayud: [3078, 3433, 5706, 6157],
    sereno: [558511, 622230, 933753, 1117075],
  }, plano(50000), "+4% acumulativo sobre octubre. Bono no remunerativo de $50.000 en dos cuotas, igual para todas las categorías (1ª parte del bono de $150.000)."),
  mes("diciembre-2024", "Diciembre 2024", 12, 2024, {
    esp: [4439, 4927, 6814, 8877],
    of: [3782, 4201, 6364, 7565],
    medio: [3487, 3865, 6127, 6974],
    ayud: [3201, 3570, 5934, 6403],
    sereno: [580851, 647119, 971104, 1161758],
  }, plano(50000), "+4% acumulativo sobre noviembre. Bono no remunerativo de $50.000 (2ª parte)."),
  mes("enero-2025", "Enero 2025", 1, 2025, {
    esp: [4519, 5015, 6937, 9036],
    of: [3850, 4276, 6479, 7701],
    medio: [3550, 3935, 6238, 7100],
    ayud: [3259, 3634, 6041, 6519],
    sereno: [591307, 658767, 988583, 1182669],
  }, plano(50000), "+1,8% sobre diciembre (acuerdo del 14/2/2025). Se paga la 3ª parte del bono de $50.000 del acuerdo anterior."),
  mes("febrero-2025", "Febrero 2025", 2, 2025, {
    esp: [4694, 5210, 7206, 9388],
    of: [4015, 4460, 6756, 8031],
    medio: [3711, 4113, 6520, 7421],
    ayud: [3415, 3808, 6330, 6831],
    sereno: [620476, 691238, 1037302, 1240953],
  }, plano(20000), "+1,5% acumulativo, con recomposición (acuerdo del 14/2/2025). Suma no remunerativa de $20.000 igual para todas las categorías."),
  mes("marzo-2025", "Marzo 2025", 3, 2025, MAR_25, plano(20000),
    "+1% acumulativo sobre febrero. Suma no remunerativa de $20.000 igual para todas las categorías."),
  mes("abril-2025", "Abril 2025", 4, 2025, MAR_25, SIN_SNR,
    "Sin acuerdo para abril: rige la tabla de marzo. El acuerdo del 28/5/2025 calcula mayo sobre los básicos vigentes al 31/3/2025."),
  mes("mayo-2025", "Mayo 2025", 5, 2025, {
    esp: [4846, 5379, 7439, 9691],
    of: [4145, 4604, 6975, 8291],
    medio: [3831, 4246, 6731, 7661],
    ayud: [3526, 3931, 6535, 7052],
    sereno: [640543, 713593, 1070849, 1281087],
  }, SNR_MAY_JUN_25, "+1,2% y +1% acumulativos sobre marzo (acuerdo del 28/5/2025). Vuelve la suma no remunerativa, ahora distinta por categoría y zona."),
  mes("junio-2025", "Junio 2025", 6, 2025, {
    esp: [4894, 5433, 7514, 9788],
    of: [4187, 4650, 7044, 8374],
    medio: [3869, 4289, 6798, 7738],
    ayud: [3561, 3971, 6600, 7122],
    sereno: [646949, 720729, 1081558, 1293897],
  }, SNR_MAY_JUN_25, "+1% acumulativo sobre mayo. Misma suma no remunerativa que mayo."),
  mes("julio-2025", "Julio 2025", 7, 2025, {
    esp: [4948, 5492, 7596, 9896],
    of: [4233, 4701, 7122, 8466],
    medio: [3912, 4336, 6873, 7823],
    ayud: [3600, 4014, 6673, 7201],
    sereno: [654065, 728657, 1093455, 1308130],
  }, SNR_JUL_AGO_25, "+1,1% sobre junio (acuerdo del 11/7/2025, homologado por DI-2025-1734-APN-DNRYRT#MCH). Sube la suma no remunerativa."),
  mes("agosto-2025", "Agosto 2025", 8, 2025, {
    esp: [5002, 5553, 7680, 10005],
    of: [4279, 4753, 7200, 8559],
    medio: [3955, 4384, 6948, 7909],
    ayud: [3640, 4059, 6746, 7280],
    sereno: [661260, 736673, 1105483, 1322520],
  }, SNR_JUL_AGO_25, "+1,1% acumulativo sobre julio. Misma suma no remunerativa que julio."),
  mes("septiembre-2025", "Septiembre 2025", 9, 2025, {
    esp: [5067, 5625, 7780, 10135],
    of: [4335, 4815, 7294, 8670],
    medio: [4006, 4441, 7039, 8012],
    ayud: [3687, 4111, 6834, 7374],
    sereno: [669856, 746249, 1119854, 1339713],
  }, SNR_SEP_OCT_25, "+1,3% sobre agosto (acuerdo de septiembre 2025). Sube la suma no remunerativa."),
  mes("octubre-2025", "Octubre 2025", 10, 2025, {
    esp: [5128, 5692, 7873, 10257],
    of: [4387, 4872, 7381, 8774],
    medio: [4054, 4494, 7123, 8108],
    ayud: [3731, 4161, 6916, 7463],
    sereno: [677895, 755204, 1133293, 1355789],
  }, SNR_SEP_OCT_25, "+1,2% acumulativo sobre septiembre. Misma suma no remunerativa."),
  mes("noviembre-2025", "Noviembre 2025", 11, 2025, {
    esp: [5200, 5772, 7983, 10400],
    of: [4449, 4941, 7485, 8898],
    medio: [4111, 4557, 7223, 8222],
    ayud: [3784, 4219, 7013, 7568],
    sereno: [687385, 765777, 1149159, 1374770],
  }, SNR_NOV_DIC_25, "+1,4% sobre octubre (acuerdo del 14/11/2025, homologado por Disp. 2639/2025). Sube la suma no remunerativa."),
  mes("diciembre-2025", "Diciembre 2025", 12, 2025, {
    esp: [5268, 5847, 8087, 10536],
    of: [4506, 5004, 7582, 9012],
    medio: [4164, 4616, 7316, 8328],
    ayud: [3833, 4274, 7104, 7666],
    sereno: [696321, 775732, 1164098, 1392642],
  }, SNR_NOV_DIC_25, "+1,3% acumulativo sobre noviembre. Misma suma no remunerativa."),
  mes("enero-2026", "Enero 2026", 1, 2026, {
    esp: [5373, 5964, 8249, 10746],
    of: [4596, 5105, 7734, 9193],
    medio: [4248, 4708, 7463, 8495],
    ayud: [3910, 4359, 7246, 7819],
    sereno: [710248, 791247, 1187380, 1420495],
  }, SNR_ENE_FEB_26, "+2% sobre diciembre (acuerdo del 12/1/2026, homologado por DI-2026-76-APN-DNRYRT#MCH). Sube la suma no remunerativa."),
  mes("febrero-2026", "Febrero 2026", 2, 2026, {
    esp: [5470, 6071, 8397, 10940],
    of: [4679, 5196, 7873, 9358],
    medio: [4324, 4793, 7597, 8648],
    ayud: [3980, 4438, 7377, 7960],
    sereno: [723032, 805489, 1208753, 1446064],
  }, SNR_ENE_FEB_26, "+1,8% acumulativo sobre enero. Misma suma no remunerativa."),
  mes("marzo-2026", "Marzo 2026", 3, 2026, {
    esp: [5579, 6193, 8565, 11158],
    of: [4773, 5300, 8030, 9545],
    medio: [4411, 4889, 7749, 8821],
    ayud: [4060, 4527, 7524, 8119],
    sereno: [737493, 821599, 1232928, 1474985],
  }, SNR_MAR_26, "+2% sobre febrero (acuerdo del 31/3/2026, primer mes del tramo marzo-mayo). Sube la suma no remunerativa; en abril una parte se absorbe al básico."),
];

// Aumento que cada acuerdo fija para ese mes sobre el mes anterior (1 = sin aumento). Lo usa
// scripts/check_uocra_historico.ts para reproducir cada tabla. Mayo 2025 lleva dos aumentos
// acumulativos sobre marzo (abril no tuvo). Abril 2026 absorbe parte de la SNR: no se deriva.
export const AUMENTO_SOBRE_MES_ANTERIOR: Record<string, number> = {
  "julio-2024": 1,
  "agosto-2024": 1.05,
  "septiembre-2024": 1.04,
  "octubre-2024": 1.04,
  "noviembre-2024": 1.04,
  "diciembre-2024": 1.04,
  "enero-2025": 1.018,
  "febrero-2025": 1.015,
  "marzo-2025": 1.01,
  "abril-2025": 1,
  "mayo-2025": 1.012 * 1.01,
  "junio-2025": 1.01,
  "julio-2025": 1.011,
  "agosto-2025": 1.011,
  "septiembre-2025": 1.013,
  "octubre-2025": 1.012,
  "noviembre-2025": 1.014,
  "diciembre-2025": 1.013,
  "enero-2026": 1.02,
  "febrero-2026": 1.018,
  "marzo-2026": 1.02,
};

// Febrero 2025 aplica el 1,5% "sobre los salarios conformados vigentes al 31 de enero": antes del
// aumento la tabla incorpora al básico ~$20.000 mensuales (≈ $105,6 por hora en zona A, escalado
// por el adicional de cada zona). Sin esto la tabla de febrero parece un 4,3% y no un 1,5%.
export const INCORPORADO_ANTES_DEL_AUMENTO: Record<string, { porHoraZonaA: number; serenoZonaA: number }> = {
  "febrero-2025": { porHoraZonaA: 105.6, serenoZonaA: 20_000 },
};

export const UOCRA_FUENTES_HISTORICO: { nombre: string; url: string }[] = [
  { nombre: "Acuerdo UOCRA-CAMARCO 23/4/2024 (abril-junio 2024), PDF firmado", url: "https://www.camarco.org.ar/wp-content/uploads/2024/04/Acuerdo-paritario-Abril-2024.pdf" },
  { nombre: "Acuerdo UOCRA-CAMARCO 21/8/2024 (agosto-septiembre 2024)", url: "https://www.camarco.org.ar/wp-content/uploads/2024/08/Acuerdo-Salarial-UOCRA-Agosto-2024.pdf" },
  { nombre: "Homologación del acuerdo de agosto 2024 (DI-2024-2018-APN-DNRYRT#MT), InfoLEG", url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/405000-409999/406442/disp2018cct.pdf" },
  { nombre: "Acuerdo UOCRA-CAMARCO octubre-diciembre 2024 y bono de $150.000", url: "https://www.camarco.org.ar/wp-content/uploads/2024/11/NCO-119-24-ADJ-Ac-UOCRA.pdf" },
  { nombre: "Acuerdo UOCRA-CAMARCO 14/2/2025 (enero-marzo 2025)", url: "https://www.camarco.org.ar/wp-content/uploads/2025/02/CI-004-24-ADJ-Ac-UOCRA-Ene25-1.pdf" },
  { nombre: "Acuerdo UOCRA-CAMARCO 28/5/2025 (mayo-junio 2025)", url: "https://www.camarco.org.ar/wp-content/uploads/2025/05/NCO-043-25-ADJ-Ac-UOCRA-Mayo2025.pdf" },
  { nombre: "Acta complementaria 29/5/2025 (SNR del sereno)", url: "https://www.camarco.org.ar/wp-content/uploads/2025/06/ACTA-COMPLEMENTARIA-UOCRA-CCT-76-75-y-577-10.pdf" },
  { nombre: "Acuerdo UOCRA-CAMARCO 11/7/2025 (julio-agosto 2025)", url: "https://www.camarco.org.ar/wp-content/uploads/2025/07/CI-045-25-ADJ-Ac-UOCRA-Julio2025.pdf" },
  { nombre: "Homologación del acuerdo de julio 2025 (DI-2025-1734-APN-DNRYRT#MCH), InfoLEG", url: "https://servicios.infoleg.gob.ar/infolegInternet/anexos/420000-424999/420173/disp1734.pdf" },
  { nombre: "Acuerdo UOCRA-CAMARCO septiembre-octubre 2025", url: "https://www.camarco.org.ar/wp-content/uploads/2025/10/NCO-101-25-ADJ-Ac-UOCRA-Sep-Oct2025-1.pdf" },
  { nombre: "Acuerdo UOCRA-CAMARCO 14/11/2025 (noviembre-diciembre 2025)", url: "https://www.camarco.org.ar/wp-content/uploads/2025/11/CI-085-25-ADJ-Ac-UOCRA-Nov25.pdf" },
  { nombre: "Acuerdo UOCRA-CAMARCO 12/1/2026 (enero-febrero 2026)", url: "https://www.camarco.org.ar/wp-content/uploads/2026/01/CI-004-26-ADJ-Ac-UOCRA-ENE-FEB26.pdf" },
  { nombre: "Acuerdo UOCRA-CAMARCO 31/3/2026 (marzo-mayo 2026)", url: "https://www.camarco.org.ar/wp-content/uploads/2026/04/76.75-31.3.pdf" },
];

export const UOCRA_HISTORICO_CONSULTADO_EL = "20 de octubre de 2026";
