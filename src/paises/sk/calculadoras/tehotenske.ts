import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { dennyZaklad } from "../lib/davky";
import { nahor10 } from "../lib/zaokruhlenie";

export default definirCalculadora({
  id: "sk.tehotenske",
  mercado: "sk",
  concepto: "propio",
  slug: "tehotenske",
  estado: "publicado",
  requiere: { "sk.davky": "mapa", "sk.max-dvz": "numero" },
  campos: [{ id: "mzda", tipo: "moneda", etiqueta: "Hrubá mzda za mesiac v minulom roku", min: 0, porDefecto: 1500 }],
  calcular(e, v) {
    if (e.mzda <= 0) throw new ErrorEntrada("Zadajte mzdu vyššiu ako nula.", "mzda");
    const denne = (dennyZaklad(e.mzda, v["sk.max-dvz"]) * v["sk.davky"].tehotenske) / 100;
    return { mesiac30: nahor10(denne * 30), mesiac31: nahor10(denne * 31), denne: Math.round(denne * 10000) / 10000 };
  },
  resultado: [
    { clave: "mesiac30", etiqueta: "Tehotenské za 30-dňový mesiac", formato: "moneda", destacada: true },
    { clave: "mesiac31", etiqueta: "Tehotenské za 31-dňový mesiac", formato: "moneda" },
    { clave: "denne", etiqueta: "Tehotenské za deň", formato: "moneda", decimales: 4 },
  ],
});
