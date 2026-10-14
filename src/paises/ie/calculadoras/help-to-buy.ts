import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { euros } from "../lib/impuestos";

export default definirCalculadora({
  id: "ie.help-to-buy",
  mercado: "ie",
  concepto: "propio",
  slug: "help-to-buy",
  estado: "publicado",
  requiere: {
    "ie.htb-max": "numero",
    "ie.htb-percent": "numero",
    "ie.htb-max-value": "numero",
    "ie.htb-min-mortgage-percent": "numero",
  },
  campos: [
    { id: "precio", tipo: "moneda", etiqueta: "Purchase price of the new home", min: 0, porDefecto: 400000 },
    { id: "hipoteca", tipo: "moneda", etiqueta: "Mortgage amount", min: 0, porDefecto: 320000 },
    {
      id: "impuestos",
      tipo: "moneda",
      etiqueta: "Income Tax and DIRT you paid in the last 4 years",
      min: 0,
      porDefecto: 40000,
      ayuda: "Add up what all the buyers paid. USC and PRSI do not count.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.precio <= 0) throw new ErrorEntrada("Enter the purchase price.", "precio");
    const porcentaje = redondear((entrada.precio * v["ie.htb-percent"]) / 100);
    const maximo = v["ie.htb-max"];
    const observaciones: string[] = [];
    let elegible = true;
    if (entrada.precio > v["ie.htb-max-value"]) {
      elegible = false;
      observaciones.push(`The home has to cost ${euros(v["ie.htb-max-value"])} or less to qualify.`);
    }
    const minimaHipoteca = redondear((entrada.precio * v["ie.htb-min-mortgage-percent"]) / 100);
    if (entrada.hipoteca < minimaHipoteca) {
      elegible = false;
      observaciones.push(`The mortgage has to be at least ${v["ie.htb-min-mortgage-percent"]}% of the price, which is ${euros(minimaHipoteca)} here.`);
    }
    const reembolso = elegible ? redondear(Math.min(maximo, porcentaje, entrada.impuestos)) : 0;
    if (elegible) {
      const limite = reembolso === entrada.impuestos && entrada.impuestos < Math.min(maximo, porcentaje) ? "the tax you paid" : reembolso === maximo ? "the maximum" : "the share of the price";
      observaciones.push(`Your refund is limited by ${limite}. You must also be a first-time buyer, buy from a Revenue-approved developer and live in the home as your main home for five years.`);
    }
    return { reembolso, porcentaje, maximo, minimaHipoteca, observaciones };
  },
  resultado: [
    { clave: "reembolso", etiqueta: "Help to Buy refund", formato: "moneda", destacada: true },
    { clave: "porcentaje", etiqueta: "Share of the purchase price", formato: "moneda" },
    { clave: "maximo", etiqueta: "Maximum refund", formato: "moneda" },
    { clave: "minimaHipoteca", etiqueta: "Smallest mortgage allowed", formato: "moneda" },
  ],
});
