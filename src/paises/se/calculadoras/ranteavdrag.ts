import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { reduktionUnderskott } from "../lib/kapital";

export default definirCalculadora({
  id: "se.ranteavdrag",
  mercado: "se",
  concepto: "propio",
  slug: "ranteavdrag",
  estado: "publicado",
  requiere: {
    "se.ranteavdrag": "mapa",
    "se.kapitalskatt": "numero",
  },
  campos: [
    { id: "ranteutgifter", tipo: "moneda", etiqueta: "Ränteutgifter under året", min: 0, porDefecto: 60000, ayuda: "Till exempel ränta på bolån. Räntor på lån utan säkerhet ger inte avdrag." },
    { id: "kapitalinkomster", tipo: "moneda", etiqueta: "Kapitalinkomster under året (ränta, utdelning, vinster)", min: 0, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.ranteutgifter <= 0 && e.kapitalinkomster <= 0) throw new ErrorEntrada("Skriv dina ränteutgifter.", "ranteutgifter");
    const netto = e.kapitalinkomster - e.ranteutgifter;
    const underskott = Math.max(0, -netto);
    const reduktion = reduktionUnderskott(underskott, v["se.ranteavdrag"]);
    const skatt = netto > 0 ? Math.floor((netto * v["se.kapitalskatt"]) / 100) : 0;
    const observaciones: string[] = [];
    if (underskott > 0) observaciones.push("Skattereduktionen dras från din skatt i deklarationen. Den kan inte bli större än den skatt du betalar.");
    else observaciones.push("Du har ett överskott av kapital. Ränteutgifterna minskar då den kapitalinkomst du betalar skatt på.");
    return {
      reduktion,
      perManad: redondear(reduktion / 12),
      underskott,
      overskott: Math.max(0, netto),
      skatt,
      kostnadEfterAvdrag: redondear(e.ranteutgifter - reduktion),
      observaciones,
    };
  },
  resultado: [
    { clave: "reduktion", etiqueta: "Skattereduktion för ränteutgifter", formato: "moneda", decimales: 0, destacada: true },
    { clave: "perManad", etiqueta: "Skattereduktion per månad", formato: "moneda" },
    { clave: "underskott", etiqueta: "Underskott av kapital", formato: "moneda", decimales: 0 },
    { clave: "overskott", etiqueta: "Överskott av kapital", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "skatt", etiqueta: "Skatt på överskottet", formato: "moneda", decimales: 0, ocultarSiCero: true },
    { clave: "kostnadEfterAvdrag", etiqueta: "Räntekostnad efter avdraget", formato: "moneda" },
  ],
});
