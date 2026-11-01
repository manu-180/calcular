import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { izracunPlace, REQ_PLACA } from "../lib/placa";

export default definirCalculadora({
  id: "si.izracun-place",
  mercado: "si",
  concepto: "sueldo-neto",
  slug: "izracun-place",
  estado: "publicado",
  requiere: { ...REQ_PLACA },
  mundo: { bruto: "bruto", periodoBruto: "mes", neto: "neto", periodoNeto: "mes" },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Mesečna bruto plača", min: 0, porDefecto: 2500 },
    { id: "otroci", tipo: "entero", etiqueta: "Število vzdrževanih otrok, ki jih uveljavljate", min: 0, max: 15, porDefecto: 0 },
    { id: "do29", tipo: "si-no", etiqueta: "V tem letu dopolnite največ 29 let", porDefecto: false },
    { id: "delez", tipo: "porcentaje", etiqueta: "Delež polnega delovnega časa", min: 1, max: 100, porDefecto: 100, ayuda: "Pri polnem delovnem času pustite 100." },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Vnesite bruto plačo, večjo od nič.", "bruto");
    const p = izracunPlace(e.bruto, { otroci: e.otroci, do29: e.do29, delez: e.delez }, v, redondear);
    const opombe: string[] = [];
    if (p.prispevki.osnova > e.bruto) opombe.push("Plača je nižja od najnižje osnove za prispevke. Večino prispevkov od razlike plača delodajalec.");
    return {
      neto: p.neto,
      prispevki: p.prispevki.odstotni,
      ozp: p.prispevki.ozp,
      olajsave: p.olajsave,
      davcnaOsnova: p.davcnaOsnova,
      akontacija: p.akontacija,
      observaciones: opombe,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Neto plača", formato: "moneda", destacada: true },
    { clave: "prispevki", etiqueta: "Prispevki delavca", formato: "moneda" },
    { clave: "ozp", etiqueta: "Obvezni zdravstveni prispevek", formato: "moneda" },
    { clave: "olajsave", etiqueta: "Upoštevane olajšave", formato: "moneda" },
    { clave: "davcnaOsnova", etiqueta: "Davčna osnova za akontacijo", formato: "moneda" },
    { clave: "akontacija", etiqueta: "Akontacija dohodnine", formato: "moneda" },
  ],
});
