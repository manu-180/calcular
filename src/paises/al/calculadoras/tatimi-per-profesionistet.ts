import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { tatimiBiznesit } from "../lib/biznes";

export default definirCalculadora({
  id: "al.tatimi-per-profesionistet",
  mercado: "al",
  concepto: "retencion-honorarios",
  slug: "tatimi-per-profesionistet",
  estado: "publicado",
  requiere: {
    "al.kufi-zero": "numero",
    "al.kufi-regjim": "numero",
    "al.regjim-vecante": "mapa",
    "al.tatim-biznes": "escala",
    "al.zbritje-personale": "mapa",
    "al.tatim-investim": "numero",
    "al.paga-minimale": "numero",
    "al.kontribute-vetepunesuar": "mapa",
  },
  campos: [
    { id: "teArdhura", tipo: "moneda", etiqueta: "Të ardhurat nga veprimtaria në vit", min: 0, porDefecto: 3000000 },
    { id: "shpenzime", tipo: "moneda", etiqueta: "Shpenzimet me fatura në vit", min: 0, requerido: false, ayuda: "Lëreni bosh për të përdorur shpenzimet e supozuara të regjimit të veçantë." },
  ],
  calcular(e, v, { redondear }) {
    if (e.teArdhura <= 0) throw new ErrorEntrada("Vendosni të ardhurat vjetore.", "teArdhura");
    if (e.shpenzime === null && e.teArdhura > v["al.kufi-regjim"]) throw new ErrorEntrada("Mbi 10 milionë lekë duhen shpenzimet me fatura.", "shpenzime");
    const shpenzime = e.shpenzime ?? (e.teArdhura * enMapa(v["al.regjim-vecante"], "vetepunesuar")) / 100;
    if (shpenzime > e.teArdhura) throw new ErrorEntrada("Shpenzimet nuk mund të jenë më të mëdha se të ardhurat.", "shpenzime");
    const fitimi = redondear(e.teArdhura - shpenzime);
    const tatimi = e.teArdhura <= v["al.kufi-zero"] ? 0 : redondear(tatimiBiznesit(fitimi, v["al.zbritje-personale"], v["al.tatim-biznes"]));
    const k = v["al.kontribute-vetepunesuar"];
    const min = v["al.paga-minimale"];
    const kontribute = redondear(((min * enMapa(k, "shoqerore")) / 100 + (2 * min * enMapa(k, "shendetesore")) / 100) * 12);
    return {
      tatimi,
      shpenzime: redondear(shpenzime),
      fitimi,
      kontribute,
      mbetet: redondear(fitimi - tatimi - kontribute),
      mbajtje: redondear((e.teArdhura * v["al.tatim-investim"]) / 100),
    };
  },
  resultado: [
    { clave: "tatimi", etiqueta: "Tatimi në vit", formato: "moneda", destacada: true },
    { clave: "shpenzime", etiqueta: "Shpenzimet e njohura", formato: "moneda" },
    { clave: "fitimi", etiqueta: "Fitimi i tatueshëm", formato: "moneda" },
    { clave: "kontribute", etiqueta: "Kontributet minimale në vit", formato: "moneda" },
    { clave: "mbetet", etiqueta: "Ju mbetet në vit", formato: "moneda" },
    { clave: "mbajtje", etiqueta: "Mbajtja në burim nëse paguheni me honorar", formato: "moneda" },
  ],
});
