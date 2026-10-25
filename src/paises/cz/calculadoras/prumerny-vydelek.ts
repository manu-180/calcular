import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { nahoruNaDesetihalere } from "../lib/mzda";

export default definirCalculadora({
  id: "cz.prumerny-vydelek",
  mercado: "cz",
  concepto: "propio",
  slug: "prumerny-vydelek",
  estado: "publicado",
  requiere: { "cz.minimalni-mzda-hodinova": "numero" },
  campos: [
    { id: "mzda", tipo: "moneda", etiqueta: "Hrubá mzda zúčtovaná za předchozí čtvrtletí", min: 0, porDefecto: 135000 },
    {
      id: "hodiny",
      tipo: "numero",
      etiqueta: "Odpracované hodiny v předchozím čtvrtletí",
      ayuda: "Hodiny, za které vám náležela mzda. Bez dovolené, nemoci a jiných náhrad.",
      min: 0,
      porDefecto: 504,
    },
    { id: "tydenni", tipo: "numero", etiqueta: "Týdenní pracovní doba v hodinách", min: 1, max: 60, porDefecto: 40 },
  ],
  calcular(e, v, { redondear }) {
    if (e.mzda <= 0) throw new ErrorEntrada("Zadejte hrubou mzdu vyšší než nula.", "mzda");
    if (e.hodiny <= 0) throw new ErrorEntrada("Zadejte počet odpracovaných hodin vyšší než nula.", "hodiny");
    const observaciones: string[] = [];
    let hodinovy = redondear(e.mzda / e.hodiny);
    const stanovena = e.tydenni === 37.5 || e.tydenni === 38.75 ? e.tydenni : 40;
    const minimum = nahoruNaDesetihalere((v["cz.minimalni-mzda-hodinova"] * 40) / stanovena);
    if (hodinovy < minimum) {
      observaciones.push("Průměrný výdělek nesmí být nižší než minimální mzda, proto se zvyšuje na hodinovou minimální mzdu.");
      hodinovy = minimum;
    }
    const mesicni = redondear(hodinovy * e.tydenni * 4.348);
    return {
      hodinovy,
      mesicni,
      denni: redondear((hodinovy * e.tydenni) / 5),
      observaciones,
    };
  },
  resultado: [
    { clave: "hodinovy", etiqueta: "Průměrný hodinový výdělek", formato: "moneda", destacada: true },
    { clave: "mesicni", etiqueta: "Průměrný měsíční výdělek", formato: "moneda" },
    { clave: "denni", etiqueta: "Průměrný výdělek za pracovní den (pětidenní týden)", formato: "moneda" },
  ],
});
