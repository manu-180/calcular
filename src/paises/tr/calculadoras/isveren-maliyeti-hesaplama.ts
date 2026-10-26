import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { OPCIONES_TESVIK, primler, REQ_ISVEREN } from "../lib/isveren";

export default definirCalculadora({
  id: "tr.isveren-maliyeti-hesaplama",
  mercado: "tr",
  concepto: "costo-empleador",
  slug: "isveren-maliyeti-hesaplama",
  estado: "publicado",
  requiere: REQ_ISVEREN,
  campos: [
    { id: "brut", tipo: "moneda", etiqueta: "Çalışanın aylık brüt maaşı", min: 0, porDefecto: 50000 },
    { id: "tesvik", tipo: "opcion", etiqueta: "SGK işveren indirimi", opciones: OPCIONES_TESVIK, porDefecto: "diger", ayuda: "Primlerini zamanında ödeyen ve borcu olmayan özel sektör işverenleri indirimden yararlanır." },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.brut <= 0) throw new ErrorEntrada("Brüt maaşı girin.", "brut");
    const p = primler(entrada.brut, entrada.tesvik, valores, redondear);
    const sgkIsveren = redondear(p.isverenMyo + p.isverenGss + p.isverenKvsk);
    const toplam = redondear(entrada.brut + sgkIsveren + p.isverenIssizlik);
    const observaciones: string[] = [];
    if (entrada.brut > p.matrah) observaciones.push("Maaş SGK tavanını aştığı için primler tavan tutarı üzerinden hesaplandı.");
    return {
      toplam,
      sgkIsveren,
      sgkOrani: p.isverenSgkOrani,
      issizlikIsveren: p.isverenIssizlik,
      tesvik: p.tesvikTutari,
      yillik: redondear(toplam * 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "toplam", etiqueta: "İşverene aylık toplam maliyet", formato: "moneda", destacada: true },
    { clave: "sgkIsveren", etiqueta: "SGK işveren primi", formato: "moneda" },
    { clave: "sgkOrani", etiqueta: "Uygulanan SGK işveren oranı", formato: "porcentaje", decimales: 2 },
    { clave: "issizlikIsveren", etiqueta: "İşsizlik sigortası işveren primi", formato: "moneda" },
    { clave: "tesvik", etiqueta: "Hazine indirimi tutarı", formato: "moneda", ocultarSiCero: true },
    { clave: "yillik", etiqueta: "Yıllık maliyet (12 ay)", formato: "moneda" },
  ],
});
