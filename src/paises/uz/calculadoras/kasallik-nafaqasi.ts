import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { belgilanganBayrammi, kunQoshish, yakshanbami } from "../lib/kalendar";

export default definirCalculadora({
  id: "uz.kasallik-nafaqasi",
  mercado: "uz",
  concepto: "propio",
  slug: "kasallik-nafaqasi",
  estado: "publicado",
  requiere: {
    "uz.kasallik-staj-koeffitsiyenti": "mapa",
    "uz.kasallik-imtiyoz": "numero",
    "uz.kasallik-kamaytirish": "numero",
    "uz.nafaqa-ish-haqi-chegarasi": "numero",
    "uz.ish-kunlari-ortacha": "numero",
    "uz.mhtekm": "numero",
    "uz.jshds": "mapa",
  },
  campos: [
    { id: "oylik", tipo: "moneda", etiqueta: "Oʻrtacha oylik ish haqi (oxirgi 12 oy)", min: 0, porDefecto: 6000000 },
    { id: "staj", tipo: "entero", etiqueta: "Sugʻurta stajingiz (oylarda)", min: 0, max: 720, porDefecto: 120, ayuda: "Ijtimoiy soliq yoki sugʻurta badali toʻlangan oylar." },
    { id: "boshlanish", tipo: "fecha", etiqueta: "Kasallik varaqasi boshlangan kun", min: "2026-07-01", porDefecto: "hoy" },
    { id: "kunlar", tipo: "entero", etiqueta: "Varaqadagi kalendar kunlar", min: 1, max: 182, porDefecto: 10 },
    { id: "oldingi", tipo: "entero", etiqueta: "Shu yil oldin kasallik varaqasida boʻlgan kunlar", min: 0, max: 365, porDefecto: 0 },
    { id: "hayit", tipo: "entero", etiqueta: "Davrga toʻgʻri kelgan hayit kunlari", min: 0, max: 2, porDefecto: 0 },
    { id: "imtiyoz", tipo: "si-no", etiqueta: "I yoki II guruh nogironligi, 18 yoshgacha 4 va undan ortiq farzand yoki nogironligi boʻlgan farzand bor", porDefecto: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.oylik <= 0) throw new ErrorEntrada("Oʻrtacha oylik ish haqini kiriting.", "oylik");
    if (e.boshlanish < "2026-07-01") throw new ErrorEntrada("Yangi tartib 2026-yil 1-iyuldan boshlangan kasallik varaqalariga qoʻllaniladi.", "boshlanish");
    if (e.staj < 6) throw new ErrorEntrada("Nafaqa olish uchun kamida olti oy sugʻurta staji kerak.", "staj");
    const sk = v["uz.kasallik-staj-koeffitsiyenti"];
    let koef = e.staj <= 96 ? enMapa(sk, "6-96-oy") : enMapa(sk, "97-oy-va-ortiq");
    if (e.imtiyoz) koef += v["uz.kasallik-imtiyoz"];
    const chegara = v["uz.nafaqa-ish-haqi-chegarasi"] * v["uz.mhtekm"];
    const asos = Math.min(e.oylik, chegara);
    let oddiy = 0;
    let kamaytirilgan = 0;
    let dam = 0;
    let tolanmaydi = 0;
    for (let i = 0; i < e.kunlar; i++) {
      const tartib = e.oldingi + i + 1;
      if (tartib > 182) {
        tolanmaydi++;
        continue;
      }
      const f = kunQoshish(e.boshlanish, i);
      if (yakshanbami(f) || belgilanganBayrammi(f)) {
        dam++;
        continue;
      }
      if (tartib > 77) kamaytirilgan++;
      else oddiy++;
    }
    const hayit = Math.min(e.hayit, oddiy + kamaytirilgan);
    const ayir = Math.min(hayit, oddiy);
    oddiy -= ayir;
    kamaytirilgan -= hayit - ayir;
    const kunlik = asos / v["uz.ish-kunlari-ortacha"];
    const koefKam = Math.max(0, koef - v["uz.kasallik-kamaytirish"]);
    const nafaqa = redondear(porcentaje(kunlik * oddiy, koef) + porcentaje(kunlik * kamaytirilgan, koefKam));
    const soliq = redondear(porcentaje(nafaqa, enMapa(v["uz.jshds"], "rezident-mehnat")));
    const observaciones: string[] = [];
    if (e.oylik > chegara) observaciones.push("Oʻrtacha ish haqingiz eng kam ish haqining oʻn baravaridan yuqori. Hisobda shu chegaragacha boʻlgan qismi olindi.");
    if (kamaytirilgan > 0) observaciones.push(`Yil boshidan 77 kalendar kundan oshgan kunlar uchun staj koeffitsiyenti ${v["uz.kasallik-kamaytirish"]} foiz bandga kamaytirildi.`);
    if (tolanmaydi > 0) observaciones.push("Bir kalendar yilda 182 kundan oshgan qismi uchun nafaqa toʻlanmaydi (bola parvarishi bundan mustasno).");
    observaciones.push("Nafaqaning beshinchi kungacha boʻlgan qismini ish beruvchi, oltinchi kundan boshlab Davlat ijtimoiy sugʻurta jamgʻarmasi toʻlaydi.");
    return {
      nafaqa,
      soliq,
      qolga: nafaqa - soliq,
      koef,
      kunlar: oddiy + kamaytirilgan,
      dam: dam + hayit,
      kunlik: redondear(kunlik),
      observaciones,
    };
  },
  resultado: [
    { clave: "nafaqa", etiqueta: "Kasallik nafaqasi (soliq ushlanmasdan oldin)", formato: "moneda", decimales: 0, destacada: true },
    { clave: "qolga", etiqueta: "Qoʻlga tegadigan summa", formato: "moneda", decimales: 0 },
    { clave: "soliq", etiqueta: "Daromad soligʻi", formato: "moneda", decimales: 0 },
    { clave: "koef", etiqueta: "Staj koeffitsiyenti", formato: "porcentaje" },
    { clave: "kunlar", etiqueta: "Haq toʻlanadigan kunlar", formato: "dias" },
    { clave: "dam", etiqueta: "Yakshanba va bayram kunlari (hisobga olinmaydi)", formato: "dias" },
    { clave: "kunlik", etiqueta: "Oʻrtacha kunlik ish haqi", formato: "moneda", decimales: 0 },
  ],
});
