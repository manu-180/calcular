import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { netoOtBruto, REQ_ZAPLATA } from "../lib/zaplata";

export default definirCalculadora({
  id: "bg.razhodi-na-rabotodatelya",
  mercado: "bg",
  concepto: "costo-empleador",
  slug: "razhodi-na-rabotodatelya",
  estado: "publicado",
  requiere: { ...REQ_ZAPLATA, "bg.vnoski-rabotodatel": "mapa", "bg.tzpb": "mapa" },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Брутна месечна заплата", min: 0, porDefecto: 1500 },
    { id: "tzpb", tipo: "opcion-dato", etiqueta: "Вноска за трудова злополука според дейността", dato: "bg.tzpb", porDefecto: "r04", ayuda: "Точният код на дейността е в приложение № 2А към бюджета на ДОО." },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Въведете брутна заплата над нула.", "bruto");
    const maks = v["bg.maks-osig-dohod"];
    const osnova = Math.min(e.bruto, maks);
    const r = v["bg.vnoski-rabotodatel"];
    const dyal = (s: number) => redondear((osnova * s) / 100);
    const pensii = dyal(enMapa(r, "pensii"));
    const ozm = dyal(enMapa(r, "ozm"));
    const bezrabotitsa = dyal(enMapa(r, "bezrabotitsa"));
    const dzpo = dyal(enMapa(r, "dzpo"));
    const zdravno = dyal(enMapa(v["bg.zdravna-vnoska"], "rabotodatel"));
    const zlopoluka = dyal(enMapa(v["bg.tzpb"], e.tzpb));
    const vnoski = redondear(pensii + ozm + bezrabotitsa + dzpo + zdravno + zlopoluka);
    const razhod = redondear(e.bruto + vnoski);
    const f = netoOtBruto(e.bruto, { rabotnik: v["bg.vnoski-rabotnik"], zdravna: v["bg.zdravna-vnoska"], danak: v["bg.danak-dohodi"], maks }, redondear);
    return { razhod, vnoski, pensii, ozm, bezrabotitsa, dzpo, zdravno, zlopoluka, neto: f.neto, razhodGodishno: redondear(razhod * 12) };
  },
  resultado: [
    { clave: "razhod", etiqueta: "Разход на работодателя на месец", formato: "moneda", destacada: true },
    { clave: "vnoski", etiqueta: "Вноски за сметка на работодателя", formato: "moneda" },
    { clave: "pensii", etiqueta: "Фонд „Пенсии“", formato: "moneda" },
    { clave: "ozm", etiqueta: "Общо заболяване и майчинство", formato: "moneda" },
    { clave: "bezrabotitsa", etiqueta: "Фонд „Безработица“", formato: "moneda" },
    { clave: "dzpo", etiqueta: "Допълнителна задължителна пенсия", formato: "moneda" },
    { clave: "zdravno", etiqueta: "Здравна вноска", formato: "moneda" },
    { clave: "zlopoluka", etiqueta: "Трудова злополука и професионална болест", formato: "moneda" },
    { clave: "neto", etiqueta: "Нетна заплата на работника", formato: "moneda" },
    { clave: "razhodGodishno", etiqueta: "Разход за 12 месеца", formato: "moneda" },
  ],
});
