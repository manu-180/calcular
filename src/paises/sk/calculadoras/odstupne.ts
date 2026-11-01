import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "sk.odstupne",
  mercado: "sk",
  concepto: "indemnizacion-despido",
  slug: "odstupne",
  estado: "publicado",
  requiere: { "sk.odstupne": "mapa" },
  campos: [
    { id: "zarobok", tipo: "moneda", etiqueta: "Priemerný mesačný zárobok", min: 0, porDefecto: 1800 },
    { id: "roky", tipo: "numero", etiqueta: "Trvanie pracovného pomeru v rokoch", min: 0, porDefecto: 6 },
    {
      id: "sposob",
      tipo: "opcion",
      etiqueta: "Pracovný pomer sa končí",
      porDefecto: "vypoved",
      opciones: [
        { valor: "vypoved", etiqueta: "výpoveďou od zamestnávateľa" },
        { valor: "dohoda", etiqueta: "dohodou" },
      ],
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.zarobok <= 0) throw new ErrorEntrada("Zadajte priemerný mesačný zárobok.", "zarobok");
    const m = v["sk.odstupne"];
    const pasmo = e.roky >= 20 ? "20" : e.roky >= 10 ? "10" : e.roky >= 5 ? "5" : e.roky >= 2 ? "2" : "0";
    const nasobok = m[`${e.sposob}${pasmo}`] ?? 0;
    const observaciones = nasobok === 0 ? ["Pri výpovedi a trvaní pracovného pomeru kratšom ako dva roky zákon odstupné neurčuje."] : [];
    return { odstupne: redondear(e.zarobok * nasobok), nasobok, observaciones };
  },
  resultado: [
    { clave: "odstupne", etiqueta: "Odstupné najmenej", formato: "moneda", destacada: true },
    { clave: "nasobok", etiqueta: "Násobok priemerného zárobku", formato: "numero" },
  ],
});
