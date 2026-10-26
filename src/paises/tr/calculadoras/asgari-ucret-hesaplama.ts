import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { OPCIONES_TESVIK, primler } from "../lib/isveren";

export default definirCalculadora({
  id: "tr.asgari-ucret-hesaplama",
  mercado: "tr",
  concepto: "salario-minimo",
  slug: "asgari-ucret-hesaplama",
  estado: "publicado",
  requiere: {
    "tr.asgari-ucret": "numero",
    "tr.sgk-oranlari": "mapa",
    "tr.sgk-tesvik": "mapa",
    "tr.pek-sinirlari": "mapa",
  },
  campos: [
    { id: "gun", tipo: "entero", etiqueta: "Ay içinde çalışılan gün", min: 1, max: 30, porDefecto: 30, ayuda: "Tam ay için 30 gün girin. Eksik günlerde asgari ücret gün sayısına göre hesaplanır." },
    { id: "tesvik", tipo: "opcion", etiqueta: "İşveren maliyeti için SGK indirimi", opciones: OPCIONES_TESVIK, porDefecto: "diger" },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.gun < 1 || entrada.gun > 30) throw new ErrorEntrada("Gün sayısı 1 ile 30 arasında olmalı.", "gun");
    const aylik = valores["tr.asgari-ucret"];
    const gunluk = redondear(aylik / 30);
    const brut = entrada.gun === 30 ? aylik : redondear(gunluk * entrada.gun);
    // Asgari ücretin kendisi gelir ve damga vergisinden istisnadır: kesinti yalnızca primlerdir.
    const p = primler(brut, entrada.tesvik, valores, redondear);
    const net = redondear(brut - p.isciToplam);
    const isverenSgk = redondear(p.isverenMyo + p.isverenGss + p.isverenKvsk);
    return {
      brut,
      sgkIsci: redondear(p.isciMyo + p.isciGss),
      issizlikIsci: p.isciIssizlik,
      net,
      gunluk,
      isverenSgk,
      isverenIssizlik: p.isverenIssizlik,
      maliyet: redondear(brut + isverenSgk + p.isverenIssizlik),
      yillikBrut: redondear(aylik * 12),
    };
  },
  resultado: [
    { clave: "net", etiqueta: "Net asgari ücret", formato: "moneda", destacada: true },
    { clave: "brut", etiqueta: "Brüt asgari ücret", formato: "moneda" },
    { clave: "sgkIsci", etiqueta: "SGK işçi primi", formato: "moneda" },
    { clave: "issizlikIsci", etiqueta: "İşsizlik sigortası işçi primi", formato: "moneda" },
    { clave: "gunluk", etiqueta: "Günlük brüt asgari ücret", formato: "moneda" },
    { clave: "isverenSgk", etiqueta: "SGK işveren primi", formato: "moneda" },
    { clave: "isverenIssizlik", etiqueta: "İşsizlik sigortası işveren primi", formato: "moneda" },
    { clave: "maliyet", etiqueta: "İşverene toplam maliyet", formato: "moneda" },
    { clave: "yillikBrut", etiqueta: "Yıllık brüt asgari ücret (12 ay)", formato: "moneda" },
  ],
});
