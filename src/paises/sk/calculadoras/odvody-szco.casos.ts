import { definirCasos } from "@/motor/calculo";
import odvodySzco from "./odvody-szco";

const T = "https://www.socpoist.sk/socialne-poistenie/platenie-poistneho/tabulky-platenia-poistneho/tabulky-platenia-poistneho-od-1-6";
const Z = "https://www.socpoist.sk/socialne-poistenie/zmeny-v-socialnom-poisteni/najdolezitejsie-zmeny-v-socialnom-poisteni-od-1-1";

export default definirCasos(odvodySzco, [
  {
    nombre: "Minimálne odvody",
    origen: { tipo: "oficial", url: T, detalle: "Z minimálneho základu 914,40 eura je sociálne poistenie 303,11 eura; minimálny preddavok VšZP 121,92 eura." },
    fecha: "2026-06-15",
    entrada: { prijem: 20000, zaklad: 8000 },
    esperado: { vz: 914.4, socialne: 303.11, zdravotne: 121.92, spolu: 425.03 },
  },
  {
    nombre: "Osobitný základ pri príjme do 9 144 eur",
    origen: { tipo: "oficial", url: Z, detalle: "Z osobitného základu 396,24 eura sa platí 131,34 eura." },
    fecha: "2026-06-15",
    entrada: { prijem: 9000, zaklad: 3600 },
    esperado: { vz: 396.24, socialne: 131.34 },
  },
  {
    nombre: "Základ dane 30 000 eur",
    origen: { tipo: "recalculado", url: Z, detalle: "30 000 / 12 / 1,486 = 1 682,36; 74,02 + 302,82 + 100,94 + 79,91 = 557,69; zdravotné 16 % = 269,17." },
    fecha: "2026-06-15",
    entrada: { prijem: 40000, zaklad: 30000 },
    esperado: { vz: 1682.36, socialne: 557.69, zdravotne: 269.17, spolu: 826.86 },
  },
  {
    nombre: "Maximálny základ",
    origen: { tipo: "oficial", url: T, detalle: "Z maximálneho základu 16 764 eur je to 5 557,26 eura." },
    fecha: "2026-06-15",
    entrada: { prijem: 500000, zaklad: 400000 },
    esperado: { vz: 16764, socialne: 5557.26 },
  },
]);
