import { definirCalculadora, ErrorEntrada, enMapa } from "@/motor/calculo";
import { najblizsie } from "../lib/zaokruhlenie";

export default definirCalculadora({
  id: "sk.kalkulacka-dph",
  mercado: "sk",
  concepto: "iva",
  slug: "kalkulacka-dph",
  estado: "publicado",
  requiere: { "sk.dph": "mapa" },
  campos: [
    { id: "suma", tipo: "moneda", etiqueta: "Suma", min: 0, porDefecto: 100 },
    { id: "sadzba", tipo: "opcion-dato", dato: "sk.dph", etiqueta: "Sadzba DPH", porDefecto: "zakladna" },
    {
      id: "smer",
      tipo: "opcion",
      etiqueta: "Zadaná suma je",
      porDefecto: "bez",
      opciones: [
        { valor: "bez", etiqueta: "bez DPH" },
        { valor: "s", etiqueta: "s DPH" },
      ],
    },
  ],
  calcular(e, v) {
    if (e.suma <= 0) throw new ErrorEntrada("Zadajte sumu vyššiu ako nula.", "suma");
    const s = enMapa(v["sk.dph"], e.sadzba);
    const bez = e.smer === "bez" ? e.suma : najblizsie(e.suma / (1 + s / 100));
    const s_dph = e.smer === "bez" ? najblizsie(e.suma * (1 + s / 100)) : e.suma;
    return { sDph: s_dph, bezDph: bez, dph: najblizsie(s_dph - bez) };
  },
  resultado: [
    { clave: "sDph", etiqueta: "Suma s DPH", formato: "moneda", destacada: true },
    { clave: "bezDph", etiqueta: "Suma bez DPH", formato: "moneda" },
    { clave: "dph", etiqueta: "DPH", formato: "moneda" },
  ],
});
