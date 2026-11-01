import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { brutoIzNeta, obracunaj, parametri, REQUIERE_ZARADA } from "../lib/zarada";

export default definirCalculadora({
  id: "rs.regres-i-topli-obrok",
  mercado: "rs",
  concepto: "propio",
  slug: "regres-i-topli-obrok",
  estado: "publicado",
  requiere: REQUIERE_ZARADA,
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Mesečna bruto zarada bez dodataka", min: 0, porDefecto: 150000 },
    { id: "topliObrok", tipo: "moneda", etiqueta: "Topli obrok mesečno, neto", min: 0, porDefecto: 8000 },
    { id: "regres", tipo: "moneda", etiqueta: "Regres, neto", ayuda: "Iznos koji se isplaćuje za godišnji odmor, u jednom mesecu.", min: 0, porDefecto: 20000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Unesite bruto zaradu veću od nule.", "bruto");
    const p = parametri(v);
    const osnovni = obracunaj(e.bruto, p, 100, redondear);
    const saObrokom = brutoIzNeta(redondear(osnovni.neto + e.topliObrok), p, 100, redondear);
    const saRegresom = brutoIzNeta(redondear(osnovni.neto + e.regres), p, 100, redondear);
    const obrokBruto = redondear(saObrokom.bruto - e.bruto);
    const regresBruto = redondear(saRegresom.bruto - e.bruto);
    const obrokTrosak = redondear(saObrokom.trosakPoslodavca - osnovni.trosakPoslodavca);
    const regresTrosak = redondear(saRegresom.trosakPoslodavca - osnovni.trosakPoslodavca);
    return {
      godisnjiTrosak: redondear(obrokTrosak * 12 + regresTrosak),
      obrokBruto,
      obrokTrosak,
      regresBruto,
      regresTrosak,
      netoSaObrokom: saObrokom.neto,
    };
  },
  resultado: [
    { clave: "godisnjiTrosak", etiqueta: "Godišnji trošak poslodavca za obrok i regres", formato: "moneda", destacada: true },
    { clave: "obrokBruto", etiqueta: "Topli obrok mesečno, bruto", formato: "moneda" },
    { clave: "obrokTrosak", etiqueta: "Topli obrok, trošak poslodavca mesečno", formato: "moneda" },
    { clave: "regresBruto", etiqueta: "Regres, bruto", formato: "moneda" },
    { clave: "regresTrosak", etiqueta: "Regres, trošak poslodavca", formato: "moneda" },
    { clave: "netoSaObrokom", etiqueta: "Neto zarada sa toplim obrokom", formato: "moneda" },
  ],
});
