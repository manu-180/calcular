import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { ajilOlgogch, REQUIERE_EMPLEADOR, TUVSHIN_OPCIONES } from "../lib/nomina";

export default definirCalculadora({
  id: "mn.ajil-olgogchiin-zardal-tootsooluur",
  mercado: "mn",
  concepto: "costo-empleador",
  slug: "ajil-olgogchiin-zardal-tootsooluur",
  estado: "publicado",
  requiere: REQUIERE_EMPLEADOR,
  campos: [
    { id: "bruto", tipo: "moneda", etiqueta: "Ажилтны сарын бохир цалин", min: 0, porDefecto: 2000000 },
    { id: "tuvshin", tipo: "opcion", etiqueta: "ҮОМШӨ-ний даатгалын түвшин", opciones: TUVSHIN_OPCIONES, porDefecto: "1", ayuda: "Ажлын байрны эрсдэлээс хамаарна." },
  ],
  calcular(e, v, { redondear }) {
    if (e.bruto <= 0) throw new ErrorEntrada("Сарын бохир цалинг оруулна уу.", "bruto");
    const r = ajilOlgogch(e.bruto, e.tuvshin, v);
    const shimtgel = redondear(r.shimtgel);
    return {
      niit: redondear(e.bruto + shimtgel),
      shimtgel,
      tetgever: redondear(r.tetgever),
      tetgemj: redondear(r.tetgemj),
      ajilguidel: redondear(r.ajilguidel),
      osol: redondear(r.osol),
      emd: redondear(r.emd),
      jil: redondear((e.bruto + shimtgel) * 12),
    };
  },
  resultado: [
    { clave: "niit", etiqueta: "Сарын нийт зардал", formato: "moneda", destacada: true },
    { clave: "shimtgel", etiqueta: "Ажил олгогчийн нийт шимтгэл", formato: "moneda" },
    { clave: "tetgever", etiqueta: "Тэтгэврийн даатгал", formato: "moneda" },
    { clave: "tetgemj", etiqueta: "Тэтгэмжийн даатгал", formato: "moneda" },
    { clave: "ajilguidel", etiqueta: "Ажилгүйдлийн даатгал", formato: "moneda" },
    { clave: "osol", etiqueta: "ҮОМШӨ-ний даатгал", formato: "moneda" },
    { clave: "emd", etiqueta: "Эрүүл мэндийн даатгал", formato: "moneda" },
    { clave: "jil", etiqueta: "Жилийн нийт зардал", formato: "moneda" },
  ],
});
