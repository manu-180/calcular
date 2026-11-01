import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { danovyBonus } from "../lib/mzda";
import { parametreMzdy, REQUIERE_MZDY } from "../lib/parametre";

export default definirCalculadora({
  id: "sk.danovy-bonus",
  mercado: "sk",
  concepto: "propio",
  slug: "danovy-bonus",
  estado: "publicado",
  requiere: REQUIERE_MZDY,
  campos: [
    { id: "zaklad", tipo: "moneda", etiqueta: "Základ dane za rok (zo zamestnania a podnikania)", min: 0, porDefecto: 20000 },
    { id: "detiDo15", tipo: "entero", etiqueta: "Počet detí do 15 rokov", min: 0, max: 10, porDefecto: 2 },
    { id: "deti15az18", tipo: "entero", etiqueta: "Počet detí od 15 do 18 rokov", min: 0, max: 10, porDefecto: 0 },
  ],
  calcular(e, v) {
    if (e.detiDo15 + e.deti15az18 <= 0) throw new ErrorEntrada("Zadajte aspoň jedno dieťa.", "detiDo15");
    const p = parametreMzdy(v);
    const bonus = danovyBonus(e.zaklad, e.detiDo15, e.deti15az18, p, 12);
    const plny = e.detiDo15 * p.bonus.do15 * 12 + e.deti15az18 * p.bonus.od15 * 12;
    return { bonus, mesacne: Math.round((bonus / 12) * 100) / 100, plny, strata: Math.round((plny - bonus) * 100) / 100 };
  },
  resultado: [
    { clave: "bonus", etiqueta: "Daňový bonus za rok", formato: "moneda", destacada: true },
    { clave: "mesacne", etiqueta: "V priemere za mesiac", formato: "moneda" },
    { clave: "plny", etiqueta: "Nárok bez obmedzení", formato: "moneda" },
    { clave: "strata", etiqueta: "Zníženie limitom alebo príjmom", formato: "moneda", ocultarSiCero: true },
  ],
});
