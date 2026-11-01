import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { obracunaj, parametri, REQUIERE_ZARADA } from "../lib/zarada";

export default definirCalculadora({
  id: "rs.trosak-poslodavca",
  mercado: "rs",
  concepto: "costo-empleador",
  slug: "trosak-poslodavca",
  estado: "publicado",
  requiere: REQUIERE_ZARADA,
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Mesečna bruto zarada", min: 0, porDefecto: 150000 },
    { id: "zaposleni", tipo: "entero", etiqueta: "Broj zaposlenih sa tom zaradom", min: 1, porDefecto: 1 },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Unesite bruto zaradu veću od nule.", "bruto");
    const o = obracunaj(e.bruto, parametri(v), 100, redondear);
    return {
      trosak: o.trosakPoslodavca,
      pioPoslodavac: o.pioPoslodavac,
      zdravstvoPoslodavac: o.zdravstvoPoslodavac,
      doprinosiPoslodavca: o.doprinosiPoslodavca,
      neto: o.neto,
      drzavi: redondear(o.doprinosi + o.porez + o.doprinosiPoslodavca),
      trosakGodisnje: redondear(o.trosakPoslodavca * 12 * e.zaposleni),
    };
  },
  resultado: [
    { clave: "trosak", etiqueta: "Mesečni trošak po zaposlenom", formato: "moneda", destacada: true },
    { clave: "pioPoslodavac", etiqueta: "PIO na teret poslodavca", formato: "moneda" },
    { clave: "zdravstvoPoslodavac", etiqueta: "Zdravstvo na teret poslodavca", formato: "moneda" },
    { clave: "doprinosiPoslodavca", etiqueta: "Doprinosi poslodavca ukupno", formato: "moneda" },
    { clave: "neto", etiqueta: "Neto zarada zaposlenog", formato: "moneda" },
    { clave: "drzavi", etiqueta: "Ukupno državi (porez i svi doprinosi)", formato: "moneda" },
    { clave: "trosakGodisnje", etiqueta: "Godišnji trošak za sve zaposlene", formato: "moneda" },
  ],
});
