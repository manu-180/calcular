import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

// Borrador: sporul din Codul muncii nu a putut fi citit în textul consolidat (legis.md).
export default definirCalculadora({
  id: "md.calculator-ore-suplimentare",
  mercado: "md",
  concepto: "horas-extra",
  slug: "calculator-ore-suplimentare",
  estado: "borrador",
  requiere: { "md.ore-suplimentare": "mapa", "md.ore-lunare-salariu-minim": "numero" },
  campos: [
    { id: "salariu", tipo: "moneda", etiqueta: "Salariul de bază lunar", min: 0, porDefecto: 15000 },
    { id: "ore", tipo: "numero", etiqueta: "Ore lucrate pe lună la program normal", min: 1, max: 250, requerido: false, ayuda: "Gol: media lunară a programului complet." },
    { id: "primele", tipo: "numero", etiqueta: "Ore suplimentare din primele două ale fiecărei zile", min: 0, max: 200, porDefecto: 4 },
    { id: "urmatoarele", tipo: "numero", etiqueta: "Ore suplimentare următoare", min: 0, max: 200, porDefecto: 0 },
  ],
  calcular(e, v, { redondear }) {
    if (e.salariu <= 0) throw new ErrorEntrada("Introduceți un salariu mai mare decât zero.", "salariu");
    const m = v["md.ore-suplimentare"];
    const orar = e.salariu / (e.ore ?? v["md.ore-lunare-salariu-minim"]);
    const plataPrimele = redondear((orar * e.primele * enMapa(m, "primele-doua")) / 100);
    const plataUrmatoare = redondear((orar * e.urmatoarele * enMapa(m, "urmatoarele")) / 100);
    return { total: redondear(plataPrimele + plataUrmatoare), plataPrimele, plataUrmatoare, orar: redondear(orar) };
  },
  resultado: [
    { clave: "total", etiqueta: "Plata pentru orele suplimentare", formato: "moneda", destacada: true },
    { clave: "plataPrimele", etiqueta: "Pentru primele două ore", formato: "moneda" },
    { clave: "plataUrmatoare", etiqueta: "Pentru orele următoare", formato: "moneda" },
    { clave: "orar", etiqueta: "Salariul pe o oră", formato: "moneda" },
  ],
});
