import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { bordroAyi, OPCIONES_AY, REQ_BORDRO, tabloYillik, yillikBordro } from "../lib/bordro";

export default definirCalculadora({
  id: "tr.brutten-nete-maas-hesaplama",
  mercado: "tr",
  concepto: "sueldo-neto",
  slug: "brutten-nete-maas-hesaplama",
  estado: "publicado",
  requiere: REQ_BORDRO,
  campos: [
    { id: "brut", tipo: "moneda", etiqueta: "Aylık brüt maaş", min: 0, porDefecto: 50000 },
    {
      id: "ay",
      tipo: "opcion",
      etiqueta: "Hesaplanacak ay",
      opciones: OPCIONES_AY,
      porDefecto: "1",
      ayuda: "Gelir vergisi yıl içinde biriken matraha göre hesaplandığı için net maaş aydan aya değişir. Yılbaşından beri aynı brüt maaşı aldığınız varsayılır.",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.brut <= 0) throw new ErrorEntrada("Brüt maaşı girin.", "brut");
    const ay = Number(entrada.ay);
    const yil = yillikBordro(entrada.brut, valores, redondear);
    const s = bordroAyi(entrada.brut, ay, yil[ay - 1].kumulatifOnce, valores, redondear);
    const yillikNet = redondear(yil.reduce((t, x) => t + x.net, 0));
    const observaciones: string[] = [];
    if (entrada.brut < valores["tr.asgari-ucret"]) observaciones.push("Girdiğiniz tutar brüt asgari ücretin altında. Tam süreli çalışmada maaş asgari ücretten az olamaz.");
    if (entrada.brut > s.sgkMatrahi) observaciones.push("Maaşınız SGK tavanını aşıyor: prim, tavan tutarı üzerinden kesilir.");
    return {
      net: s.net,
      sgkIsci: s.sgkIsci,
      issizlikIsci: s.issizlikIsci,
      gvMatrahi: s.gvMatrahi,
      kumulatif: s.kumulatifOnce,
      gvHesaplanan: s.gvHesaplanan,
      gvIstisna: s.gvIstisna,
      gelirVergisi: s.gelirVergisi,
      damgaVergisi: s.damgaVergisi,
      toplamKesinti: redondear(entrada.brut - s.net),
      dilim: s.dilim,
      yillikNet,
      ortalamaNet: redondear(yillikNet / 12),
      yillik: tabloYillik(yil),
      observaciones,
    };
  },
  resultado: [
    { clave: "net", etiqueta: "Net maaş (seçilen ay)", formato: "moneda", destacada: true },
    { clave: "sgkIsci", etiqueta: "SGK işçi primi", formato: "moneda" },
    { clave: "issizlikIsci", etiqueta: "İşsizlik sigortası işçi primi", formato: "moneda" },
    { clave: "gvMatrahi", etiqueta: "Gelir vergisi matrahı", formato: "moneda" },
    { clave: "kumulatif", etiqueta: "Önceki ayların kümülatif matrahı", formato: "moneda", ocultarSiCero: true },
    { clave: "gvHesaplanan", etiqueta: "Hesaplanan gelir vergisi", formato: "moneda" },
    { clave: "gvIstisna", etiqueta: "Asgari ücret gelir vergisi istisnası", formato: "moneda" },
    { clave: "gelirVergisi", etiqueta: "Kesilecek gelir vergisi", formato: "moneda" },
    { clave: "damgaVergisi", etiqueta: "Damga vergisi", formato: "moneda" },
    { clave: "toplamKesinti", etiqueta: "Toplam kesinti", formato: "moneda" },
    { clave: "dilim", etiqueta: "Vergi dilimi", formato: "porcentaje" },
    { clave: "yillikNet", etiqueta: "Yıllık toplam net", formato: "moneda" },
    { clave: "ortalamaNet", etiqueta: "Yıllık ortalama aylık net", formato: "moneda" },
  ],
  tablas: [{ clave: "yillik", titulo: "Ay ay net maaş", filasVisibles: 12 }],
  mundo: { bruto: "brut", periodoBruto: "mes", neto: "ortalamaNet", periodoNeto: "mes", entrada: { ay: "1" } },
});
