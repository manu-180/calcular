import { definirCasos } from "@/motor/calculo";
import infliacija from "./infliacijos-skaiciuokle";

const U = "https://osp-rs.stat.gov.lt/rest_xml/data/S7R330_M2020121_2/?startPeriod=2026-01";

export default definirCasos(infliacija, [
  {
    nombre: "1000 eurų nuo 2020 m. sausio iki 2026 m. rugsėjo",
    origen: { tipo: "recalculado", url: U, detalle: "VKI 2020-01 = 70,0781, 2026-09 = 106,9034. 1000 × 106,9034 / 70,0781 = 1525,49." },
    fecha: "2026-11-01",
    entrada: { suma: 1000, nuo: "2020-01-15", iki: "2026-09-30" },
    esperado: { dabar: 1525.49, skirtumas: 525.49 },
  },
  {
    nombre: "Metinis pokytis nuo 2025-09 iki 2026-09",
    origen: { tipo: "recalculado", url: U, detalle: "100 × 106,9034 / 100,1516 = 106,74." },
    fecha: "2026-11-01",
    entrada: { suma: 100, nuo: "2025-09-01", iki: "2026-09-01" },
    esperado: { dabar: 106.74 },
  },
  {
    nombre: "Pradžia vėlesnė už pabaigą",
    origen: { tipo: "recalculado", url: U, detalle: "Pradžios mėnuo turi būti ankstesnis už pabaigos mėnesį." },
    fecha: "2026-11-01",
    entrada: { suma: 100, nuo: "2026-05-01", iki: "2026-01-01" },
    esperaError: true,
  },
]);
