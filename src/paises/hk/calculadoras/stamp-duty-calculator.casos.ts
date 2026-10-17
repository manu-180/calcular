import { definirCasos } from "@/motor/calculo";
import calculadora from "./stamp-duty-calculator";

const URL = "https://www.gov.hk/en/residents/taxes/stamp/stamp_duty_rates.htm";

export default definirCasos(calculadora, [
  {
    nombre: "Up to $4 million pays $100",
    origen: { tipo: "oficial", url: URL, detalle: "Does not exceed $4,000,000: $100." },
    fecha: "2026-10-16",
    entrada: { precio: 4000000, tipo: "residential" },
    esperado: { avd: 100 },
  },
  {
    nombre: "$4.2 million in the first marginal relief band",
    origen: { tipo: "oficial", url: URL, detalle: "$4,000,000 to $4,323,780: $100 + 20% of excess over $4,000,000 = 100 + 40,000 = 40,100." },
    fecha: "2026-10-16",
    entrada: { precio: 4200000, tipo: "residential" },
    esperado: { avd: 40100 },
  },
  {
    nombre: "$5 million at 2.25%",
    origen: { tipo: "oficial", url: URL, detalle: "$4,935,480 to $6,000,000: 2.25% x 5,000,000 = 112,500." },
    fecha: "2026-10-16",
    entrada: { precio: 5000000, tipo: "residential" },
    esperado: { avd: 112500 },
  },
  {
    nombre: "$6.5 million in a 10% relief band",
    origen: { tipo: "oficial", url: URL, detalle: "$6,000,000 to $6,642,860: $135,000 + 10% of 500,000 = 185,000." },
    fecha: "2026-10-16",
    entrada: { precio: 6500000, tipo: "non-residential" },
    esperado: { avd: 185000 },
  },
  {
    nombre: "$105 million home: 30% relief band above $100 million",
    origen: { tipo: "oficial", url: URL, detalle: "$100,000,000 to $109,574,470: $4,250,000 + 30% of 5,000,000 = 5,750,000." },
    fecha: "2026-10-16",
    entrada: { precio: 105000000, tipo: "residential" },
    esperado: { avd: 5750000 },
  },
  {
    nombre: "$120 million: 6.5% for a home, 4.25% for an office",
    origen: { tipo: "oficial", url: URL, detalle: "Residential above $109,574,470: 6.5% = 7,800,000." },
    fecha: "2026-10-16",
    entrada: { precio: 120000000, tipo: "residential" },
    esperado: { avd: 7800000 },
  },
  {
    nombre: "$120 million non-residential under Scale 3",
    origen: { tipo: "oficial", url: URL, detalle: "Scale 3 above $21,739,120: 4.25% = 5,100,000." },
    fecha: "2026-10-16",
    entrada: { precio: 120000000, tipo: "non-residential" },
    esperado: { avd: 5100000 },
  },
  {
    nombre: "A fraction of a dollar is rounded up",
    origen: { tipo: "oficial", url: URL, detalle: "Round up to the nearest $1: 4,400,001 x 1.5% = 66,000.015, charged 66,001." },
    fecha: "2026-10-16",
    entrada: { precio: 4400001, tipo: "residential" },
    esperado: { avd: 66001 },
  },
  {
    nombre: "No price is not valid",
    origen: { tipo: "recalculado", detalle: "Price 0." },
    fecha: "2026-10-16",
    entrada: { precio: 0, tipo: "residential" },
    esperaError: true,
  },
]);
