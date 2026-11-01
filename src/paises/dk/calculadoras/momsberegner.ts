import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "dk.momsberegner",
  mercado: "dk",
  concepto: "iva",
  slug: "momsberegner",
  estado: "publicado",
  requiere: { "dk.moms": "numero" },
  campos: [
    {
      id: "retning",
      tipo: "opcion",
      etiqueta: "Hvad vil du beregne?",
      opciones: [
        { valor: "laeg-til", etiqueta: "Læg moms til en pris uden moms" },
        { valor: "traek-fra", etiqueta: "Træk momsen ud af en pris med moms" },
      ],
      porDefecto: "laeg-til",
    },
    { id: "beloeb", tipo: "moneda", etiqueta: "Beløb", min: 0, porDefecto: 1000 },
  ],
  calcular(e, v, { redondear }) {
    if (e.beloeb <= 0) throw new ErrorEntrada("Skriv et beløb, der er større end 0.", "beloeb");
    const sats = v["dk.moms"];
    const udenMoms = e.retning === "laeg-til" ? e.beloeb : redondear(e.beloeb / (1 + sats / 100));
    const medMoms = e.retning === "laeg-til" ? redondear(e.beloeb + porcentaje(e.beloeb, sats)) : e.beloeb;
    return {
      moms: redondear(medMoms - udenMoms),
      udenMoms,
      medMoms,
      sats,
      andel: (100 * sats) / (100 + sats),
    };
  },
  resultado: [
    { clave: "moms", etiqueta: "Moms", formato: "moneda", destacada: true },
    { clave: "udenMoms", etiqueta: "Pris uden moms", formato: "moneda" },
    { clave: "medMoms", etiqueta: "Pris med moms", formato: "moneda" },
    { clave: "sats", etiqueta: "Momssats", formato: "porcentaje", decimales: 0 },
    { clave: "andel", etiqueta: "Momsens andel af prisen med moms", formato: "porcentaje", decimales: 0 },
  ],
});
