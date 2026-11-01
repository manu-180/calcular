import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { nahoruNaDesetihalere } from "../lib/mzda";

export default definirCalculadora({
  id: "cz.nahrada-mzdy-za-dovolenou",
  mercado: "cz",
  concepto: "propio",
  slug: "nahrada-mzdy-za-dovolenou",
  estado: "publicado",
  requiere: { "cz.minimalni-mzda-hodinova": "numero" },
  campos: [
    { id: "mzda", tipo: "moneda", etiqueta: "Hrubá mzda za předchozí čtvrtletí", min: 0, porDefecto: 135000 },
    { id: "hodiny", tipo: "numero", etiqueta: "Odpracované hodiny v předchozím čtvrtletí", min: 0, porDefecto: 504 },
    { id: "dovolena", tipo: "numero", etiqueta: "Hodiny dovolené (čerpané nebo nevyčerpané při odchodu)", min: 0, porDefecto: 40 },
  ],
  calcular(e, v, { redondear }) {
    if (e.mzda <= 0) throw new ErrorEntrada("Zadejte hrubou mzdu vyšší než nula.", "mzda");
    if (e.hodiny <= 0) throw new ErrorEntrada("Zadejte počet odpracovaných hodin vyšší než nula.", "hodiny");
    if (e.dovolena <= 0) throw new ErrorEntrada("Zadejte počet hodin dovolené vyšší než nula.", "dovolena");
    const observaciones: string[] = [];
    let hodinovy = redondear(e.mzda / e.hodiny);
    const minimum = nahoruNaDesetihalere(v["cz.minimalni-mzda-hodinova"]);
    if (hodinovy < minimum) {
      hodinovy = minimum;
      observaciones.push("Průměrný výdělek je nižší než minimální mzda, proto se počítá s hodinovou minimální mzdou.");
    }
    observaciones.push("Náhrada mzdy za dovolenou je hrubá částka. Platí se z ní pojištění a daň jako ze mzdy.");
    return {
      nahrada: redondear(hodinovy * e.dovolena),
      hodinovy,
      zaDen: redondear(hodinovy * 8),
      observaciones,
    };
  },
  resultado: [
    { clave: "nahrada", etiqueta: "Náhrada mzdy za dovolenou", formato: "moneda", destacada: true },
    { clave: "hodinovy", etiqueta: "Průměrný hodinový výdělek", formato: "moneda" },
    { clave: "zaDen", etiqueta: "Náhrada za osmihodinový den", formato: "moneda" },
  ],
});
