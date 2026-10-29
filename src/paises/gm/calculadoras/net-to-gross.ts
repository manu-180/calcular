import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { payeMensual } from "../lib/impuestos";

export default definirCalculadora({
  id: "gm.net-to-gross",
  mercado: "gm",
  concepto: "propio",
  slug: "net-to-gross",
  estado: "publicado",
  requiere: {
    "gm.paye-bands": "escala",
    "gm.npf-employee-rate": "numero",
  },
  campos: [
    { id: "neto", tipo: "moneda", etiqueta: "Take-home pay you want a month", min: 0, porDefecto: 15000 },
    {
      id: "esquema",
      tipo: "opcion",
      etiqueta: "Pension scheme",
      opciones: [
        { valor: "npf", etiqueta: "National Provident Fund" },
        { valor: "otro", etiqueta: "FPS or none (nothing deducted)" },
      ],
      porDefecto: "npf",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.neto <= 0) throw new ErrorEntrada("Enter the take-home pay you want.", "neto");
    const npfTasa = entrada.esquema === "npf" ? v["gm.npf-employee-rate"] : 0;
    const neto = (bruto: number) => bruto - payeMensual(v["gm.paye-bands"], bruto) - porcentaje(bruto, npfTasa);
    // El neto sube con el bruto: se busca por bisección el bruto que da el neto pedido.
    let bajo = entrada.neto;
    let alto = entrada.neto * 2 + 1000;
    for (let i = 0; i < 100; i++) {
      const medio = (bajo + alto) / 2;
      if (neto(medio) < entrada.neto) bajo = medio;
      else alto = medio;
    }
    const bruto = Math.ceil(alto * 100) / 100;
    return {
      bruto: redondear(bruto),
      paye: redondear(payeMensual(v["gm.paye-bands"], bruto)),
      npf: redondear(porcentaje(bruto, npfTasa)),
      netoReal: redondear(neto(bruto)),
    };
  },
  resultado: [
    { clave: "bruto", etiqueta: "Basic salary needed a month", formato: "moneda", destacada: true },
    { clave: "paye", etiqueta: "PAYE on that salary", formato: "moneda" },
    { clave: "npf", etiqueta: "Employee NPF contribution", formato: "moneda", ocultarSiCero: true },
    { clave: "netoReal", etiqueta: "Take-home pay", formato: "moneda" },
  ],
});
