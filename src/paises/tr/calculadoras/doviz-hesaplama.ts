import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "tr.doviz-hesaplama",
  mercado: "tr",
  concepto: "tipo-de-cambio",
  slug: "doviz-hesaplama",
  estado: "publicado",
  requiere: {
    "tr.usd": "serie",
    "tr.eur": "serie",
    "tr.gbp": "serie",
  },
  campos: [
    { id: "tutar", tipo: "numero", etiqueta: "Tutar", min: 0, porDefecto: 100 },
    {
      id: "doviz",
      tipo: "opcion",
      etiqueta: "Döviz",
      opciones: [
        { valor: "usd", etiqueta: "ABD doları (USD)" },
        { valor: "eur", etiqueta: "Euro (EUR)" },
        { valor: "gbp", etiqueta: "İngiliz sterlini (GBP)" },
      ],
      porDefecto: "usd",
    },
    {
      id: "yon",
      tipo: "opcion",
      etiqueta: "Çevirme yönü",
      opciones: [
        { valor: "tl", etiqueta: "Dövizden Türk lirasına" },
        { valor: "doviz", etiqueta: "Türk lirasından dövize" },
      ],
      porDefecto: "tl",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.tutar <= 0) throw new ErrorEntrada("Tutarı girin.", "tutar");
    const nokta = e.doviz === "eur" ? v["tr.eur"] : e.doviz === "gbp" ? v["tr.gbp"] : v["tr.usd"];
    const kur = nokta.valor;
    return {
      tl: e.yon === "tl" ? redondear(e.tutar * kur) : null,
      dovizTutari: e.yon === "doviz" ? redondear(e.tutar / kur) : null,
      kur,
      tarih: nokta.fecha,
      observaciones: ["TCMB'nin gösterge niteliğindeki döviz alış kurudur. Bankalar ve döviz büroları kendi alış ve satış kurlarını uygular."],
    };
  },
  resultado: [
    { clave: "tl", etiqueta: "Türk lirası karşılığı", formato: "moneda", destacada: true },
    { clave: "dovizTutari", etiqueta: "Döviz karşılığı", formato: "numero", decimales: 2, destacada: true },
    { clave: "kur", etiqueta: "TCMB döviz alış kuru (TL)", formato: "numero", decimales: 4 },
    { clave: "tarih", etiqueta: "Kur tarihi", formato: "fecha" },
  ],
});
