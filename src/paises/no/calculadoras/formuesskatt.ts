import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "no.formuesskatt",
  mercado: "no",
  concepto: "propio",
  slug: "formuesskatt",
  estado: "publicado",
  requiere: {
    "no.formuesskatt-kommune": "numero",
    "no.formuesskatt-stat": "mapa",
    "no.formue-bunnfradrag": "numero",
    "no.formue-trinn2": "numero",
    "no.formue-verdsettelse": "mapa",
    "no.formue-primaerbolig-grense": "numero",
  },
  campos: [
    { id: "primaerbolig", tipo: "moneda", etiqueta: "Primærbolig: beregnet markedsverdi", min: 0, porDefecto: 5000000, ayuda: "Verdien Skatteetaten har beregnet for boligen du bor i (står i skattemeldingen)." },
    { id: "sekundaerbolig", tipo: "moneda", etiqueta: "Sekundærbolig: markedsverdi", min: 0, porDefecto: 0, requerido: false },
    { id: "aksjer", tipo: "moneda", etiqueta: "Aksjer og aksjefond: verdi 1. januar", min: 0, porDefecto: 1000000, requerido: false },
    { id: "bank", tipo: "moneda", etiqueta: "Bankinnskudd og annen formue", min: 0, porDefecto: 500000, requerido: false },
    { id: "gjeld", tipo: "moneda", etiqueta: "Gjeld", min: 0, porDefecto: 3000000, requerido: false },
    { id: "ektefeller", tipo: "si-no", etiqueta: "Ektefeller som skattlegges samlet", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    const prim = e.primaerbolig;
    const sek = e.sekundaerbolig ?? 0;
    const aksjer = e.aksjer ?? 0;
    const bank = e.bank ?? 0;
    const gjeld = e.gjeld ?? 0;
    const brutto = prim + sek + aksjer + bank;
    if (brutto <= 0) throw new ErrorEntrada("Skriv inn minst én formuesverdi.", "primaerbolig");
    const vs = v["no.formue-verdsettelse"];
    const grense = v["no.formue-primaerbolig-grense"];
    const verdiPrim = (Math.min(prim, grense) * enMapa(vs, "primaerbolig") + Math.max(0, prim - grense) * enMapa(vs, "primaerbolig-over")) / 100;
    const verdiSek = (sek * enMapa(vs, "sekundaerbolig")) / 100;
    const aksjeandel = enMapa(vs, "aksjer");
    const verdiAksjer = (aksjer * aksjeandel) / 100;
    // Gjeldsreduksjon: gjelden fordeles på formuen etter full verdi, og delen som faller på aksjer
    // reduseres med samme prosent som verdsettelsesrabatten.
    const gjeldsreduksjon = brutto > 0 ? ((gjeld * aksjer) / brutto) * (1 - aksjeandel / 100) : 0;
    const fradragGjeld = gjeld - gjeldsreduksjon;
    const formuesverdi = verdiPrim + verdiSek + verdiAksjer + bank;
    const netto = Math.max(0, formuesverdi - fradragGjeld);
    const f = e.ektefeller ? 2 : 1;
    const bunn = v["no.formue-bunnfradrag"] * f;
    const trinn2 = v["no.formue-trinn2"] * f;
    const stat = v["no.formuesskatt-stat"];
    const kommune = redondear((Math.max(0, netto - bunn) * v["no.formuesskatt-kommune"]) / 100);
    const statSkatt = redondear(
      (Math.max(0, Math.min(netto, trinn2) - bunn) * enMapa(stat, "trinn1") + Math.max(0, netto - trinn2) * enMapa(stat, "trinn2")) / 100,
    );
    return {
      formuesskatt: redondear(kommune + statSkatt),
      kommune,
      stat: statSkatt,
      nettoformue: redondear(netto),
      formuesverdi: redondear(formuesverdi),
      verdiPrimaerbolig: redondear(verdiPrim),
      fradragGjeld: redondear(fradragGjeld),
      bunnfradrag: bunn,
      observaciones: e.ektefeller ? ["For ektefeller er bunnfradraget og grensen for trinn 2 doblet."] : [],
    };
  },
  resultado: [
    { clave: "formuesskatt", etiqueta: "Formuesskatt", formato: "moneda", destacada: true },
    { clave: "kommune", etiqueta: "Til kommunen", formato: "moneda" },
    { clave: "stat", etiqueta: "Til staten", formato: "moneda" },
    { clave: "nettoformue", etiqueta: "Skattepliktig nettoformue", formato: "moneda" },
    { clave: "formuesverdi", etiqueta: "Formuesverdi før gjeld", formato: "moneda" },
    { clave: "verdiPrimaerbolig", etiqueta: "Formuesverdi av primærboligen", formato: "moneda" },
    { clave: "fradragGjeld", etiqueta: "Fradrag for gjeld (etter gjeldsreduksjon)", formato: "moneda" },
    { clave: "bunnfradrag", etiqueta: "Bunnfradrag", formato: "moneda" },
  ],
});
