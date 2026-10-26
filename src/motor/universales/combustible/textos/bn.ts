import { cifrasBn } from "../../../i18n/bengali";
import type { TextosUi } from "../../tipos";
import type { UiCombustible } from "../definicion";

const distancia = (u: string) => (u === "mi" ? "মাইল" : u === "km" ? "কিলোমিটার" : cifrasBn(u));

export const textosBn: TextosUi<UiCombustible> = {
  slug: "fuel-cost",
  ui: () => ({
    distancia: (u) => `যাত্রার দূরত্ব (${distancia(u)})`,
    idaYVuelta: "যাওয়া-আসা দুটোই",
    tipoConsumo: "তেল খরচ কীভাবে মাপেন",
    l100: "প্রতি ১০০ কিলোমিটারে লিটার",
    kml: "প্রতি লিটারে কিলোমিটার",
    consumo: "তেল খরচ (মাইলেজ)",
    consumoMpg: "তেল খরচ (প্রতি গ্যালনে মাইল)",
    consumoAyuda: "গাড়ির ম্যানুয়াল বা ট্রিপ মিটার দেখুন। শহরের চেয়ে হাইওয়েতে সাধারণত তেল কম লাগে।",
    precio: (u) => (u === "L" ? "প্রতি লিটারের দাম" : "প্রতি গ্যালনের দাম"),
    personas: "কতজন খরচ ভাগ করবেন",
    costo: "জ্বালানি খরচ",
    porPersona: "জনপ্রতি",
    combustible: (u) => (u === "L" ? "দরকারি তেল (লিটার)" : "দরকারি তেল (গ্যালন)"),
    distanciaTotal: (u) => `মোট দূরত্ব (${distancia(u)})`,
    costoPorDistancia: (u) => `প্রতি ${distancia(u)}ে খরচ`,
    errorConsumo: "তেল খরচের মান শূন্যের বেশি হতে হবে।",
    errorPersonas: "অন্তত একজন থাকতে হবে।",
  }),
};
