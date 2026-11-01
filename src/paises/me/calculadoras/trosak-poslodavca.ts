import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_PRIREZ, obracunaj, parametri, REQUIERE_ZARADA } from "../lib/zarada";

export default definirCalculadora({
  id: "me.trosak-poslodavca",
  mercado: "me",
  concepto: "costo-empleador",
  slug: "trosak-poslodavca",
  estado: "publicado",
  requiere: REQUIERE_ZARADA,
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Mjesečna bruto zarada", min: 0, porDefecto: 1200 },
    { id: "zaposlenih", tipo: "entero", etiqueta: "Broj zaposlenih sa tom zaradom", min: 1, max: 10000, porDefecto: 1 },
    CAMPO_PRIREZ,
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Unesite bruto zaradu veću od nule.", "bruto");
    const o = obracunaj(e.bruto, parametri(v), e.prirez, redondear);
    return {
      trosak: o.trosakPoslodavca,
      nezaposlenost: o.nezaposlenostPoslodavac,
      fondRada: o.fondRada,
      neto: o.neto,
      ukupnoMjesecno: redondear(o.trosakPoslodavca * e.zaposlenih),
      ukupnoGodisnje: redondear(o.trosakPoslodavca * e.zaposlenih * 12),
    };
  },
  resultado: [
    { clave: "trosak", etiqueta: "Trošak po zaposlenom mjesečno", formato: "moneda", destacada: true },
    { clave: "nezaposlenost", etiqueta: "Doprinos za nezaposlenost", formato: "moneda" },
    { clave: "fondRada", etiqueta: "Doprinos Fondu rada", formato: "moneda" },
    { clave: "neto", etiqueta: "Neto koji prima zaposleni", formato: "moneda" },
    { clave: "ukupnoMjesecno", etiqueta: "Svi zaposleni, mjesečno", formato: "moneda" },
    { clave: "ukupnoGodisnje", etiqueta: "Svi zaposleni, godišnje", formato: "moneda" },
  ],
});
