import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { aliquotaMarginale, detrazioneCuneo, detrazioneLavoro, detrazionePensione, irpefLorda } from "../lib/irpef";

export default definirCalculadora({
  id: "it.irpef",
  mercado: "it",
  concepto: "impuesto-renta",
  slug: "calcolo-irpef",
  estado: "publicado",
  requiere: {
    "it.irpef-scaglioni": "escala",
    "it.detrazione-lavoro": "mapa",
    "it.detrazione-pensione": "mapa",
    "it.cuneo-fiscale": "mapa",
  },
  campos: [
    {
      id: "reddito",
      tipo: "moneda",
      etiqueta: "Reddito complessivo imponibile",
      ayuda: "Il reddito su cui si calcola l'IRPEF, già al netto dei contributi e degli oneri deducibili.",
      min: 0,
      porDefecto: 30000,
    },
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Da dove arriva il reddito",
      opciones: [
        { valor: "dipendente", etiqueta: "Lavoro dipendente" },
        { valor: "pensione", etiqueta: "Pensione" },
        { valor: "altro", etiqueta: "Altro (autonomo, affitti, altri redditi)" },
      ],
      porDefecto: "dipendente",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.reddito < 0) throw new ErrorEntrada("Il reddito non può essere negativo.", "reddito");
    const lorda = redondear(irpefLorda(v["it.irpef-scaglioni"], e.reddito));
    const detrazione = redondear(
      e.tipo === "dipendente"
        ? detrazioneLavoro(v["it.detrazione-lavoro"], e.reddito, false)
        : e.tipo === "pensione"
          ? detrazionePensione(v["it.detrazione-pensione"], e.reddito)
          : 0,
    );
    const ulteriore = redondear(e.tipo === "dipendente" ? detrazioneCuneo(v["it.cuneo-fiscale"], e.reddito) : 0);
    const netta = redondear(Math.max(0, lorda - detrazione - ulteriore));
    const observaciones: string[] = [];
    if (e.tipo === "altro") observaciones.push("Per i redditi da lavoro autonomo esistono altre detrazioni (articolo 13 del TUIR) che qui non sono considerate.");
    if (detrazione + ulteriore > lorda && lorda > 0) observaciones.push("Le detrazioni superano l'imposta: l'IRPEF netta è zero e la parte in eccesso non viene rimborsata.");
    return {
      lorda,
      detrazione,
      ulteriore,
      netta,
      media: e.reddito > 0 ? redondear((netta / e.reddito) * 100) : 0,
      marginale: aliquotaMarginale(v["it.irpef-scaglioni"], e.reddito),
      observaciones,
    };
  },
  resultado: [
    { clave: "netta", etiqueta: "IRPEF netta", formato: "moneda", destacada: true },
    { clave: "lorda", etiqueta: "IRPEF lorda", formato: "moneda" },
    { clave: "detrazione", etiqueta: "Detrazione per lavoro o pensione", formato: "moneda", ocultarSiCero: true },
    { clave: "ulteriore", etiqueta: "Ulteriore detrazione (taglio del cuneo)", formato: "moneda", ocultarSiCero: true },
    { clave: "media", etiqueta: "Aliquota media", formato: "porcentaje" },
    { clave: "marginale", etiqueta: "Aliquota marginale", formato: "porcentaje", decimales: 0 },
  ],
});
