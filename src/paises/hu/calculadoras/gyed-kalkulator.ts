import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "hu.gyed-kalkulator",
  mercado: "hu",
  concepto: "propio",
  slug: "gyed-kalkulator",
  estado: "publicado",
  requiere: {
    "hu.gyed": "numero",
    "hu.minimalber": "mapa",
    "hu.nyugdijjarulek": "numero",
  },
  campos: [{ id: "havi", tipo: "moneda", etiqueta: "Havi bruttó átlagkereset a szülés előtt", min: 0, porDefecto: 500000 }],
  calcular(e, v, { redondear }) {
    if (e.havi <= 0) throw new ErrorEntrada("Adj meg nullánál nagyobb átlagkeresetet.", "havi");
    const szazalek = v["hu.gyed"];
    const maximum = redondear((enMapa(v["hu.minimalber"], "havi") * 2 * szazalek) / 100);
    const szamitott = redondear((e.havi * szazalek) / 100);
    const brutto = Math.min(szamitott, maximum);
    const nyugdijjarulek = redondear((brutto * v["hu.nyugdijjarulek"]) / 100);
    const observaciones: string[] = [];
    if (szamitott > maximum) observaciones.push("A GYED elérte a felső határt, ami a minimálbér kétszeresének 70 százaléka.");
    observaciones.push("A GYED 2025. június 30. után SZJA-mentes. A nyugdíjjárulékot levonják belőle.");
    return { netto: redondear(brutto - nyugdijjarulek), brutto, nyugdijjarulek, maximum, observaciones };
  },
  resultado: [
    { clave: "netto", etiqueta: "Nettó GYED havonta", formato: "moneda", destacada: true },
    { clave: "brutto", etiqueta: "Bruttó GYED havonta", formato: "moneda" },
    { clave: "nyugdijjarulek", etiqueta: "Nyugdíjjárulék", formato: "moneda" },
    { clave: "maximum", etiqueta: "A GYED felső határa havonta", formato: "moneda" },
  ],
});
