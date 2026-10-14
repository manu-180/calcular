import { aplicarEscalaMarginal, definirCalculadora, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "at.grunderwerbsteuer-rechner",
  mercado: "at",
  concepto: "propio",
  slug: "grunderwerbsteuer-rechner",
  estado: "publicado",
  requiere: {
    "at.grunderwerbsteuer": "numero",
    "at.grest-stufentarif": "escala",
    "at.grundbuch": "mapa",
  },
  campos: [
    {
      id: "art",
      tipo: "opcion",
      etiqueta: "Art des Erwerbs",
      opciones: [
        { valor: "kauf", etiqueta: "Kauf" },
        { valor: "familie", etiqueta: "Schenkung, Erbschaft oder Übertragung in der Familie" },
      ],
      porDefecto: "kauf",
    },
    { id: "wert", tipo: "moneda", etiqueta: "Kaufpreis oder Grundstückswert", min: 0, porDefecto: 350000 },
    { id: "pfand", tipo: "moneda", etiqueta: "Pfandbetrag des Kredits (Hypothek)", min: 0, requerido: false, ayuda: "Nur wenn ein Pfandrecht im Grundbuch eingetragen wird." },
  ],
  calcular(entrada, valores, { redondear }) {
    const gb = valores["at.grundbuch"];
    const kauf = entrada.art === "kauf";
    const grest = redondear(kauf ? porcentaje(entrada.wert, valores["at.grunderwerbsteuer"]) : aplicarEscalaMarginal(valores["at.grest-stufentarif"], entrada.wert));
    const eintragung = redondear(porcentaje(kauf ? entrada.wert : entrada.wert * 0.3, gb.eigentum));
    const pfand = redondear(porcentaje(entrada.pfand ?? 0, gb.pfandrecht));
    const eingabe = gb.eingabe;
    const observaciones: string[] = ["Notar- oder Anwaltskosten und eine allfällige Maklerprovision sind nicht enthalten."];
    if (!kauf) observaciones.push("In der Familie richtet sich die Eintragungsgebühr nach dem Dreifachen des Einheitswerts, höchstens nach 30 % des Verkehrswerts. Angezeigt ist dieser Höchstbetrag.");
    return {
      summe: redondear(grest + eintragung + pfand + eingabe),
      grest,
      eintragung,
      pfand,
      eingabe,
      anteil: entrada.wert > 0 ? ((grest + eintragung + pfand + eingabe) / entrada.wert) * 100 : 0,
      observaciones,
    };
  },
  resultado: [
    { clave: "summe", etiqueta: "Steuern und Gebühren zusammen", formato: "moneda", destacada: true },
    { clave: "grest", etiqueta: "Grunderwerbsteuer", formato: "moneda" },
    { clave: "eintragung", etiqueta: "Eintragungsgebühr Eigentumsrecht", formato: "moneda" },
    { clave: "pfand", etiqueta: "Eintragungsgebühr Pfandrecht", formato: "moneda", ocultarSiCero: true },
    { clave: "eingabe", etiqueta: "Eingabengebühr", formato: "moneda" },
    { clave: "anteil", etiqueta: "Anteil am Kaufpreis oder Wert", formato: "porcentaje", decimales: 2 },
  ],
});
