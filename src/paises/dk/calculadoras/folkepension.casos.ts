import { definirCasos } from "@/motor/calculo";
import folkepension from "./folkepension";

const FP = "https://bm.dk/satser/satser-for-2026/folkepension";
const ALDER = "https://www.borger.dk/pension-og-efterloen/Folkepension-oversigt/foer-du-gaar-paa-folkepension";

export default definirCasos(folkepension, [
  {
    nombre: "Enlig uden anden indkomst, født 1965",
    origen: { tipo: "oficial", url: FP, detalle: "Grundbeløb 90.528 + pensionstillæg for enlige 104.748 = 195.276 om året, 16.273 pr. måned. Født 1963-1966: 68 år (borger.dk)." },
    fecha: "2026-10-24",
    entrada: { foedt: "1965-06-15", civil: "enlig", indtaegt: 0 },
    esperado: { aar: 195276, maaned: 16273, alder: 68, dato: "2033-06-15" },
  },
  {
    nombre: "Enlig med 150.000 kr. i anden indkomst",
    origen: {
      tipo: "recalculado",
      url: FP,
      detalle: "Fradrag 89.400 + midlertidig forhøjelse 9.800 = 99.200. Nedsættelse 30,9 % af 50.800 = 15.697,20. Tillæg 89.050,80; i alt 179.578,80, pr. måned 14.964,90.",
    },
    fecha: "2026-10-24",
    entrada: { foedt: "1960-02-01", civil: "enlig", indtaegt: 150000 },
    esperado: { nedsaettelse: 15697.2, tillaeg: 89050.8, aar: 179578.8, maaned: 14964.9, alder: 67 },
  },
  {
    nombre: "Gift med en pensionist, samlet indkomst 300.000 kr.",
    origen: {
      tipo: "recalculado",
      url: FP,
      detalle: "Fradrag 179.100 + 19.700 = 198.800. Nedsættelse 16 % af 101.200 = 16.192. Tillæg 53.604 − 16.192 = 37.412; i alt 127.940.",
    },
    fecha: "2026-10-24",
    entrada: { foedt: "1958-09-30", civil: "gift", indtaegt: 300000 },
    esperado: { tillaeg: 37412, aar: 127940 },
  },
  {
    nombre: "Født 1. januar 1971: 70 år",
    origen: { tipo: "oficial", url: ALDER, detalle: "Født 1. januar 1971 eller senere: folkepensionsalder 70 år." },
    fecha: "2026-10-24",
    entrada: { foedt: "1971-01-01", civil: "enlig", indtaegt: 0 },
    esperado: { alder: 70, dato: "2041-01-01" },
  },
  {
    nombre: "Født 10. marts 1954: 65½ år",
    origen: { tipo: "oficial", url: ALDER, detalle: "Født 1. januar til 30. juni 1954: 65 ½ år, altså 10. september 2019." },
    fecha: "2026-10-24",
    entrada: { foedt: "1954-03-10", civil: "enlig", indtaegt: 0 },
    esperado: { alder: 65.5, dato: "2019-09-10" },
  },
  {
    nombre: "Født 31. december 1953: 65 år",
    origen: { tipo: "oficial", url: ALDER, detalle: "Født 31. december 1953 eller tidligere: 65 år." },
    fecha: "2026-10-24",
    entrada: { foedt: "1953-12-31", civil: "enlig", indtaegt: 0 },
    esperado: { alder: 65, dato: "2018-12-31" },
  },
]);
