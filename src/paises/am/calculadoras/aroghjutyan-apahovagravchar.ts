import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { AHA_MIJIN, AHA_TSATSR } from "../lib/ashkhatavardz";

export default definirCalculadora({
  id: "am.aroghjutyan-apahovagravchar",
  mercado: "am",
  concepto: "propio",
  slug: "aroghjutyan-apahovagravchar",
  estado: "publicado",
  requiere: { "am.aha-vchar": "mapa", "am.aha-amsakan": "numero" },
  campos: [{ id: "ashkhatavardz", tipo: "moneda", etiqueta: "Համախառն ամսական աշխատավարձ", min: 0, porDefecto: 400000 }],
  calcular(e, v) {
    if (e.ashkhatavardz <= 0) throw new ErrorEntrada("Մուտքագրեք զրոյից մեծ աշխատավարձ։", "ashkhatavardz");
    const clave = e.ashkhatavardz <= AHA_TSATSR ? "tsatsr" : e.ashkhatavardz <= AHA_MIJIN ? "mijin" : "bardzr";
    const vchar = enMapa(v["am.aha-vchar"], clave);
    const yndhanur = v["am.aha-amsakan"];
    return {
      vchar,
      tarekan: vchar * 12,
      petutyun: vchar > 0 ? yndhanur - vchar : 0,
      yndhanur,
      observaciones: vchar === 0 ? ["Այս աշխատավարձի համար ապահովագրավճարի պարտականությունը սկսվում է 2027 թվականի հունվարի մեկից։"] : [],
    };
  },
  resultado: [
    { clave: "vchar", etiqueta: "Վճարվող գումարն ամսական", formato: "moneda", destacada: true },
    { clave: "tarekan", etiqueta: "Վճարվող գումարը տարեկան", formato: "moneda" },
    { clave: "petutyun", etiqueta: "Պետության մասն ամսական", formato: "moneda", ocultarSiCero: true },
    { clave: "yndhanur", etiqueta: "Ապահովագրավճարի ամբողջական ամսական դրույքաչափը", formato: "moneda" },
  ],
});
