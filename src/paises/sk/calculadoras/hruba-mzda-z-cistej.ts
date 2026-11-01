import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { cistaMzda, hrubaZCistej } from "../lib/mzda";
import { parametreMzdy, REQUIERE_MZDY } from "../lib/parametre";

export default definirCalculadora({
  id: "sk.hruba-mzda-z-cistej",
  mercado: "sk",
  concepto: "propio",
  slug: "hruba-mzda-z-cistej",
  estado: "publicado",
  requiere: REQUIERE_MZDY,
  campos: [
    { id: "cista", tipo: "moneda", etiqueta: "Čistá mzda, ktorú chcete dostať", min: 0, porDefecto: 1500 },
    { id: "nczd", tipo: "si-no", etiqueta: "Uplatňujete nezdaniteľnú časť základu dane", porDefecto: true },
    { id: "detiDo15", tipo: "entero", etiqueta: "Počet detí do 15 rokov s daňovým bonusom", min: 0, max: 10, porDefecto: 0 },
    { id: "deti15az18", tipo: "entero", etiqueta: "Počet detí od 15 do 18 rokov s daňovým bonusom", min: 0, max: 10, porDefecto: 0 },
  ],
  calcular(e, v) {
    if (e.cista <= 0) throw new ErrorEntrada("Zadajte čistú mzdu vyššiu ako nula.", "cista");
    const p = parametreMzdy(v);
    const hruba = hrubaZCistej(e.cista, e.detiDo15, e.deti15az18, e.nczd, p);
    const m = cistaMzda(hruba, e.detiDo15, e.deti15az18, e.nczd, p);
    return { hruba, cistaOverenie: m.cista, odvody: Math.round((m.socialne + m.zdravotne) * 100) / 100, dan: m.dan, cena: m.cena };
  },
  resultado: [
    { clave: "hruba", etiqueta: "Potrebná hrubá mzda", formato: "moneda", destacada: true },
    { clave: "cistaOverenie", etiqueta: "Čistá mzda pri tejto hrubej mzde", formato: "moneda" },
    { clave: "odvody", etiqueta: "Odvody zamestnanca spolu", formato: "moneda" },
    { clave: "dan", etiqueta: "Preddavok na daň", formato: "moneda" },
    { clave: "cena", etiqueta: "Celková cena práce", formato: "moneda" },
  ],
});
