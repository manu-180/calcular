import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { geringfuegigkeitsgrenze } from "../lib/steuer";

export default definirCalculadora({
  id: "de.minijob-rechner",
  mercado: "de",
  concepto: "propio",
  slug: "minijob-rechner",
  estado: "publicado",
  requiere: {
    "de.mindestlohn": "numero",
    "de.minijob-kv-pauschale": "numero",
    "de.minijob-rv-pauschale": "numero",
    "de.minijob-pauschsteuer": "numero",
    "de.minijob-mindestbemessung": "numero",
    "de.rv-beitragssatz": "numero",
  },
  campos: [
    { id: "verdienst", tipo: "moneda", etiqueta: "Verdienst im Monat", min: 0, porDefecto: 520 },
    { id: "rvBefreit", tipo: "si-no", etiqueta: "Von der Rentenversicherungspflicht befreit", porDefecto: false, ayuda: "Auf Antrag beim Arbeitgeber. Dann zahlen Sie keinen eigenen Rentenbeitrag." },
    { id: "gesetzlichVersichert", tipo: "si-no", etiqueta: "Gesetzlich krankenversichert", porDefecto: true, ayuda: "Nur dann zahlt der Arbeitgeber den Pauschalbeitrag zur Krankenversicherung." },
  ],
  calcular(entrada, valores, { redondear }) {
    const grenze = geringfuegigkeitsgrenze(valores["de.mindestlohn"]);
    if (entrada.verdienst > grenze) throw new ErrorEntrada(`Über ${grenze} Euro im Monat ist es kein Minijob mehr. Nutzen Sie den Midijob-Rechner.`, "verdienst");
    const v = entrada.verdienst;
    const agKv = entrada.gesetzlichVersichert ? redondear(porcentaje(v, valores["de.minijob-kv-pauschale"])) : 0;
    const agRv = redondear(porcentaje(v, valores["de.minijob-rv-pauschale"]));
    const agSteuer = redondear(porcentaje(v, valores["de.minijob-pauschsteuer"]));
    const basis = Math.max(v, valores["de.minijob-mindestbemessung"]);
    const anRv = entrada.rvBefreit ? 0 : redondear(porcentaje(basis, valores["de.rv-beitragssatz"]) - agRv);
    const agSumme = redondear(agKv + agRv + agSteuer);
    return {
      grenze,
      stunden: v / valores["de.mindestlohn"],
      agKv,
      agRv,
      agSteuer,
      agSumme,
      kosten: redondear(v + agSumme),
      anRv,
      netto: redondear(v - anRv),
      observaciones: ["Dazu kommen beim Arbeitgeber die Umlagen U1, U2 und die Insolvenzgeldumlage sowie der Beitrag zur Unfallversicherung. Sie hängen von Krankenkasse und Branche ab."],
    };
  },
  resultado: [
    { clave: "netto", etiqueta: "Ihr Netto im Monat", formato: "moneda", destacada: true },
    { clave: "anRv", etiqueta: "Ihr Rentenbeitrag", formato: "moneda" },
    { clave: "agKv", etiqueta: "Pauschalbeitrag Krankenversicherung (Arbeitgeber)", formato: "moneda" },
    { clave: "agRv", etiqueta: "Pauschalbeitrag Rentenversicherung (Arbeitgeber)", formato: "moneda" },
    { clave: "agSteuer", etiqueta: "Pauschsteuer (Arbeitgeber)", formato: "moneda" },
    { clave: "agSumme", etiqueta: "Abgaben des Arbeitgebers zusammen", formato: "moneda" },
    { clave: "kosten", etiqueta: "Kosten für den Arbeitgeber", formato: "moneda" },
    { clave: "grenze", etiqueta: "Minijob-Grenze", formato: "moneda" },
    { clave: "stunden", etiqueta: "Stunden im Monat zum Mindestlohn", formato: "horas", decimales: 1 },
  ],
});
