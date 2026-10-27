import { aplicarEscala, definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "rw.small-business-tax-calculator",
  mercado: "rw",
  concepto: "regimen-simplificado",
  slug: "small-business-tax-calculator",
  estado: "publicado",
  requiere: {
    "rw.flat-tax": "escala",
    "rw.lump-sum-rate": "numero",
    "rw.lump-sum-upper": "numero",
  },
  campos: [{ id: "facturacion", tipo: "moneda", etiqueta: "Annual turnover", min: 0, porDefecto: 8000000 }],
  calcular(e, v, { redondear }) {
    if (e.facturacion <= 0) throw new ErrorEntrada("Enter the turnover for the year.", "facturacion");
    const escala = v["rw.flat-tax"];
    const topeMicro = escala[escala.length - 1].hasta ?? 0;
    if (e.facturacion > v["rw.lump-sum-upper"]) {
      return {
        impuesto: null,
        regimen: "Real regime",
        observaciones: ["Above this turnover you pay tax on actual profit and must keep full accounts. Use the business income tax calculator."],
      };
    }
    if (e.facturacion > topeMicro) {
      const impuesto = redondear(porcentaje(e.facturacion, v["rw.lump-sum-rate"]));
      return {
        impuesto,
        regimen: "Flat-rate (lump sum) regime",
        observaciones: ["You can ask to be taxed on actual profit instead if you keep simplified accounts. That choice holds for three years."],
      };
    }
    const impuesto = aplicarEscala(escala, e.facturacion);
    return {
      impuesto,
      regimen: "Micro-enterprise flat amount",
      observaciones: impuesto === 0 ? ["No income tax is due at this turnover."] : ["After the first year you pay quarterly prepayments based on your quarterly turnover."],
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Income tax for the year", formato: "moneda", destacada: true },
    { clave: "regimen", etiqueta: "Tax regime", formato: "texto" },
  ],
});
