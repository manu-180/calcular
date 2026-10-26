import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { davrniSanash, kunQoshish } from "../lib/kalendar";

export default definirCalculadora({
  id: "uz.dekret-puli-hisoblash",
  mercado: "uz",
  concepto: "propio",
  slug: "dekret-puli-hisoblash",
  estado: "publicado",
  requiere: {
    "uz.homiladorlik-staj-koeffitsiyenti": "mapa",
    "uz.homiladorlik-kunlari": "mapa",
    "uz.nafaqa-ish-haqi-chegarasi": "numero",
    "uz.ish-kunlari-ortacha": "numero",
    "uz.mhtekm": "numero",
  },
  campos: [
    { id: "oylik", tipo: "moneda", etiqueta: "Oʻrtacha oylik ish haqi (oxirgi 12 oy)", min: 0, porDefecto: 6000000 },
    { id: "staj", tipo: "entero", etiqueta: "Sugʻurta stajingiz (oylarda)", min: 0, max: 720, porDefecto: 36 },
    { id: "turi", tipo: "opcion-dato", dato: "uz.homiladorlik-kunlari", etiqueta: "Tugʻruq", porDefecto: "oddiy" },
    { id: "boshlanish", tipo: "fecha", etiqueta: "Dekret taʼtili boshlanadigan kun", porDefecto: "hoy" },
  ],
  calcular(e, v, { redondear }) {
    if (e.oylik <= 0) throw new ErrorEntrada("Oʻrtacha oylik ish haqini kiriting.", "oylik");
    if (e.staj < 10) throw new ErrorEntrada("Homiladorlik va tugʻish nafaqasi uchun kamida oʻn oy sugʻurta staji kerak.", "staj");
    const sk = v["uz.homiladorlik-staj-koeffitsiyenti"];
    const koef = e.staj <= 24 ? enMapa(sk, "10-24-oy") : e.staj <= 60 ? enMapa(sk, "25-60-oy") : enMapa(sk, "61-oy-va-ortiq");
    const chegara = v["uz.nafaqa-ish-haqi-chegarasi"] * v["uz.mhtekm"];
    const asos = Math.min(e.oylik, chegara);
    const kalendar = enMapa(v["uz.homiladorlik-kunlari"], e.turi);
    const davr = davrniSanash(e.boshlanish, kalendar);
    const kunlar = davr.kalendar - davr.yakshanba - davr.bayram;
    const nafaqa = redondear(porcentaje((asos / v["uz.ish-kunlari-ortacha"]) * kunlar, koef));
    const observaciones: string[] = [];
    if (e.oylik > chegara) observaciones.push("Oʻrtacha ish haqingiz eng kam ish haqining oʻn baravaridan yuqori. Hisobda shu chegaragacha boʻlgan qismi olindi.");
    observaciones.push("Shuningdek, nafaqa uchun sugʻurta hodisasidan oldingi oxirgi olti oy davomida uzluksiz sugʻurta staji boʻlishi kerak.");
    observaciones.push("Roʻza hayit yoki Qurbon hayit taʼtil davriga toʻgʻri kelsa, shu kunlar ham hisobga olinmaydi va summa biroz kamayadi.");
    return {
      nafaqa,
      koef,
      kalendar,
      kunlar,
      dam: davr.yakshanba + davr.bayram,
      tugash: kunQoshish(e.boshlanish, kalendar - 1),
      observaciones,
    };
  },
  resultado: [
    { clave: "nafaqa", etiqueta: "Homiladorlik va tugʻish nafaqasi", formato: "moneda", decimales: 0, destacada: true },
    { clave: "koef", etiqueta: "Staj koeffitsiyenti", formato: "porcentaje" },
    { clave: "kalendar", etiqueta: "Taʼtil davomiyligi", formato: "dias" },
    { clave: "kunlar", etiqueta: "Haq toʻlanadigan kunlar", formato: "dias" },
    { clave: "dam", etiqueta: "Yakshanba va bayram kunlari (hisobga olinmaydi)", formato: "dias" },
    { clave: "tugash", etiqueta: "Taʼtilning oxirgi kuni", formato: "fecha" },
  ],
});
