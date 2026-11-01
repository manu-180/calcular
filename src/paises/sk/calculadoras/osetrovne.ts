import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { dennyZaklad } from "../lib/davky";
import { nahor10 } from "../lib/zaokruhlenie";

export default definirCalculadora({
  id: "sk.osetrovne",
  mercado: "sk",
  concepto: "propio",
  slug: "osetrovne",
  estado: "publicado",
  requiere: { "sk.davky": "mapa", "sk.max-dvz": "numero" },
  campos: [
    { id: "mzda", tipo: "moneda", etiqueta: "Hrubá mzda za mesiac v minulom roku", min: 0, porDefecto: 1500 },
    { id: "dni", tipo: "entero", etiqueta: "Počet dní OČR", min: 1, max: 14, porDefecto: 10 },
  ],
  calcular(e, v) {
    if (e.mzda <= 0) throw new ErrorEntrada("Zadajte mzdu vyššiu ako nula.", "mzda");
    if (e.dni > 14) throw new ErrorEntrada("Ošetrovné sa vypláca najviac 14 dní.", "dni");
    const dvz = dennyZaklad(e.mzda, v["sk.max-dvz"]);
    return { osetrovne: nahor10((dvz * e.dni * v["sk.davky"].osetrovne) / 100), dvz };
  },
  resultado: [
    { clave: "osetrovne", etiqueta: "Ošetrovné", formato: "moneda", destacada: true },
    { clave: "dvz", etiqueta: "Denný vymeriavací základ", formato: "moneda", decimales: 4 },
  ],
});
