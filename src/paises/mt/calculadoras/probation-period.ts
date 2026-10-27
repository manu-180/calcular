import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "mt.probation-period",
  mercado: "mt",
  concepto: "propio",
  slug: "probation-period",
  estado: "publicado",
  requiere: {
    "mt.probation-months": "mapa",
    "mt.minimum-wage": "mapa",
  },
  campos: [
    {
      id: "contrato",
      tipo: "opcion",
      etiqueta: "Type of contract",
      opciones: [
        { valor: "indefinite", etiqueta: "Indefinite (no end date)" },
        { valor: "fixed", etiqueta: "Fixed term" },
      ],
      porDefecto: "indefinite",
    },
    { id: "duracion", tipo: "numero", etiqueta: "Length of the fixed-term contract, in months", min: 0, max: 120, porDefecto: 12, visibleSi: { contrato: ["fixed"] } },
    { id: "gerencial", tipo: "si-no", etiqueta: "Technical, executive, administrative or managerial post", porDefecto: false, visibleSi: { contrato: ["indefinite"] } },
    { id: "semanal", tipo: "moneda", etiqueta: "Basic weekly wage", min: 0, porDefecto: 600, visibleSi: { contrato: ["indefinite"] } },
  ],
  calcular(entrada, v, { redondear }) {
    const tabla = v["mt.probation-months"];
    const estandar = enMapa(tabla, "standard");
    const observaciones: string[] = [];
    let meses: number;
    if (entrada.contrato === "fixed") {
      const duracion = entrada.duracion ?? 0;
      if (duracion <= 0) throw new ErrorEntrada("Enter the length of the contract.", "duracion");
      if (duracion < 6) {
        meses = duracion / 3;
        observaciones.push("A fixed-term contract shorter than six months needs objective reasons written in the contract.");
      } else if (duracion <= 15) {
        meses = (duracion / 6) * 2;
      } else {
        meses = estandar;
      }
      observaciones.push("A renewed contract for the same job does not start a new probation.");
    } else {
      const doble = 2 * enMapa(v["mt.minimum-wage"], "age-18-plus");
      const alto = (entrada.semanal ?? 0) >= doble;
      meses = entrada.gerencial && alto ? enMapa(tabla, "managerial") : estandar;
      if (entrada.gerencial && !alto) observaciones.push("The twelve-month probation needs a wage of at least twice the national minimum wage, so the standard period applies.");
    }
    observaciones.push("Your employer can agree a shorter probation. Two weeks or more of approved leave extend it by the same time.");
    return { meses: redondear(meses), semanas: redondear((meses * 52) / 12), observaciones };
  },
  resultado: [
    { clave: "meses", etiqueta: "Probation period", formato: "meses", decimales: 2, destacada: true },
    { clave: "semanas", etiqueta: "About", formato: "semanas", decimales: 1 },
  ],
});
