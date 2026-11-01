import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { REQUIERE_NOMINA, tsever } from "../lib/nomina";

export default definirCalculadora({
  id: "mn.tsalingiin-tootsooluur",
  mercado: "mn",
  concepto: "sueldo-neto",
  slug: "tsalingiin-tootsooluur",
  estado: "publicado",
  requiere: REQUIERE_NOMINA,
  campos: [{ id: "bruto", tipo: "moneda", etiqueta: "Сарын бохир цалин", min: 0, porDefecto: 2000000, ayuda: "Суутгал хийхээс өмнөх нийт хөдөлмөрийн хөлс." }],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Сарын бохир цалингаа оруулна уу.", "bruto");
    const r = tsever(e.bruto, v);
    const observaciones: string[] = [];
    if (e.bruto < v["mn.hhdh-sar"]) observaciones.push("Цалин доод хэмжээнээс бага байна. Бүтэн цагийн ажилтны шимтгэлийг доод хэмжээнээс тооцдог тул дүн зөрж болно.");
    if (e.bruto > r.tope) observaciones.push("Нийгмийн даатгалын шимтгэл дээд хэмжээнээс тооцогдсон. Эрүүл мэндийн даатгалыг нийт цалингаас тооцов.");
    return {
      tsever: redondear(r.tsever),
      ndsh: redondear(r.ndsh),
      emd: redondear(r.emd),
      khkhoat: redondear(r.khkhoat),
      khongololt: redondear(r.khongololtJil / 12),
      niit: redondear(r.total + r.khkhoat),
      jiliinTsever: redondear(r.tsever * 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "tsever", etiqueta: "Гарт авах цэвэр цалин", formato: "moneda", destacada: true },
    { clave: "ndsh", etiqueta: "Нийгмийн даатгалын шимтгэл", formato: "moneda" },
    { clave: "emd", etiqueta: "Эрүүл мэндийн даатгалын шимтгэл", formato: "moneda" },
    { clave: "khkhoat", etiqueta: "ХХОАТ, хөнгөлөлтийн дараа", formato: "moneda" },
    { clave: "khongololt", etiqueta: "Үүнд тооцсон сарын хөнгөлөлт", formato: "moneda", ocultarSiCero: true },
    { clave: "niit", etiqueta: "Нийт суутгал", formato: "moneda" },
    { clave: "jiliinTsever", etiqueta: "Жилийн цэвэр цалин", formato: "moneda" },
  ],
});
