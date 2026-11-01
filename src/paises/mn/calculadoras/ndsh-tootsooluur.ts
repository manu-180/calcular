import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { ajilOlgogch, ndshAjiltan, REQUIERE_EMPLEADOR, REQUIERE_NDSH, TUVSHIN_OPCIONES } from "../lib/nomina";

export default definirCalculadora({
  id: "mn.ndsh-tootsooluur",
  mercado: "mn",
  concepto: "aportes-seguridad-social",
  slug: "ndsh-tootsooluur",
  estado: "publicado",
  requiere: { ...REQUIERE_NDSH, ...REQUIERE_EMPLEADOR, "mn.hhdh-tsag": "numero" },
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Сарын бохир цалин", min: 0, porDefecto: 2000000 },
    { id: "tuvshin", tipo: "opcion", etiqueta: "ҮОМШӨ-ний даатгалын түвшин", opciones: TUVSHIN_OPCIONES, porDefecto: "1" },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Сарын бохир цалингаа оруулна уу.", "bruto");
    const a = ndshAjiltan(e.bruto, v);
    const o = ajilOlgogch(e.bruto, e.tuvshin, v);
    return {
      ajiltan: redondear(a.total),
      ajiltanNdsh: redondear(a.ndsh),
      ajiltanEmd: redondear(a.emd),
      tope: a.tope,
      ajilOlgogch: redondear(o.shimtgel),
      niit: redondear(a.total + o.shimtgel),
    };
  },
  resultado: [
    { clave: "ajiltan", etiqueta: "Ажилтны төлөх нийт шимтгэл", formato: "moneda", destacada: true },
    { clave: "ajiltanNdsh", etiqueta: "Үүнээс нийгмийн даатгал", formato: "moneda" },
    { clave: "ajiltanEmd", etiqueta: "Үүнээс эрүүл мэндийн даатгал", formato: "moneda" },
    { clave: "tope", etiqueta: "Шимтгэл ногдох дээд хэмжээ", formato: "moneda" },
    { clave: "ajilOlgogch", etiqueta: "Ажил олгогчийн төлөх шимтгэл", formato: "moneda" },
    { clave: "niit", etiqueta: "Сард төлөгдөх нийт шимтгэл", formato: "moneda" },
  ],
});
