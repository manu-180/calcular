import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { OPCIONES_TESVIK, primler, REQ_ISVEREN } from "../lib/isveren";

export default definirCalculadora({
  id: "tr.sgk-prim-hesaplama",
  mercado: "tr",
  concepto: "aportes-seguridad-social",
  slug: "sgk-prim-hesaplama",
  estado: "publicado",
  requiere: REQ_ISVEREN,
  campos: [
    { id: "brut", tipo: "moneda", etiqueta: "Aylık brüt kazanç", min: 0, porDefecto: 50000 },
    { id: "tesvik", tipo: "opcion", etiqueta: "SGK işveren indirimi", opciones: OPCIONES_TESVIK, porDefecto: "diger" },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.brut <= 0) throw new ErrorEntrada("Brüt kazancı girin.", "brut");
    const p = primler(entrada.brut, entrada.tesvik, valores, redondear);
    const observaciones: string[] = [];
    if (entrada.brut > p.matrah) observaciones.push("Kazancınız prime esas kazanç üst sınırını aşıyor: primler üst sınır üzerinden hesaplandı.");
    return {
      matrah: p.matrah,
      isciMyo: p.isciMyo,
      isciGss: p.isciGss,
      isciIssizlik: p.isciIssizlik,
      isciToplam: p.isciToplam,
      isverenMyo: p.isverenMyo,
      isverenGss: p.isverenGss,
      isverenKvsk: p.isverenKvsk,
      isverenIssizlik: p.isverenIssizlik,
      isverenToplam: p.isverenToplam,
      genelToplam: redondear(p.isciToplam + p.isverenToplam),
      observaciones,
    };
  },
  resultado: [
    { clave: "genelToplam", etiqueta: "Toplam SGK ve işsizlik primi", formato: "moneda", destacada: true },
    { clave: "matrah", etiqueta: "Prime esas kazanç", formato: "moneda" },
    { clave: "isciMyo", etiqueta: "İşçi: malullük, yaşlılık ve ölüm", formato: "moneda" },
    { clave: "isciGss", etiqueta: "İşçi: genel sağlık sigortası", formato: "moneda" },
    { clave: "isciIssizlik", etiqueta: "İşçi: işsizlik sigortası", formato: "moneda" },
    { clave: "isciToplam", etiqueta: "İşçi payı toplamı", formato: "moneda" },
    { clave: "isverenMyo", etiqueta: "İşveren: malullük, yaşlılık ve ölüm (indirim sonrası)", formato: "moneda" },
    { clave: "isverenGss", etiqueta: "İşveren: genel sağlık sigortası", formato: "moneda" },
    { clave: "isverenKvsk", etiqueta: "İşveren: kısa vadeli sigorta kolları", formato: "moneda" },
    { clave: "isverenIssizlik", etiqueta: "İşveren: işsizlik sigortası", formato: "moneda" },
    { clave: "isverenToplam", etiqueta: "İşveren payı toplamı", formato: "moneda" },
  ],
});
