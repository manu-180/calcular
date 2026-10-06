// Viáticos y adicionales por viaje del CCT 40/89, leídos de la hoja 2 («Viáticos y otros adicionales que
// conforman los salarios») de la planilla firmada de AGOSTO 2026. Es la única planilla de la que se
// transcribieron: la planilla paga los trae como celdas editables y avisa que son de ese mes.
//
// El motor del sitio (calcularCamioneros) no los usa: la calculadora gratis no pregunta kilómetros. Por
// eso viven acá y no en src/data — si la calculadora los suma algún día, se mudan a
// src/data/convenios/camioneros.ts junto a ESCALAS_POR_MES.

export const VIATICOS_CAMIONEROS = {
  mesId: "agosto-2026",
  etiquetaMes: "Agosto 2026",
  planilla: "https://www.fadeeac.org.ar/wp-content/uploads/2026/08/Planillas-de-escalas-salariales-agosto-2026-OK.pdf",
  consultadoEl: "2026-10-06",
  /** Ítem 4.2.3 (horas extraordinarias por km, remunerativo) e ítem 4.2.4 (viático por km, no remunerativo): mismo valor por km. */
  porKm: 86.07469,
  comida: 16_463.15,
  viaticoEspecial: 8_261.18,
  pernoctada: 19_175,
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
