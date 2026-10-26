import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "tr.fazla-mesai-hesaplama",
  mercado: "tr",
  concepto: "horas-extra",
  slug: "fazla-mesai-hesaplama",
  estado: "publicado",
  requiere: { "tr.fazla-mesai": "mapa" },
  campos: [
    {
      id: "modo",
      tipo: "opcion",
      etiqueta: "Ücretinizi nasıl gireceksiniz?",
      opciones: [
        { valor: "aylik", etiqueta: "Aylık brüt ücret" },
        { valor: "saatlik", etiqueta: "Saatlik brüt ücret" },
      ],
      porDefecto: "aylik",
    },
    { id: "aylik", tipo: "moneda", etiqueta: "Aylık brüt ücret", min: 0, porDefecto: 50000, visibleSi: { modo: ["aylik"] } },
    { id: "saatlik", tipo: "moneda", etiqueta: "Saatlik brüt ücret", min: 0, porDefecto: 200, visibleSi: { modo: ["saatlik"] } },
    {
      id: "tur",
      tipo: "opcion",
      etiqueta: "Çalışma türü",
      opciones: [
        { valor: "fazla-calisma", etiqueta: "Fazla çalışma (haftalık 45 saati aşan)" },
        { valor: "fazla-sure", etiqueta: "Fazla sürelerle çalışma (sözleşmedeki süreyi aşan, 45 saate kadar)" },
      ],
      porDefecto: "fazla-calisma",
    },
    { id: "saat", tipo: "numero", etiqueta: "Fazla çalışılan saat", min: 0, porDefecto: 10 },
  ],
  calcular(entrada, valores, { redondear }) {
    const m = valores["tr.fazla-mesai"];
    if (entrada.saat <= 0) throw new ErrorEntrada("Fazla çalıştığınız saati girin.", "saat");
    // Aylık ücret 30 güne, günlük ücret 7,5 saate bölünür: haftalık 45 saat altı iş gününe eşit
    // dağıtılır (İş Kanunu md. 63) ve saat ücretlinin günlük ücreti saat ücretinin 7,5 katıdır (md. 49).
    const gunlukSaat = enMapa(m, "haftalik-sure") / 6;
    const saatlik = entrada.modo === "aylik" ? redondear((entrada.aylik ?? 0) / 30 / gunlukSaat) : (entrada.saatlik ?? 0);
    if (saatlik <= 0) throw new ErrorEntrada("Ücretinizi girin.", entrada.modo === "aylik" ? "aylik" : "saatlik");
    const zam = entrada.tur === "fazla-calisma" ? enMapa(m, "fazla-calisma-zam") : enMapa(m, "fazla-sure-zam");
    const zamliSaatlik = redondear(saatlik + porcentaje(saatlik, zam));
    const toplam = redondear(zamliSaatlik * entrada.saat);
    const serbestZaman = redondear(entrada.saat * (1 + zam / 100));
    const observaciones: string[] = [];
    if (entrada.saat > enMapa(m, "yillik-azami")) observaciones.push(`Bir yıldaki fazla çalışma toplamı için üst sınır: ${enMapa(m, "yillik-azami")} saat.`);
    return { toplam, saatlik, zam, zamliSaatlik, serbestZaman, observaciones };
  },
  resultado: [
    { clave: "toplam", etiqueta: "Brüt fazla mesai ücreti", formato: "moneda", destacada: true },
    { clave: "saatlik", etiqueta: "Normal saatlik brüt ücret", formato: "moneda" },
    { clave: "zam", etiqueta: "Zam oranı", formato: "porcentaje" },
    { clave: "zamliSaatlik", etiqueta: "Zamlı saatlik ücret", formato: "moneda" },
    { clave: "serbestZaman", etiqueta: "Ücret yerine kullanılabilecek serbest zaman", formato: "horas", decimales: 2 },
  ],
});
