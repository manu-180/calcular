// Supuestos con los que se corre la calculadora de cada país para la grilla. Son los mismos para todos
// los países y la página los tiene que mostrar: sin ellos la comparación no se entiende. Los textos
// en otros idiomas los pone el diccionario de la página a partir del id.
export interface SupuestoMundo {
  id: "persona" | "empleo" | "bruto" | "neto" | "defectos" | "ppa";
  es: string;
  en: string;
}

export const SUPUESTOS_MUNDO: readonly SupuestoMundo[] = [
  {
    id: "persona",
    es: "Una persona soltera, sin hijos ni otras personas a cargo.",
    en: "A single person with no children or other dependants.",
  },
  {
    id: "empleo",
    es: "Empleo formal en relación de dependencia, todo el año con el mismo empleador.",
    en: "A formal salaried job, all year with the same employer.",
  },
  {
    id: "bruto",
    es: "El bruto anual es todo lo que se cobra en el año: si la ley paga aguinaldo, 13.º o 14.º sueldo, el bruto se reparte en esas pagas.",
    en: "Gross pay is everything paid in the year: where the law adds a 13th or 14th salary, the annual gross is split across those payments.",
  },
  {
    id: "neto",
    es: "El neto es lo que queda después del impuesto a la renta y de los aportes de la persona. No incluye lo que paga el empleador.",
    en: "Net pay is what is left after income tax and the employee's own contributions. Employer contributions are not included.",
  },
  {
    id: "defectos",
    es: "Cada calculadora corre con sus valores por defecto y en su región por defecto, sin aportes voluntarios ni deducciones personales.",
    en: "Each calculator runs with its default values and default region, with no voluntary contributions or personal deductions.",
  },
  {
    id: "ppa",
    es: "Los montos se pasan entre países por paridad de poder adquisitivo del Banco Mundial (consumo privado), no por el tipo de cambio.",
    en: "Amounts are converted between countries with the World Bank's purchasing power parity for private consumption, not exchange rates.",
  },
];
