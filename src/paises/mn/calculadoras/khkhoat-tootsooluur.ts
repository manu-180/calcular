import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { khkhoatJiliin } from "../lib/nomina";

export default definirCalculadora({
  id: "mn.khkhoat-tootsooluur",
  mercado: "mn",
  concepto: "impuesto-renta",
  slug: "khkhoat-tootsooluur",
  estado: "publicado",
  requiere: {
    "mn.khkhoat": "escala",
    "mn.khongololt": "escala",
  },
  campos: [{ id: "orlogo", tipo: "moneda", etiqueta: "Татвар ногдох жилийн орлого", min: 0, porDefecto: 20000000, ayuda: "Жилийн цалингаас нийгмийн болон эрүүл мэндийн даатгалын шимтгэлийг хассан дүн." }],
  calcular(e, v, { redondear }) {
    if (e.orlogo <= 0) throw new ErrorEntrada("Жилийн орлогоо оруулна уу.", "orlogo");
    const k = khkhoatJiliin(e.orlogo, v);
    return {
      tolokh: redondear(k.tolokh),
      tatvar: redondear(k.tatvar),
      khongololt: redondear(k.khongololt),
      sar: redondear(k.tolokh / 12),
      bodit: (k.tolokh / e.orlogo) * 100,
    };
  },
  resultado: [
    { clave: "tolokh", etiqueta: "Жилд төлөх ХХОАТ", formato: "moneda", destacada: true },
    { clave: "tatvar", etiqueta: "Хөнгөлөлтийн өмнөх татвар", formato: "moneda" },
    { clave: "khongololt", etiqueta: "Жилийн хөнгөлөлт", formato: "moneda" },
    { clave: "sar", etiqueta: "Сард ногдох дүн", formato: "moneda" },
    { clave: "bodit", etiqueta: "Орлогод эзлэх бодит хувь", formato: "porcentaje", decimales: 2 },
  ],
});
