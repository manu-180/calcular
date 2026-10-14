import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflatie-berekenen";

const CBS = "https://opendata.cbs.nl/ODataApi/odata/86141NED/TypedDataSet?$filter=Bestedingscategorieen%20eq%20%27T001112%20%20%27&$select=Perioden,CPI_1" as const;

export default definirCasos(calculadora, [
  {
    nombre: "€ 1.000 van januari 2020 naar september 2026",
    origen: { tipo: "oficial", url: CBS, detalle: "CPI januari 2020 = 78,79; september 2026 = 104,43. 1.000 × 104,43 / 78,79 = 1.325,42; inflatie 32,54%. Twaalf maanden: 104,43 / 100,97 = 3,43%." },
    fecha: "2026-10-14",
    entrada: { bedrag: 1000, van: "2020-01-15", tot: "2026-10-14" },
    esperado: { nieuwBedrag: 1325.42, verschil: 325.42, indexBegin: 78.79, indexEind: 104.43, beginmaand: "januari 2020", eindmaand: "september 2026" },
  },
  {
    nombre: "€ 500 van januari 2015 naar januari 2025",
    origen: { tipo: "oficial", url: CBS, detalle: "CPI januari 2015 = 72,98; januari 2025 = 97,6. 500 × 97,6 / 72,98 = 668,68." },
    fecha: "2026-10-14",
    entrada: { bedrag: 500, van: "2015-01-01", tot: "2025-01-31" },
    esperado: { nieuwBedrag: 668.68 },
  },
  {
    nombre: "Begindatum na de einddatum",
    origen: { tipo: "recalculado", detalle: "Ongeldige invoer." },
    fecha: "2026-10-14",
    entrada: { bedrag: 100, van: "2026-05-01", tot: "2024-01-01" },
    esperaError: true,
  },
]);
