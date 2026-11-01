import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_PRIREZ, obracunaj, parametri, REQUIERE_ZARADA } from "../lib/zarada";

export default definirCalculadora({
  id: "me.obracun-doprinosa",
  mercado: "me",
  concepto: "aportes-seguridad-social",
  slug: "obracun-doprinosa",
  estado: "publicado",
  requiere: REQUIERE_ZARADA,
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Mjesečna bruto zarada", min: 0, porDefecto: 1000 },
    CAMPO_PRIREZ,
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Unesite bruto zaradu veću od nule.", "bruto");
    const o = obracunaj(e.bruto, parametri(v), e.prirez, redondear);
    return {
      ukupno: redondear(o.doprinosi + o.namaPoslodavca),
      zaposleni: o.doprinosi,
      pio: o.pio,
      nezaposlenost: o.nezaposlenost,
      poslodavac: o.namaPoslodavca,
      nezaposlenostPoslodavac: o.nezaposlenostPoslodavac,
      fondRada: o.fondRada,
    };
  },
  resultado: [
    { clave: "ukupno", etiqueta: "Svi doprinosi mjesečno", formato: "moneda", destacada: true },
    { clave: "zaposleni", etiqueta: "Iz zarade, na teret zaposlenog", formato: "moneda" },
    { clave: "pio", etiqueta: "PIO, zaposleni", formato: "moneda" },
    { clave: "nezaposlenost", etiqueta: "Nezaposlenost, zaposleni", formato: "moneda" },
    { clave: "poslodavac", etiqueta: "Na zaradu, na teret poslodavca", formato: "moneda" },
    { clave: "nezaposlenostPoslodavac", etiqueta: "Nezaposlenost, poslodavac", formato: "moneda" },
    { clave: "fondRada", etiqueta: "Fond rada, poslodavac", formato: "moneda" },
  ],
});
