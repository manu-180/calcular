// Impuesto a las Ganancias 4ta categoría (empleados en relación de dependencia).
// Valores del 2do semestre 2026 (vigencia julio–diciembre), verificados contra los PDF
// OFICIALES de ARCA el 29/7/2026 (RG 4.003 art. 7 inc. b).
// Rotación de julio: deducciones y escala subieron por el factor 1,084230 = medio coeficiente
// semestral del IPC (1,16846), porque la actualización alcanza solo al 2do semestre del año.
// Chequeado: apdo. 2 = 4,8 × MNI, y cada "fijo" de la escala = fijo anterior + tramo × alícuota.
// Se actualizan SEMESTRALMENTE (enero y julio) por el IPC INDEC del semestre anterior — NO
// mensual. Rotar cada enero/julio.
// La Ley 27.802 (B.O. 6/3/2026) NO modificó el cálculo del sueldo (verificado: solo
// tocó art. 26 inc. h plazo fijo, art. 85 inc. k alquileres y art. 57 hacienda).

export const GANANCIAS_VIGENCIA = "2do semestre 2026 (julio a diciembre)";

// Deducciones personales art. 30 LIG — importes ANUALES.
export const DEDUCCIONES = {
  mni: 5_585_736.93, // ganancia no imponible — inc. a)
  conyuge: 5_260_643.86, // inc. b.1)
  hijo: 2_652_961.9, // inc. b.2)
  hijoIncapacitado: 5_305_923.78, // inc. b.2.1)
  // Apdo 2 (relación de dependencia) = 4,8 × MNI. Es la deducción que, sumada al MNI,
  // define el piso a partir del cual un empleado empieza a tributar.
  deduccionEspecialDependencia: 26_811_537.29,
  // Apdo 1 (autónomos que trabajan personalmente) = 3,5 × MNI; "nuevos profesionales/emprendedores"
  // = 4 × MNI. Salen del mismo PDF de ARCA y rotan con el resto de este objeto.
  deduccionEspecialAutonomos: 19_550_079.27,
  deduccionEspecialNuevosProfesionales: 22_342_947.74,
};

export type TramoGanancias = {
  desde: number;
  hasta: number | null; // null = último tramo (sin tope)
  fijo: number; // monto fijo que paga al entrar al tramo
  alicuota: number; // fracción aplicada sobre el excedente (0,05 = 5%)
  excedenteSobre: number; // piso sobre el que se mide el excedente (= desde)
};

// Escala art. 94 LIG — 2do semestre 2026, valores ANUALES (9 tramos, 5% → 35%).
export const ESCALA_GANANCIAS: TramoGanancias[] = [
  { desde: 0, hasta: 2_168_491.89, fijo: 0, alicuota: 0.05, excedenteSobre: 0 },
  { desde: 2_168_491.89, hasta: 4_336_983.77, fijo: 108_424.59, alicuota: 0.09, excedenteSobre: 2_168_491.89 },
  { desde: 4_336_983.77, hasta: 6_505_475.65, fijo: 303_588.86, alicuota: 0.12, excedenteSobre: 4_336_983.77 },
  { desde: 6_505_475.65, hasta: 9_758_213.49, fijo: 563_807.89, alicuota: 0.15, excedenteSobre: 6_505_475.65 },
  { desde: 9_758_213.49, hasta: 19_516_426.99, fijo: 1_051_718.57, alicuota: 0.19, excedenteSobre: 9_758_213.49 },
  { desde: 19_516_426.99, hasta: 29_274_640.48, fijo: 2_905_779.13, alicuota: 0.23, excedenteSobre: 19_516_426.99 },
  { desde: 29_274_640.48, hasta: 43_911_960.73, fijo: 5_150_168.23, alicuota: 0.27, excedenteSobre: 29_274_640.48 },
  { desde: 43_911_960.73, hasta: 65_867_941.1, fijo: 9_102_244.7, alicuota: 0.31, excedenteSobre: 43_911_960.73 },
  { desde: 65_867_941.1, hasta: null, fijo: 15_908_598.62, alicuota: 0.35, excedenteSobre: 65_867_941.1 },
];

export const GANANCIAS_FUENTES = {
  deducciones: {
    nombre: "ARCA — Deducciones personales art. 30 LIG (julio a diciembre 2026)",
    url: "https://www.afip.gob.ar/gananciasYBienes/ganancias/personas-humanas-sucesiones-indivisas/deducciones/documentos/Deducciones-personales-art-30-jul-dic-2026.pdf",
  },
  escala: {
    nombre: "ARCA — Tabla escala art. 94 LIG (julio a diciembre 2026)",
    url: "https://www.afip.gob.ar/gananciasYBienes/ganancias/personas-humanas-sucesiones-indivisas/declaracion-jurada/documentos/Tabla-Art-94-LIG-per-jul-a-dic-2026.pdf",
  },
  consultadoEl: "29 de julio de 2026",
};
