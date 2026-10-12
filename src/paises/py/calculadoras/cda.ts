import { definirCalculadora } from "@/motor/calculo";

export default definirCalculadora({
  id: "py.cda",
  mercado: "py",
  concepto: "plazo-fijo",
  slug: "cda",
  estado: "publicado",
  requiere: {},
  campos: [
    { id: "monto", tipo: "moneda", etiqueta: "Monto a invertir", min: 0 },
    { id: "tasa", tipo: "porcentaje", etiqueta: "Tasa anual que te ofrece el banco", ayuda: "La que figura en la oferta del CDA (por ejemplo, 7,5).", min: 0, max: 50 },
    { id: "dias", tipo: "entero", etiqueta: "Plazo en días", min: 1, max: 3650, porDefecto: 360 },
  ],
  calcular(entrada, _valores, { redondear }) {
    // Interés simple sobre año de 365 días, la base con que los bancos informan las tasas de CDA.
    const interes = redondear((entrada.monto * entrada.tasa * entrada.dias) / 100 / 365);
    return {
      interes,
      total: redondear(entrada.monto + interes),
      mensual: redondear((interes / entrada.dias) * 30),
      observaciones: [
        "Los intereses de depósitos en bancos, financieras y cooperativas del país no pagan IRP (Ley 6380, artículo 56).",
        "Si el banco paga los intereses cada mes o cada trimestre, el monto total es el mismo; cambia cuándo lo cobrás.",
      ],
    };
  },
  resultado: [
    { clave: "interes", etiqueta: "Intereses al vencimiento", formato: "moneda", destacada: true },
    { clave: "total", etiqueta: "Total a cobrar", formato: "moneda" },
    { clave: "mensual", etiqueta: "Intereses por mes, en promedio", formato: "moneda" },
  ],
});
