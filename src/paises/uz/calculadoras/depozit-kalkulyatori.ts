import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "uz.depozit-kalkulyatori",
  mercado: "uz",
  concepto: "plazo-fijo",
  slug: "depozit-kalkulyatori",
  estado: "publicado",
  requiere: {},
  campos: [
    { id: "summa", tipo: "moneda", etiqueta: "Omonat summasi", min: 0, porDefecto: 10000000 },
    { id: "foiz", tipo: "porcentaje", etiqueta: "Yillik foiz stavkasi (%)", min: 0, max: 100, porDefecto: 20 },
    { id: "oylar", tipo: "entero", etiqueta: "Muddat (oy)", min: 1, max: 120, porDefecto: 12 },
    {
      id: "usul",
      tipo: "opcion",
      etiqueta: "Foiz qanday hisoblanadi?",
      opciones: [
        { valor: "oddiy", etiqueta: "Har oy toʻlanadi yoki muddat oxirida (kapitallashuvsiz)" },
        { valor: "kapitallashuv", etiqueta: "Har oy omonatga qoʻshiladi (kapitallashuv)" },
      ],
      porDefecto: "oddiy",
    },
    { id: "toldirish", tipo: "moneda", etiqueta: "Har oy qoʻshiladigan summa (ixtiyoriy)", min: 0, porDefecto: 0, requerido: false },
  ],
  calcular(e, _v, { redondear }) {
    if (e.summa <= 0) throw new ErrorEntrada("Omonat summasini kiriting.", "summa");
    const r = e.foiz / 100 / 12;
    const qoshimcha = e.toldirish ?? 0;
    let qoldiq = e.summa;
    let foizlar = 0;
    for (let i = 0; i < e.oylar; i++) {
      const f = qoldiq * r;
      foizlar += f;
      if (e.usul === "kapitallashuv") qoldiq += f;
      if (i < e.oylar - 1) qoldiq += qoshimcha;
    }
    const kiritilgan = e.summa + qoshimcha * (e.oylar - 1);
    const daromad = redondear(foizlar);
    return {
      daromad,
      jami: redondear(kiritilgan + foizlar),
      kiritilgan: redondear(kiritilgan),
      samarali: e.usul === "kapitallashuv" ? (Math.pow(1 + r, 12) - 1) * 100 : e.foiz,
      observaciones: ["Banklardagi omonatlar boʻyicha foizlar jismoniy shaxslar uchun daromad soligʻidan ozod (Soliq kodeksi, 378-modda)."],
    };
  },
  resultado: [
    { clave: "daromad", etiqueta: "Foiz daromadi", formato: "moneda", decimales: 0, destacada: true },
    { clave: "jami", etiqueta: "Muddat oxirida jami", formato: "moneda", decimales: 0 },
    { clave: "kiritilgan", etiqueta: "Siz qoʻygan summa", formato: "moneda", decimales: 0 },
    { clave: "samarali", etiqueta: "Samarali yillik stavka", formato: "porcentaje", decimales: 2 },
  ],
});
