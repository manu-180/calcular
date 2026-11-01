import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "bn.spk-self-employed-calculator",
  mercado: "bn",
  concepto: "propio",
  slug: "spk-self-employed-calculator",
  estado: "publicado",
  requiere: {
    "bn.se-minimum": "numero",
    "bn.se-maximum": "numero",
    "bn.se-matchup": "numero",
    "bn.se-unverified-cap": "numero",
  },
  campos: [
    { id: "aporte", tipo: "moneda", etiqueta: "What you pay into SPK this month", min: 0, porDefecto: 40 },
    {
      id: "estado",
      tipo: "opcion",
      etiqueta: "Your self-employed status with TAP",
      porDefecto: "verified",
      opciones: [
        { valor: "verified", etiqueta: "Verified self-employed member" },
        { valor: "unverified", etiqueta: "Unverified self-employed member" },
      ],
    },
  ],
  calcular(e, v, { redondear }) {
    if (e.aporte <= 0) throw new ErrorEntrada("Enter the amount you pay in.", "aporte");
    const observaciones: string[] = [];
    let retiro = 0;
    let match = 0;
    let cuentaMiembro = e.aporte;
    if (e.estado === "unverified") {
      if (e.aporte > v["bn.se-unverified-cap"]) throw new ErrorEntrada("An unverified member can pay in at most the monthly limit.", "aporte");
      observaciones.push("Unverified members get no Government Match-Up. Everything goes to the SPK Member Account as voluntary savings.");
    } else if (e.aporte >= v["bn.se-minimum"]) {
      retiro = Math.min(e.aporte, v["bn.se-maximum"]);
      match = v["bn.se-matchup"];
      cuentaMiembro = e.aporte - retiro;
    } else {
      observaciones.push("Below the minimum, there is no Match-Up and the money stays in the Member Account, where you can withdraw it under the usual rules.");
    }
    return {
      retiro: redondear(retiro),
      match: redondear(match),
      cuentaMiembro: redondear(cuentaMiembro),
      anualRetiro: redondear((retiro + match) * 12),
      observaciones,
    };
  },
  resultado: [
    { clave: "retiro", etiqueta: "Your money in the SPK Retirement Account", formato: "moneda", destacada: true },
    { clave: "match", etiqueta: "Government Match-Up", formato: "moneda" },
    { clave: "cuentaMiembro", etiqueta: "Your money in the SPK Member Account", formato: "moneda" },
    { clave: "anualRetiro", etiqueta: "Retirement Account savings over 12 months", formato: "moneda" },
  ],
});
