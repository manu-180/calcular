import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "uz.eng-kam-ish-haqi",
  mercado: "uz",
  concepto: "salario-minimo",
  slug: "eng-kam-ish-haqi",
  estado: "publicado",
  requiere: {
    "uz.mhtekm": "numero",
    "uz.jshds": "mapa",
  },
  campos: [
    { id: "ulush", tipo: "porcentaje", etiqueta: "Ish vaqtingiz toʻliq stavkaga nisbatan (%)", min: 1, max: 100, porDefecto: 100, ayuda: "Toʻliq ish vaqti 100, yarim stavka 50." },
    { id: "maosh", tipo: "moneda", etiqueta: "Hozirgi oylik maoshingiz (ixtiyoriy)", min: 0, requerido: false },
  ],
  calcular(e, v, { redondear }) {
    if (e.ulush <= 0 || e.ulush > 100) throw new ErrorEntrada("Ish vaqti ulushi 1 dan 100 gacha boʻlishi kerak.", "ulush");
    const mhtekm = v["uz.mhtekm"];
    const engKam = redondear(porcentaje(mhtekm, e.ulush));
    const sof = engKam - redondear(porcentaje(engKam, enMapa(v["uz.jshds"], "rezident-mehnat")));
    const observaciones: string[] = [];
    let farq: number | null = null;
    if (e.maosh !== null && e.maosh > 0) {
      farq = redondear(e.maosh - engKam);
      observaciones.push(farq < 0 ? "Maoshingiz eng kam miqdordan past. Ish beruvchi uni kamida eng kam miqdorgacha oshirishi kerak." : "Maoshingiz eng kam miqdordan past emas.");
    }
    return { mhtekm, engKam, sof, farq, observaciones };
  },
  resultado: [
    { clave: "engKam", etiqueta: "Sizning ish vaqtingiz uchun eng kam oylik", formato: "moneda", decimales: 0, destacada: true },
    { clave: "mhtekm", etiqueta: "Mehnatga haq toʻlashning eng kam miqdori (toʻliq stavka)", formato: "moneda", decimales: 0 },
    { clave: "sof", etiqueta: "Daromad soligʻidan keyin qoʻlga tegadi", formato: "moneda", decimales: 0 },
    { clave: "farq", etiqueta: "Maoshingiz va eng kam miqdor farqi", formato: "moneda", decimales: 0 },
  ],
});
