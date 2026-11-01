import { definirCalculadora } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";

export default definirCalculadora({
  id: "ge.dekretuli-shvebuleba",
  mercado: "ge",
  concepto: "propio",
  slug: "dekretuli-shvebuleba",
  estado: "publicado",
  requiere: {
    "ge.dekreti": "numero",
    "ge.dekreti-gartuleba": "numero",
    "ge.bavshvis-movla-ananz": "numero",
    "ge.bavshvis-movla": "numero",
    "ge.bavshvis-movla-gartuleba": "numero",
  },
  campos: [
    { id: "gartuleba", tipo: "si-no", etiqueta: "მშობიარობის გართულება ან ტყუპი", porDefecto: false },
    { id: "dasatskisi", tipo: "fecha", etiqueta: "შვებულების დაწყების თარიღი", porDefecto: "hoy" },
  ],
  calcular(e, v) {
    const dekreti = e.gartuleba ? v["ge.dekreti-gartuleba"] : v["ge.dekreti"];
    const movla = e.gartuleba ? v["ge.bavshvis-movla-gartuleba"] : v["ge.bavshvis-movla"];
    const anazghaurebadi = dekreti + v["ge.bavshvis-movla-ananz"];
    const sul = dekreti + movla;
    return {
      anazghaurebadi,
      dekreti,
      movla,
      sul,
      bolo: sumarDias(e.dasatskisi, anazghaurebadi - 1),
      shvebulebisBolo: sumarDias(e.dasatskisi, sul - 1),
    };
  },
  resultado: [
    { clave: "anazghaurebadi", etiqueta: "ანაზღაურებადი დღეები სულ", formato: "dias", destacada: true },
    { clave: "dekreti", etiqueta: "ორსულობისა და მშობიარობის შვებულება", formato: "dias" },
    { clave: "movla", etiqueta: "ბავშვის მოვლის შვებულება", formato: "dias" },
    { clave: "sul", etiqueta: "ორივე შვებულება სულ", formato: "dias" },
    { clave: "bolo", etiqueta: "ანაზღაურებადი პერიოდის ბოლო დღე", formato: "fecha" },
    { clave: "shvebulebisBolo", etiqueta: "შვებულების ბოლო დღე", formato: "fecha" },
  ],
});
