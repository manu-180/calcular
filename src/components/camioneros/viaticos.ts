// Viáticos y adicionales por viaje del CCT 40/89, leídos de la hoja 2 («Viáticos y otros adicionales que
// conforman los salarios») de la planilla firmada de OCTUBRE 2026 (página 4 del PDF de sep-26 a feb-27).
// Se transcribe un solo mes: la planilla paga los trae como celdas editables y avisa que son de ese mes.
// Los cuatro valores suben con el mismo factor que los básicos (oct/sep = 1,028187): así se verificó.
//
// El motor del sitio (calcularCamioneros) no los usa: la calculadora gratis no pregunta kilómetros. Por
// eso viven acá y no en src/data — si la calculadora los suma algún día, se mudan a
// src/data/convenios/camioneros.ts junto a ESCALAS_POR_MES.

export const VIATICOS_CAMIONEROS = {
  mesId: "octubre-2026",
  etiquetaMes: "Octubre 2026",
  planilla: "https://www.fadeeac.org.ar/wp-content/uploads/2026/10/3-Planillas-salariales-acuerdo-SEPT-2026-a-FEB-2027.pdf",
  consultadoEl: "2026-10-10",
  /** Ítem 4.2.3 (horas extraordinarias por km, remunerativo) e ítem 4.2.4 (viático por km, no remunerativo): mismo valor por km. */
  porKm: 90.09389,
  comida: 17_231.89,
  viaticoEspecial: 8_646.93,
  pernoctada: 20_070.36,
  /** Ítem 4.2.4: «no podrá ser inferior a 350 km por día por persona en viaje». */
  kmMinimoPorDia: 350,
} as const;

// Coeficientes por residencia del trabajador (notas (1) y (2) de la planilla firmada): corren sobre los
// ítems 4.2.3 y 4.2.4 y suben en la misma proporción comida, viático especial y pernoctada.
export const ZONAS_CAMIONEROS = [
  { id: "general", nombre: "General", coeficiente: 1 },
  { id: "sur-colorado", nombre: "Sur del Río Colorado", coeficiente: 1.2 },
  { id: "sur-santa-cruz", nombre: "Sur del Río Santa Cruz", coeficiente: 1.4 },
] as const;
