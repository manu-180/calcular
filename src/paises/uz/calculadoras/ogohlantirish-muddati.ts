import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import type { FechaISO } from "@/motor/tipos";
import { kunQoshish } from "../lib/kalendar";

function oyQoshish(fecha: string, n: number): FechaISO {
  const y = Number(fecha.slice(0, 4));
  const m = Number(fecha.slice(5, 7)) - 1 + n;
  const d = Number(fecha.slice(8, 10));
  const yil = y + Math.floor(m / 12);
  const oy = (m % 12) + 1;
  const oxirgi = new Date(Date.UTC(yil, oy, 0)).getUTCDate();
  return `${yil}-${String(oy).padStart(2, "0")}-${String(Math.min(d, oxirgi)).padStart(2, "0")}` as FechaISO;
}

export default definirCalculadora({
  id: "uz.ogohlantirish-muddati",
  mercado: "uz",
  concepto: "preaviso",
  slug: "ogohlantirish-muddati",
  estado: "publicado",
  requiere: {
    "uz.ogohlantirish-oy": "numero",
    "uz.ogohlantirish-kun": "mapa",
  },
  campos: [
    {
      id: "asos",
      tipo: "opcion",
      etiqueta: "Shartnoma kimning tashabbusi va qanday asosda bekor qilinyapti?",
      opciones: [
        { valor: "xodim", etiqueta: "Xodim oʻz xohishi bilan ketyapti" },
        { valor: "tugatish", etiqueta: "Ish beruvchi: tashkilot tugatilishi yoki xodimlar soni (shtat) qisqarishi" },
        { valor: "malaka", etiqueta: "Ish beruvchi: xodimning malakasi yetarli emas" },
        { valor: "aybli", etiqueta: "Ish beruvchi: xodimning aybli harakatlari" },
      ],
      porDefecto: "xodim",
    },
    { id: "sana", tipo: "fecha", etiqueta: "Ariza yoki ogohlantirish berilgan kun", porDefecto: "hoy" },
    { id: "oylik", tipo: "moneda", etiqueta: "Oʻrtacha oylik ish haqi (kompensatsiya uchun, ixtiyoriy)", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.oylik !== null && e.oylik < 0) throw new ErrorEntrada("Ish haqi manfiy boʻlishi mumkin emas.", "oylik");
    const observaciones: string[] = [];
    if (e.asos === "tugatish") {
      const oy = v["uz.ogohlantirish-oy"];
      observaciones.push("Ogohlantirish muddatida xodim haftada kamida bir kun ish haqi saqlangan holda yangi ish qidirish uchun ishga chiqmasligi mumkin.");
      observaciones.push("Ish beruvchi ogohlantirishni muddatiga mos pulli kompensatsiya bilan almashtirishi mumkin.");
      return {
        muddat: `${oy} oy`,
        oxirgi: oyQoshish(e.sana, oy),
        kompensatsiya: e.oylik === null ? null : redondear(e.oylik * oy),
        observaciones,
      };
    }
    const kun = enMapa(v["uz.ogohlantirish-kun"], e.asos);
    if (e.asos === "xodim") {
      observaciones.push("Muddat ish beruvchi arizani olgan kunning ertasidan boshlanadi. Kelishuvga koʻra undan oldin ham ketish mumkin, muddat tugaguncha arizani qaytarib olish ham mumkin.");
    } else if (e.asos === "malaka") {
      observaciones.push("Ogohlantirish muddatida xodim haftada kamida bir kun ish haqi saqlangan holda yangi ish qidirish uchun ishga chiqmasligi mumkin.");
    }
    return {
      muddat: `${kun} kalendar kun`,
      oxirgi: kunQoshish(e.sana, kun),
      kompensatsiya: null,
      observaciones,
    };
  },
  resultado: [
    { clave: "muddat", etiqueta: "Ogohlantirish muddati (kamida)", formato: "texto", destacada: true },
    { clave: "oxirgi", etiqueta: "Muddat tugaydigan kun", formato: "fecha" },
    { clave: "kompensatsiya", etiqueta: "Ogohlantirish oʻrniga kompensatsiya", formato: "moneda", decimales: 0 },
  ],
});
