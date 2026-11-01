import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { brutoIzNeta, parametri, REQUIERE_ZARADA } from "../lib/zarada";

export default definirCalculadora({
  id: "rs.minimalna-zarada",
  mercado: "rs",
  concepto: "salario-minimo",
  slug: "minimalna-zarada",
  estado: "publicado",
  requiere: { ...REQUIERE_ZARADA, "rs.minimalna-cena-rada": "numero" },
  campos: [
    { id: "casova", tipo: "numero", etiqueta: "Radni časovi u mesecu", ayuda: "Broj časova zavisi od meseca. Zvanični mesečni iznosi računaju se sa 174 časa.", min: 1, max: 300, porDefecto: 174 },
  ],
  calcular(e, v, { redondear }) {
    if (e.casova <= 0) throw new ErrorEntrada("Unesite broj radnih časova veći od nule.", "casova");
    const neto = redondear(e.casova * v["rs.minimalna-cena-rada"]);
    const o = brutoIzNeta(neto, parametri(v), 100, redondear);
    return {
      neto,
      cenaCasa: v["rs.minimalna-cena-rada"],
      bruto: o.bruto,
      doprinosi: o.doprinosi,
      porez: o.porez,
      trosakPoslodavca: o.trosakPoslodavca,
    };
  },
  resultado: [
    { clave: "neto", etiqueta: "Minimalna neto zarada", formato: "moneda", destacada: true },
    { clave: "cenaCasa", etiqueta: "Minimalna cena rada po času", formato: "moneda" },
    { clave: "bruto", etiqueta: "Bruto zarada", formato: "moneda" },
    { clave: "doprinosi", etiqueta: "Doprinosi zaposlenog", formato: "moneda" },
    { clave: "porez", etiqueta: "Porez na zarade", formato: "moneda" },
    { clave: "trosakPoslodavca", etiqueta: "Trošak poslodavca", formato: "moneda" },
  ],
});
