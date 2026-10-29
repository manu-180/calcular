import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "gm.vat-registration",
  mercado: "gm",
  concepto: "propio",
  slug: "vat-registration",
  estado: "publicado",
  requiere: {
    "gm.vat-registration-threshold": "numero",
    "gm.vat-voluntary-threshold": "numero",
  },
  campos: [{ id: "ventas", tipo: "moneda", etiqueta: "Taxable sales in the tax year", min: 0, porDefecto: 1500000, ayuda: "Sales of goods and services that are not exempt, without VAT." }],
  calcular(entrada, v, { redondear }) {
    if (entrada.ventas <= 0) throw new ErrorEntrada("Enter your taxable sales.", "ventas");
    const obligatorio = v["gm.vat-registration-threshold"];
    const voluntario = v["gm.vat-voluntary-threshold"];
    const situacion =
      entrada.ventas >= obligatorio
        ? "You must register for VAT"
        : entrada.ventas >= voluntario
          ? "You may register voluntarily"
          : "You cannot register for VAT";
    return {
      situacion,
      faltaObligatorio: entrada.ventas >= obligatorio ? null : redondear(obligatorio - entrada.ventas),
      faltaVoluntario: entrada.ventas >= voluntario ? null : redondear(voluntario - entrada.ventas),
    };
  },
  resultado: [
    { clave: "situacion", etiqueta: "Your VAT position", formato: "texto", destacada: true },
    { clave: "faltaObligatorio", etiqueta: "Sales left before registration is compulsory", formato: "moneda" },
    { clave: "faltaVoluntario", etiqueta: "Sales left before you can register voluntarily", formato: "moneda" },
  ],
});
