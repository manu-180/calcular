import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "hr.pdv-kalkulator",
  mercado: "hr",
  concepto: "iva",
  slug: "pdv-kalkulator",
  estado: "publicado",
  requiere: { "hr.pdv": "mapa" },
  campos: [
    { id: "iznos", tipo: "moneda", etiqueta: "Iznos", min: 0, porDefecto: 100 },
    { id: "stopa", tipo: "opcion-dato", etiqueta: "Stopa PDV-a", dato: "hr.pdv", porDefecto: "opca" },
    {
      id: "smjer",
      tipo: "opcion",
      etiqueta: "Što želite izračunati",
      opciones: [
        { valor: "dodaj", etiqueta: "Dodati PDV na neto iznos" },
        { valor: "izdvoji", etiqueta: "Izdvojiti PDV iz bruto iznosa" },
      ],
      porDefecto: "dodaj",
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.iznos <= 0) throw new ErrorEntrada("Unesite iznos veći od nule.", "iznos");
    const s = enMapa(v["hr.pdv"], e.stopa);
    const osnovica = e.smjer === "dodaj" ? e.iznos : redondear(e.iznos / (1 + s / 100));
    const ukupno = e.smjer === "dodaj" ? redondear(e.iznos * (1 + s / 100)) : e.iznos;
    return { pdv: redondear(ukupno - osnovica), osnovica, ukupno };
  },
  resultado: [
    { clave: "pdv", etiqueta: "PDV", formato: "moneda", destacada: true },
    { clave: "osnovica", etiqueta: "Iznos bez PDV-a", formato: "moneda" },
    { clave: "ukupno", etiqueta: "Iznos s PDV-om", formato: "moneda" },
  ],
});
