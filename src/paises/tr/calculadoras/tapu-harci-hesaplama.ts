import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "tr.tapu-harci-hesaplama",
  mercado: "tr",
  concepto: "propio",
  slug: "tapu-harci-hesaplama",
  estado: "publicado",
  requiere: { "tr.tapu-harci": "numero" },
  campos: [
    { id: "bedel", tipo: "moneda", etiqueta: "Tapuda beyan edilecek satış bedeli", min: 0, porDefecto: 3000000 },
    {
      id: "emlakDegeri",
      tipo: "moneda",
      etiqueta: "Taşınmazın emlak vergisi değeri",
      min: 0,
      requerido: false,
      ayuda: "Belediyeden öğrenilir. Harç, beyan edilen bedel bu değerden düşükse emlak vergisi değeri üzerinden alınır.",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.bedel <= 0) throw new ErrorEntrada("Satış bedelini girin.", "bedel");
    const matrah = Math.max(entrada.bedel, entrada.emlakDegeri ?? 0);
    const oran = valores["tr.tapu-harci"];
    const alici = redondear(porcentaje(matrah, oran));
    const satici = redondear(porcentaje(matrah, oran));
    const observaciones: string[] = [];
    if (matrah > entrada.bedel) observaciones.push("Beyan edilen bedel emlak vergisi değerinin altında olduğu için harç emlak vergisi değeri üzerinden hesaplandı.");
    observaciones.push("Tapu harcına ek olarak Tapu ve Kadastro Genel Müdürlüğünün döner sermaye ücreti de ödenir.");
    return { toplam: redondear(alici + satici), alici, satici, matrah, oran, observaciones };
  },
  resultado: [
    { clave: "toplam", etiqueta: "Toplam tapu harcı (alıcı ve satıcı)", formato: "moneda", destacada: true },
    { clave: "alici", etiqueta: "Alıcının ödeyeceği harç", formato: "moneda" },
    { clave: "satici", etiqueta: "Satıcının ödeyeceği harç", formato: "moneda" },
    { clave: "matrah", etiqueta: "Harca esas değer", formato: "moneda" },
    { clave: "oran", etiqueta: "Harç oranı (her taraf için)", formato: "porcentaje" },
  ],
});
