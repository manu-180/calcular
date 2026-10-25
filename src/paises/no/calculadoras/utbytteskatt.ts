import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "no.utbytteskatt",
  mercado: "no",
  concepto: "propio",
  slug: "utbytteskatt",
  estado: "publicado",
  requiere: {
    "no.oppjusteringsfaktor": "numero",
    "no.skatt-alminnelig-inntekt": "numero",
  },
  campos: [
    {
      id: "type",
      tipo: "opcion",
      etiqueta: "Hva skal du skatte av",
      opciones: [
        { valor: "utbytte", etiqueta: "Utbytte fra aksjer" },
        { valor: "gevinst", etiqueta: "Gevinst ved salg av aksjer eller aksjefond" },
        { valor: "ask", etiqueta: "Uttak fra aksjesparekonto ut over innskuddet" },
      ],
      porDefecto: "utbytte",
    },
    { id: "belop", tipo: "moneda", etiqueta: "Beløp", min: 0, porDefecto: 50000 },
    { id: "skjerming", tipo: "moneda", etiqueta: "Skjermingsfradrag", min: 0, porDefecto: 0, requerido: false, ayuda: "Står i skattemeldingen eller hos banken. La feltet stå tomt hvis du ikke vet det." },
  ],
  calcular(e, v, { redondear }) {
    if (e.belop <= 0) throw new ErrorEntrada("Skriv inn et beløp over null.", "belop");
    const faktor = v["no.oppjusteringsfaktor"];
    const sats = v["no.skatt-alminnelig-inntekt"];
    const skjerming = Math.min(e.skjerming ?? 0, e.belop);
    const grunnlag = e.belop - skjerming;
    const skatt = redondear((grunnlag * faktor * sats) / 100);
    const observaciones: string[] = [];
    if (e.type === "ask") observaciones.push("På aksjesparekonto betaler du først skatt når du tar ut mer enn du har satt inn. Innskuddet kan tas ut skattefritt.");
    return {
      skatt,
      netto: redondear(e.belop - skatt),
      effektivSats: redondear(faktor * sats),
      skattepliktig: redondear(grunnlag * faktor),
      skjerming: redondear(skjerming),
      observaciones,
    };
  },
  resultado: [
    { clave: "skatt", etiqueta: "Skatt", formato: "moneda", destacada: true },
    { clave: "netto", etiqueta: "Igjen etter skatt", formato: "moneda" },
    { clave: "effektivSats", etiqueta: "Effektiv skattesats", formato: "porcentaje", decimales: 2 },
    { clave: "skattepliktig", etiqueta: "Skattepliktig beløp etter oppjustering", formato: "moneda" },
    { clave: "skjerming", etiqueta: "Skjermingsfradrag brukt", formato: "moneda", ocultarSiCero: true },
  ],
});
