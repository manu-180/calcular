import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "uz.mol-mulk-soligi-kalkulyatori",
  mercado: "uz",
  concepto: "propio",
  slug: "mol-mulk-soligi-kalkulyatori",
  estado: "publicado",
  requiere: {
    "uz.mol-mulk-soligi": "mapa",
    "uz.mol-mulk-eng-kam-baza": "numero",
  },
  campos: [
    { id: "qiymat", tipo: "moneda", etiqueta: "Kadastr qiymati", min: 0, porDefecto: 400000000 },
    { id: "turi", tipo: "opcion-dato", dato: "uz.mol-mulk-soligi", etiqueta: "Mol-mulk turi", porDefecto: "asosiy" },
    { id: "maydon", tipo: "numero", etiqueta: "Umumiy maydoni (kv.m)", min: 1, max: 100000, porDefecto: 80 },
    { id: "koef", tipo: "numero", etiqueta: "Hududiy koeffitsiyent (bilmasangiz 1)", min: 0.7, max: 1.3, porDefecto: 1, ayuda: "Mahalliy Kengash stavkaga 0,7 dan 1,3 gacha koeffitsiyent qoʻllashi mumkin." },
    { id: "imtiyoz", tipo: "si-no", etiqueta: "Pensioner, I yoki II guruh nogironligi bor yoki oʻn va undan ortiq farzandli ota-onaman", porDefecto: false },
    { id: "oylar", tipo: "entero", etiqueta: "Yil davomida mulkka egalik qilgan oylar", min: 1, max: 12, porDefecto: 12 },
  ],
  calcular(e, v, { redondear }) {
    if (e.qiymat <= 0) throw new ErrorEntrada("Kadastr qiymatini kiriting.", "qiymat");
    if (e.koef < 0.7 || e.koef > 1.3) throw new ErrorEntrada("Koeffitsiyent 0,7 dan 1,3 gacha boʻladi.", "koef");
    const stavka = enMapa(v["uz.mol-mulk-soligi"], e.turi);
    const tadbirkorlik = e.turi === "tadbirkorlik";
    let baza = tadbirkorlik ? e.qiymat : Math.max(e.qiymat, v["uz.mol-mulk-eng-kam-baza"]);
    const observaciones: string[] = [];
    if (!tadbirkorlik && e.qiymat < v["uz.mol-mulk-eng-kam-baza"]) observaciones.push("Kadastr qiymati soliq bazasining eng kam miqdoridan past, shuning uchun hisobda eng kam miqdor olindi.");
    if (e.imtiyoz && !tadbirkorlik) {
      baza = (baza * Math.max(0, e.maydon - 60)) / e.maydon;
      observaciones.push("Imtiyoz faqat bitta uy-joyga va 60 kv.m doirasida qoʻllaniladi. Hujjatlarni soliq organiga oʻzingiz taqdim etasiz.");
    }
    const soliq = redondear((porcentaje(baza, stavka) * e.koef * e.oylar) / 12);
    return { soliq, yarmi: redondear(soliq / 2), stavka, baza: redondear(baza), observaciones };
  },
  resultado: [
    { clave: "soliq", etiqueta: "Yillik mol-mulk soligʻi", formato: "moneda", decimales: 0, destacada: true },
    { clave: "yarmi", etiqueta: "15-aprel va 15-oktabrgacha toʻlanadigan har bir qism", formato: "moneda", decimales: 0 },
    { clave: "stavka", etiqueta: "Soliq stavkasi", formato: "porcentaje" },
    { clave: "baza", etiqueta: "Soliq bazasi", formato: "moneda", decimales: 0 },
  ],
});
