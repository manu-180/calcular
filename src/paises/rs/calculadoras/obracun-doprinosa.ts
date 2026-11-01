import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { obracunaj, parametri, REQUIERE_ZARADA } from "../lib/zarada";

export default definirCalculadora({
  id: "rs.obracun-doprinosa",
  mercado: "rs",
  concepto: "aportes-seguridad-social",
  slug: "obracun-doprinosa",
  estado: "publicado",
  requiere: { ...REQUIERE_ZARADA, "rs.pio-samostalni": "numero" },
  campos: [{ id: "bruto", tipo: "moneda", etiqueta: "Mesečna bruto zarada", min: 0, porDefecto: 150000 }],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Unesite bruto zaradu veću od nule.", "bruto");
    const o = obracunaj(e.bruto, parametri(v), 100, redondear);
    return {
      ukupno: redondear(o.doprinosi + o.doprinosiPoslodavca),
      osnovica: o.osnovicaDoprinosa,
      pio: o.pio,
      zdravstvo: o.zdravstvo,
      nezaposlenost: o.nezaposlenost,
      zaposleni: o.doprinosi,
      pioPoslodavac: o.pioPoslodavac,
      zdravstvoPoslodavac: o.zdravstvoPoslodavac,
      poslodavac: o.doprinosiPoslodavca,
    };
  },
  resultado: [
    { clave: "ukupno", etiqueta: "Svi doprinosi mesečno", formato: "moneda", destacada: true },
    { clave: "osnovica", etiqueta: "Osnovica doprinosa", formato: "moneda" },
    { clave: "pio", etiqueta: "PIO, zaposleni", formato: "moneda" },
    { clave: "zdravstvo", etiqueta: "Zdravstvo, zaposleni", formato: "moneda" },
    { clave: "nezaposlenost", etiqueta: "Nezaposlenost, zaposleni", formato: "moneda" },
    { clave: "zaposleni", etiqueta: "Ukupno na teret zaposlenog", formato: "moneda" },
    { clave: "pioPoslodavac", etiqueta: "PIO, poslodavac", formato: "moneda" },
    { clave: "zdravstvoPoslodavac", etiqueta: "Zdravstvo, poslodavac", formato: "moneda" },
    { clave: "poslodavac", etiqueta: "Ukupno na teret poslodavca", formato: "moneda" },
  ],
});
