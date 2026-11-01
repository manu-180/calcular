import { definirCalculadora, ErrorEntrada, enMapa } from "@/motor/calculo";
import { dennyZaklad } from "../lib/davky";
import { nahor10 } from "../lib/zaokruhlenie";

export default definirCalculadora({
  id: "sk.kalkulacka-materske",
  mercado: "sk",
  concepto: "propio",
  slug: "kalkulacka-materske",
  estado: "publicado",
  requiere: { "sk.davky": "mapa", "sk.max-dvz": "numero", "sk.materske-tyzdne": "mapa" },
  campos: [
    { id: "mzda", tipo: "moneda", etiqueta: "Hrubá mzda za mesiac v minulom roku", min: 0, porDefecto: 1500 },
    { id: "dlzka", tipo: "opcion-dato", dato: "sk.materske-tyzdne", etiqueta: "Situácia", porDefecto: "bezne" },
  ],
  calcular(e, v) {
    if (e.mzda <= 0) throw new ErrorEntrada("Zadajte mzdu vyššiu ako nula.", "mzda");
    const dvz = dennyZaklad(e.mzda, v["sk.max-dvz"]);
    const denne = (dvz * v["sk.davky"].materske) / 100;
    const tyzdne = enMapa(v["sk.materske-tyzdne"], e.dlzka);
    return { mesiac30: nahor10(denne * 30), mesiac31: nahor10(denne * 31), spolu: nahor10(denne * tyzdne * 7), tyzdne, dvz };
  },
  resultado: [
    { clave: "mesiac30", etiqueta: "Materské za 30-dňový mesiac", formato: "moneda", destacada: true },
    { clave: "mesiac31", etiqueta: "Materské za 31-dňový mesiac", formato: "moneda" },
    { clave: "spolu", etiqueta: "Materské za celé obdobie", formato: "moneda" },
    { clave: "tyzdne", etiqueta: "Dĺžka materského", formato: "semanas" },
    { clave: "dvz", etiqueta: "Denný vymeriavací základ", formato: "moneda", decimales: 4 },
  ],
});
