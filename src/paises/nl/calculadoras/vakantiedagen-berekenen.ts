import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "nl.vakantiedagen-berekenen",
  mercado: "nl",
  concepto: "vacaciones",
  slug: "vakantiedagen-berekenen",
  estado: "publicado",
  requiere: {
    "nl.vakantie-weken": "numero",
  },
  campos: [
    { id: "urenPerWeek", tipo: "numero", etiqueta: "Uren per week volgens je contract", min: 0, max: 80, porDefecto: 40 },
    { id: "dagenPerWeek", tipo: "numero", etiqueta: "Werkdagen per week", min: 0.5, max: 7, porDefecto: 5 },
    { id: "maanden", tipo: "numero", etiqueta: "Maanden in dienst dit jaar", min: 0, max: 12, porDefecto: 12 },
    { id: "extraDagen", tipo: "numero", etiqueta: "Bovenwettelijke vakantiedagen per jaar uit je contract of cao", min: 0, max: 60, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.urenPerWeek <= 0) throw new ErrorEntrada("Vul in hoeveel uur je per week werkt.", "urenPerWeek");
    if (entrada.maanden <= 0) throw new ErrorEntrada("Vul in hoeveel maanden je dit jaar in dienst bent.", "maanden");
    const deel = entrada.maanden / 12;
    const urenPerDag = entrada.urenPerWeek / entrada.dagenPerWeek;
    const wettelijkeUren = redondear(v["nl.vakantie-weken"] * entrada.urenPerWeek * deel);
    const wettelijkeDagen = redondear(wettelijkeUren / urenPerDag);
    const extraUren = redondear(entrada.extraDagen * urenPerDag * deel);
    const extraDagen = redondear(entrada.extraDagen * deel);
    return {
      wettelijkeUren,
      wettelijkeDagen,
      extraUren,
      extraDagen,
      totaalUren: redondear(wettelijkeUren + extraUren),
      totaalDagen: redondear(wettelijkeDagen + extraDagen),
    };
  },
  resultado: [
    { clave: "totaalDagen", etiqueta: "Vakantiedagen in totaal", formato: "dias", destacada: true },
    { clave: "totaalUren", etiqueta: "Vakantie-uren in totaal", formato: "horas" },
    { clave: "wettelijkeDagen", etiqueta: "Wettelijke vakantiedagen", formato: "dias" },
    { clave: "wettelijkeUren", etiqueta: "Wettelijke vakantie-uren", formato: "horas" },
    { clave: "extraDagen", etiqueta: "Bovenwettelijke vakantiedagen", formato: "dias", ocultarSiCero: true },
    { clave: "extraUren", etiqueta: "Bovenwettelijke vakantie-uren", formato: "horas", ocultarSiCero: true },
  ],
});
