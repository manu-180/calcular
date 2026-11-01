import { definirCasos } from "@/motor/calculo";
import inflacniKalkulacka from "./inflacni-kalkulacka";

const CSU = "https://data.csu.gov.cz/opendata/sady/CEN0101E/distribuce/csv";

export default definirCasos(inflacniKalkulacka, [
  {
    nombre: "10 000 Kč z ledna 2020 v cenách září 2026",
    origen: { tipo: "oficial", url: CSU, detalle: "ČSÚ, bazický index 2015 = 100: leden 2020 111,0; září 2026 159,2. 10 000 × 159,2 / 111,0 = 14 342,34 Kč, inflace 43,4 %." },
    fecha: "2026-10-24",
    entrada: { castka: 10000, od: "2020-01-01", do: "2026-10-24" },
    esperado: { dnes: 14342.34, rozdil: 4342.34, celkem: 43.42, mesicDo: "září 2026" },
    tolerancia: 0.01,
  },
  {
    nombre: "Meziroční inflace září 2026",
    origen: { tipo: "oficial", url: CSU, detalle: "Září 2025 155,3; září 2026 159,2: 1 000 × 159,2 / 155,3 = 1 025,11 Kč (2,5 %)." },
    fecha: "2026-10-24",
    entrada: { castka: 1000, od: "2025-09-15", do: "2026-09-30" },
    esperado: { dnes: 1025.11, mesicOd: "září 2025" },
  },
  {
    nombre: "Měsíc před začátkem řady",
    origen: { tipo: "recalculado", url: CSU, detalle: "Řada začíná lednem 2015." },
    fecha: "2026-10-24",
    entrada: { castka: 1000, od: "2014-06-01", do: "2026-09-01" },
    esperaError: true,
  },
]);
