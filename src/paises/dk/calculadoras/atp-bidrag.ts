import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "dk.atp-bidrag",
  mercado: "dk",
  concepto: "propio",
  slug: "atp-bidrag",
  estado: "publicado",
  requiere: {
    "dk.atp-loenmodtager": "mapa",
    "dk.atp-arbejdsgiver": "mapa",
    "dk.atp-timegraenser": "mapa",
  },
  campos: [{ id: "timer", tipo: "numero", etiqueta: "Arbejdstimer om måneden", min: 0, max: 744, porDefecto: 160 }],
  calcular(e, v, { redondear }) {
    if (e.timer < 0) throw new ErrorEntrada("Antallet af timer kan ikke være negativt.", "timer");
    const g = v["dk.atp-timegraenser"];
    const trin = e.timer >= enMapa(g, "fuld") ? "fuld" : e.timer >= enMapa(g, "to-tredjedele") ? "to-tredjedele" : e.timer >= enMapa(g, "en-tredjedel") ? "en-tredjedel" : null;
    const dig = trin ? enMapa(v["dk.atp-loenmodtager"], trin) : 0;
    const arbejdsgiver = trin ? enMapa(v["dk.atp-arbejdsgiver"], trin) : 0;
    return {
      dig,
      arbejdsgiver,
      ialt: dig + arbejdsgiver,
      aar: redondear((dig + arbejdsgiver) * 12),
      digAar: redondear(dig * 12),
      observaciones: trin ? [] : [`Under ${enMapa(g, "en-tredjedel")} timer om måneden betales der ikke ATP-bidrag.`],
    };
  },
  resultado: [
    { clave: "dig", etiqueta: "Dit ATP-bidrag pr. måned", formato: "moneda", destacada: true },
    { clave: "arbejdsgiver", etiqueta: "Arbejdsgiverens ATP-bidrag pr. måned", formato: "moneda" },
    { clave: "ialt", etiqueta: "ATP-bidrag i alt pr. måned", formato: "moneda" },
    { clave: "digAar", etiqueta: "Dit ATP-bidrag pr. år", formato: "moneda" },
    { clave: "aar", etiqueta: "ATP-bidrag i alt pr. år", formato: "moneda" },
  ],
});
