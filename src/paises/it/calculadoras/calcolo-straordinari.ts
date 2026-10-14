import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "it.straordinari",
  mercado: "it",
  concepto: "horas-extra",
  slug: "calcolo-straordinari",
  estado: "publicado",
  requiere: {
    "it.orario-normale": "numero",
    "it.straordinario-massimo": "numero",
  },
  campos: [
    { id: "retribuzione", tipo: "moneda", etiqueta: "Retribuzione mensile lorda", min: 0, porDefecto: 2000 },
    {
      id: "divisore",
      tipo: "numero",
      etiqueta: "Divisore orario del contratto",
      ayuda: "Il numero per cui si divide lo stipendio per avere la paga oraria. Lo trovi nel tuo CCNL: spesso è 168 o 173.",
      min: 1,
      max: 300,
      porDefecto: 173,
    },
    { id: "ore", tipo: "numero", etiqueta: "Ore di straordinario nel mese", min: 0, porDefecto: 10 },
    { id: "maggiorazione", tipo: "porcentaje", etiqueta: "Maggiorazione (%)", ayuda: "La fissa il contratto collettivo e cambia per notturno e festivo.", min: 0, max: 200, porDefecto: 25 },
  ],
  calcular(e, v, { redondear }) {
    if (e.divisore <= 0) throw new ErrorEntrada("Il divisore deve essere maggiore di zero.", "divisore");
    const pagaOraria = redondear(e.retribuzione / e.divisore);
    const oraStraordinaria = redondear(pagaOraria + porcentaje(pagaOraria, e.maggiorazione));
    const totale = redondear(oraStraordinaria * e.ore);
    const observaciones: string[] = [];
    const limite = v["it.straordinario-massimo"];
    if (e.ore * 12 > limite)
      observaciones.push(`Con queste ore ogni mese supereresti le ${limite} ore di straordinario l'anno, il limite previsto quando il contratto collettivo non dice nulla.`);
    return {
      pagaOraria,
      oraStraordinaria,
      totale,
      maggiorazioneTotale: redondear(totale - pagaOraria * e.ore),
      observaciones,
    };
  },
  resultado: [
    { clave: "totale", etiqueta: "Compenso per gli straordinari (lordo)", formato: "moneda", destacada: true },
    { clave: "pagaOraria", etiqueta: "Paga oraria normale", formato: "moneda" },
    { clave: "oraStraordinaria", etiqueta: "Paga di un'ora di straordinario", formato: "moneda" },
    { clave: "maggiorazioneTotale", etiqueta: "Di cui maggiorazione", formato: "moneda" },
  ],
});
