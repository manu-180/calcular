import { definirCasos } from "@/motor/calculo";
import dohodaOProvedeniPrace from "./dohoda-o-provedeni-prace";

const ZDP = "https://www.zakonyprolidi.cz/cs/1992-586";

export default definirCasos(dohodaOProvedeniPrace, [
  {
    nombre: "10 000 Kč bez prohlášení: srážková daň",
    origen: { tipo: "recalculado", url: ZDP, detalle: "§ 6 odst. 4 a § 36 odst. 2 písm. m): pod 12 000 Kč bez prohlášení srážková daň 15 % = 1 500; bez pojištění. Čistá 8 500." },
    fecha: "2026-10-24",
    entrada: { odmena: 10000, prohlaseni: false },
    esperado: { dan: 1500, socialni: 0, zdravotni: 0, cista: 8500, naklady: 10000 },
  },
  {
    nombre: "10 000 Kč s prohlášením",
    origen: { tipo: "recalculado", url: ZDP, detalle: "Záloha 1 500 − sleva 2 570 = 0. Čistá 10 000." },
    fecha: "2026-10-24",
    entrada: { odmena: 10000, prohlaseni: true },
    esperado: { dan: 0, cista: 10000 },
  },
  {
    nombre: "15 000 Kč bez prohlášení: pojištění a záloha",
    origen: {
      tipo: "recalculado",
      url: "https://www.cssz.gov.cz/-/prehled-nejdulezitejsich-udaju-pro-socialni-zabezpeceni-v-roce-2026",
      detalle: "Rozhodný příjem pro DPP 12 000 Kč. Sociální 1 065, zdravotní 2 025 / 3 = 675, záloha 15 % = 2 250. Čistá 11 010; zaměstnavatel 15 000 + 3 720 + 1 350 = 20 070.",
    },
    fecha: "2026-10-24",
    entrada: { odmena: 15000, prohlaseni: false },
    esperado: { socialni: 1065, zdravotni: 675, dan: 2250, cista: 11010, naklady: 20070 },
  },
  {
    nombre: "15 000 Kč s prohlášením",
    origen: { tipo: "recalculado", url: ZDP, detalle: "Záloha 2 250 se celá pokryje slevou 2 570. Čistá 15 000 − 1 065 − 675 = 13 260." },
    fecha: "2026-10-24",
    entrada: { odmena: 15000, prohlaseni: true },
    esperado: { dan: 0, cista: 13260 },
  },
  {
    nombre: "11 999 Kč těsně pod hranicí",
    origen: { tipo: "recalculado", url: ZDP, detalle: "Srážková daň 15 % z 11 999 = 1 799,85, zaokrouhleno dolů na 1 799. Čistá 10 200." },
    fecha: "2026-10-24",
    entrada: { odmena: 11999, prohlaseni: false },
    esperado: { dan: 1799, cista: 10200 },
  },
  {
    nombre: "Nulová odměna",
    origen: { tipo: "recalculado", url: ZDP, detalle: "Bez odměny není co počítat." },
    fecha: "2026-10-24",
    entrada: { odmena: 0, prohlaseni: false },
    esperaError: true,
  },
]);
