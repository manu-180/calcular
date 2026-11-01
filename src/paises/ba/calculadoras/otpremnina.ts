import { definirCalculadora, ErrorEntrada, porRegion } from "@/motor/calculo";
import { CAMPO_REGION } from "../lib/plata";

export default definirCalculadora({
  id: "ba.otpremnina",
  mercado: "ba",
  concepto: "indemnizacion-despido",
  slug: "otpremnina",
  estado: "publicado",
  requiere: { "ba.otpremnina-godine": "numero-por-region", "ba.otpremnina-djelilac": "numero-por-region", "ba.otpremnina-tope": "numero-por-region" },
  campos: [
    CAMPO_REGION,
    { id: "plata", tipo: "moneda", etiqueta: "Prosječna plata u zadnja tri mjeseca", min: 0, porDefecto: 1500, ayuda: "U RS zakon traži neto platu." },
    { id: "godine", tipo: "entero", etiqueta: "Navršene godine rada kod poslodavca", min: 0, max: 50, porDefecto: 5 },
  ],
  calcular(e, v, { redondear }) {
    if (e.plata <= 0) throw new ErrorEntrada("Unesite platu veću od nule.", "plata");
    const najmanje = porRegion(v["ba.otpremnina-godine"], e.region);
    const djelilac = porRegion(v["ba.otpremnina-djelilac"], e.region);
    const tope = porRegion(v["ba.otpremnina-tope"], e.region);
    const observaciones: string[] = [];
    if (e.godine < najmanje) {
      observaciones.push("Prije dvije godine neprekidnog rada zakon ne daje pravo na otpremninu.");
      return { otpremnina: 0, bezGranice: 0, granica: redondear(e.plata * tope), observaciones };
    }
    const bezGranice = redondear((e.plata * e.godine) / djelilac);
    const granica = redondear(e.plata * tope);
    if (bezGranice > granica) observaciones.push("Iznos je dostigao zakonsku gornju granicu.");
    return { otpremnina: Math.min(bezGranice, granica), bezGranice, granica, observaciones };
  },
  resultado: [
    { clave: "otpremnina", etiqueta: "Najmanja otpremnina po zakonu", formato: "moneda", destacada: true },
    { clave: "bezGranice", etiqueta: "Iznos prije primjene granice", formato: "moneda" },
    { clave: "granica", etiqueta: "Gornja zakonska granica", formato: "moneda" },
  ],
});
