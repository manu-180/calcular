import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { reiknaLaun } from "../lib/laun";

export default definirCalculadora({
  id: "is.brutto-ur-neti",
  mercado: "is",
  concepto: "propio",
  slug: "brutto-ur-neti",
  estado: "publicado",
  requiere: {
    "is.skattthrep-man": "escala",
    "is.personuafslattur-man": "numero",
    "is.lifeyrir-launamadur": "numero",
    "is.sereign-hamark": "numero",
  },
  campos: [
    { id: "neto", tipo: "moneda", etiqueta: "Útborguð laun sem þú vilt fá", min: 0, porDefecto: 500000 },
    { id: "sereign", tipo: "porcentaje", etiqueta: "Séreignarsparnaður þinn", min: 0, max: 4, porDefecto: 0 },
    { id: "nyting", tipo: "porcentaje", etiqueta: "Nýting persónuafsláttar", min: 0, max: 200, porDefecto: 100 },
  ],
  calcular(e, v, { redondear }) {
    if (e.neto <= 0) throw new ErrorEntrada("Sláðu inn upphæð hærri en núll.", "neto");
    const f = { escala: v["is.skattthrep-man"], afslattur: v["is.personuafslattur-man"], lifeyrir: v["is.lifeyrir-launamadur"] };
    const val = { sereign: e.sereign, nyting: e.nyting };
    let lagt = 0;
    let hatt = e.neto * 4 + 1000000;
    while (hatt - lagt > 1) {
      const midja = Math.floor((lagt + hatt) / 2);
      if (reiknaLaun(midja, f, val, redondear).utborgad >= e.neto) hatt = midja;
      else lagt = midja;
    }
    const s = reiknaLaun(hatt, f, val, redondear);
    return { heildarlaun: hatt, lifeyrir: s.lifeyrir, sereign: s.sereign, stadgreidsla: s.stadgreidsla, utborgad: s.utborgad };
  },
  resultado: [
    { clave: "heildarlaun", etiqueta: "Heildarlaun sem þarf", formato: "moneda", destacada: true },
    { clave: "lifeyrir", etiqueta: "Iðgjald í lífeyrissjóð", formato: "moneda" },
    { clave: "sereign", etiqueta: "Séreignarsparnaður", formato: "moneda", ocultarSiCero: true },
    { clave: "stadgreidsla", etiqueta: "Staðgreiðsla", formato: "moneda" },
    { clave: "utborgad", etiqueta: "Útborguð laun", formato: "moneda" },
  ],
});
