import { definirCasos } from "@/motor/calculo";
import bundessteuerRechner from "./bundessteuer-rechner";

const DBG = "https://www.fedlex.admin.ch/eli/cc/1991/1184_1184_1184/de#art_36";

export default definirCasos(bundessteuerRechner, [
  {
    nombre: "Alleinstehend, 80 000 Franken",
    origen: { tipo: "recalculado", url: DBG, detalle: "Art. 36 Abs. 1 DBG: für 76 200 Franken 1152,50, je weitere 100 Franken 5,94. 38 × 5,94 = 225,72; Steuer 1378,22." },
    fecha: "2026-10-14",
    entrada: { einkommen: 80000, zivilstand: "alleinstehend", kinder: 0 },
    esperado: { steuer: 1378.22, tarifsteuer: 1378.22, ermaessigung: 0, grenzsatz: 5.94, tarif: "Tarif für Alleinstehende", durchschnitt: 1.722775 },
    tolerancia: 0.001,
  },
  {
    nombre: "Verheiratet mit zwei Kindern, 120 000 Franken",
    origen: { tipo: "recalculado", url: DBG, detalle: "Art. 36 Abs. 2: für 108 700 Franken 2251, je weitere 100 Franken 6. 113 × 6 = 678; 2929. Abs. 2bis: minus 2 × 263 = 526; Steuer 2403." },
    fecha: "2026-10-14",
    entrada: { einkommen: 120000, zivilstand: "verheiratet", kinder: 2 },
    esperado: { tarifsteuer: 2929, ermaessigung: 526, steuer: 2403 },
  },
  {
    nombre: "Einelternfamilie mit einem Kind, 60 000 Franken",
    origen: { tipo: "recalculado", url: DBG, detalle: "Abs. 2bis: Tarif für Verheiratete. Für 53 400 Franken 237, je weitere 100 Franken 2: 66 × 2 = 132; 369 minus 263 = 106." },
    fecha: "2026-10-14",
    entrada: { einkommen: 60000, zivilstand: "alleinstehend", kinder: 1 },
    esperado: { tarifsteuer: 369, steuer: 106, tarif: "Elterntarif (Tarif für Verheiratete)" },
  },
  {
    nombre: "Steuer unter 25 Franken",
    origen: { tipo: "recalculado", url: DBG, detalle: "18 000 Franken: 28 × 0,77 = 21,56. Unter 25 Franken wird nichts erhoben (Abs. 3)." },
    fecha: "2026-10-14",
    entrada: { einkommen: 18000, zivilstand: "alleinstehend", kinder: 0 },
    esperado: { tarifsteuer: 21.56, steuer: 0 },
  },
  {
    nombre: "Angebrochene Hunderter zählen nicht",
    origen: { tipo: "recalculado", url: DBG, detalle: "80 099 Franken werden wie 80 000 besteuert: 1378,22." },
    fecha: "2026-10-14",
    entrada: { einkommen: 80099, zivilstand: "alleinstehend", kinder: 0 },
    esperado: { steuer: 1378.22 },
  },
  {
    nombre: "Höchstsatz 11,5 %",
    origen: { tipo: "recalculado", url: DBG, detalle: "Ab 794 000 Franken 11,5 %: 1 000 000 × 11,5 % = 115 000." },
    fecha: "2026-10-14",
    entrada: { einkommen: 1000000, zivilstand: "alleinstehend", kinder: 0 },
    esperado: { steuer: 115000, grenzsatz: 11.5 },
  },
  {
    nombre: "Tarif 2027, alleinstehend, 80 000 Franken",
    origen: {
      tipo: "recalculado",
      url: "https://fedlex.data.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/1991/1184_1184_1184/20270101/de/html/fedlex-data-admin-ch-eli-cc-1991-1184_1184_1184-20270101-de-html-2.html",
      detalle: "Art. 36 Abs. 1 DBG ab 2027: für 76 500 Franken 1155,85, je weitere 100 Franken 5,94. 35 × 5,94 = 207,90; Steuer 1363,75.",
    },
    fecha: "2027-02-01",
    entrada: { einkommen: 80000, zivilstand: "alleinstehend", kinder: 0 },
    esperado: { steuer: 1363.75 },
  },
  {
    nombre: "Tarif 2027, verheiratet mit zwei Kindern, 120 000 Franken",
    origen: {
      tipo: "recalculado",
      url: "https://fedlex.data.admin.ch/filestore/fedlex.data.admin.ch/eli/cc/1991/1184_1184_1184/20270101/de/html/fedlex-data-admin-ch-eli-cc-1991-1184_1184_1184-20270101-de-html-2.html",
      detalle: "Abs. 2 ab 2027: für 109 200 Franken 2259, je weitere 100 Franken 6: 108 × 6 = 648; 2907. Abs. 2bis: minus 2 × 264 = 528; Steuer 2379.",
    },
    fecha: "2027-02-01",
    entrada: { einkommen: 120000, zivilstand: "verheiratet", kinder: 2 },
    esperado: { tarifsteuer: 2907, ermaessigung: 528, steuer: 2379 },
  },
]);
