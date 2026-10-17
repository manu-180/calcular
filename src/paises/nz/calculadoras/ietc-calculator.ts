import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { ietc } from "../lib/impuestos";

export default definirCalculadora({
  id: "nz.ietc-calculator",
  mercado: "nz",
  concepto: "propio",
  slug: "ietc-calculator",
  estado: "publicado",
  requiere: {
    "nz.ietc-annual": "numero",
    "nz.ietc-lower-threshold": "numero",
    "nz.ietc-abatement-threshold": "numero",
    "nz.ietc-upper-threshold": "numero",
    "nz.ietc-abatement-rate": "numero",
  },
  campos: [
    { id: "ingreso", tipo: "moneda", etiqueta: "Your yearly income before tax", min: 0, porDefecto: 50000 },
    { id: "excluido", tipo: "si-no", etiqueta: "You or your partner get Working for Families, an income-tested benefit or NZ Super", porDefecto: false },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.ingreso < 0) throw new ErrorEntrada("Income can't be negative.", "ingreso");
    const credito = entrada.excluido
      ? 0
      : redondear(
          ietc(entrada.ingreso, {
            anual: v["nz.ietc-annual"],
            minimo: v["nz.ietc-lower-threshold"],
            inicioReduccion: v["nz.ietc-abatement-threshold"],
            maximo: v["nz.ietc-upper-threshold"],
            tasaReduccion: v["nz.ietc-abatement-rate"],
          }),
        );
    const observaciones: string[] = [];
    if (entrada.excluido) observaciones.push("You can't get the IETC for any month you or your partner get one of those payments.");
    else if (credito > 0) observaciones.push("Ask your employer to use the ME tax code (or ME SL with a student loan) and you get it through your pay.");
    return { credito, semanal: redondear(credito / 52), quincenal: redondear(credito / 26), observaciones };
  },
  resultado: [
    { clave: "credito", etiqueta: "Independent earner tax credit a year", formato: "moneda", destacada: true },
    { clave: "quincenal", etiqueta: "A fortnight", formato: "moneda" },
    { clave: "semanal", etiqueta: "A week", formato: "moneda" },
  ],
});
