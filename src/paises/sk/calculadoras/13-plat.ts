import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { cistaMzda } from "../lib/mzda";
import { parametreMzdy, REQUIERE_MZDY } from "../lib/parametre";

export default definirCalculadora({
  id: "sk.13-plat",
  mercado: "sk",
  concepto: "propio",
  slug: "13-plat",
  estado: "publicado",
  requiere: REQUIERE_MZDY,
  campos: [
    { id: "mzda", tipo: "moneda", etiqueta: "Bežná hrubá mzda za mesiac", min: 0, porDefecto: 1800 },
    { id: "plat", tipo: "moneda", etiqueta: "13. alebo 14. plat v hrubom", min: 0, porDefecto: 1800 },
    { id: "detiDo15", tipo: "entero", etiqueta: "Počet detí do 15 rokov s daňovým bonusom", min: 0, max: 10, porDefecto: 0 },
  ],
  calcular(e, v) {
    if (e.mzda <= 0 || e.plat <= 0) throw new ErrorEntrada("Zadajte mzdu aj sumu 13. platu.", "plat");
    const p = parametreMzdy(v);
    const bezny = cistaMzda(e.mzda, e.detiDo15, 0, true, p);
    const spolu = cistaMzda(e.mzda + e.plat, e.detiDo15, 0, true, p);
    return {
      cistyPlat: Math.round((spolu.cista - bezny.cista) * 100) / 100,
      cistaVTomMesiaci: spolu.cista,
      danNavyse: Math.round((spolu.dan - bezny.dan) * 100) / 100,
      cenaNavyse: Math.round((spolu.cena - bezny.cena) * 100) / 100,
    };
  },
  resultado: [
    { clave: "cistyPlat", etiqueta: "13. plat v čistom", formato: "moneda", destacada: true },
    { clave: "cistaVTomMesiaci", etiqueta: "Čistá mzda v mesiaci výplaty", formato: "moneda" },
    { clave: "danNavyse", etiqueta: "Daň navyše", formato: "moneda" },
    { clave: "cenaNavyse", etiqueta: "Náklad zamestnávateľa navyše", formato: "moneda" },
  ],
});
