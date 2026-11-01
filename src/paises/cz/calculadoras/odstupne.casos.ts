import { definirCasos } from "@/motor/calculo";
import odstupne from "./odstupne";

const ZP = "https://www.zakonyprolidi.cz/cs/2006-262";

export default definirCasos(odstupne, [
  {
    nombre: "Pracovní poměr 3 roky, nadbytečnost",
    origen: { tipo: "recalculado", url: ZP, detalle: "§ 67 odst. 1 písm. c): trojnásobek. 45 000 × 3 = 135 000 Kč." },
    fecha: "2026-10-24",
    entrada: { vydelek: 45000, duvod: "organizacni", roky: 3 },
    esperado: { odstupne: 135000, nasobek: 3 },
  },
  {
    nombre: "Kratší než rok",
    origen: { tipo: "recalculado", url: ZP, detalle: "§ 67 odst. 1 písm. a): jednonásobek." },
    fecha: "2026-10-24",
    entrada: { vydelek: 45000, duvod: "organizacni", roky: 0.5 },
    esperado: { odstupne: 45000, nasobek: 1 },
  },
  {
    nombre: "Rok a půl",
    origen: { tipo: "recalculado", url: ZP, detalle: "§ 67 odst. 1 písm. b): dvojnásobek." },
    fecha: "2026-10-24",
    entrada: { vydelek: 45000, duvod: "organizacni", roky: 1.5 },
    esperado: { odstupne: 90000, nasobek: 2 },
  },
  {
    nombre: "Pracovní úraz",
    origen: { tipo: "recalculado", url: ZP, detalle: "§ 67 odst. 3: dvanáctinásobek. 45 000 × 12 = 540 000 Kč." },
    fecha: "2026-10-24",
    entrada: { vydelek: 45000, duvod: "uraz", roky: 5 },
    esperado: { odstupne: 540000, nasobek: 12 },
  },
  {
    nombre: "Bez výdělku",
    origen: { tipo: "recalculado", url: ZP, detalle: "Bez průměrného výdělku nelze odstupné spočítat." },
    fecha: "2026-10-24",
    entrada: { vydelek: 0, duvod: "organizacni", roky: 3 },
    esperaError: true,
  },
]);
