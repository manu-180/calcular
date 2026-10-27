import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "gm.capital-gains-tax",
  mercado: "gm",
  concepto: "propio",
  slug: "capital-gains-tax",
  estado: "publicado",
  requiere: {
    "gm.cgt-rates": "mapa",
    "gm.cgt-exempt-gain": "numero",
  },
  campos: [
    {
      id: "vendedor",
      tipo: "opcion",
      etiqueta: "Who is selling",
      opciones: [
        { valor: "individual", etiqueta: "An individual" },
        { valor: "company", etiqueta: "A company, partnership or trust" },
      ],
      porDefecto: "individual",
    },
    { id: "precio", tipo: "moneda", etiqueta: "Selling price", min: 0, porDefecto: 2000000 },
    { id: "costo", tipo: "moneda", etiqueta: "What you paid for the asset", min: 0, porDefecto: 1500000 },
    { id: "mejoras", tipo: "moneda", etiqueta: "Cost of improvements", min: 0, porDefecto: 0 },
    { id: "gastos", tipo: "moneda", etiqueta: "Selling expenses", min: 0, porDefecto: 0, ayuda: "Agent, legal and other costs of the sale." },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.precio <= 0) throw new ErrorEntrada("Enter the selling price.", "precio");
    const tasas = v["gm.cgt-rates"];
    const ganancia = entrada.precio - entrada.costo - entrada.mejoras - entrada.gastos;
    const sobreGanancia = porcentaje(Math.max(0, ganancia), entrada.vendedor === "individual" ? tasas["individual-gain"] : tasas["company-gain"]);
    const sobrePrecio = porcentaje(entrada.precio, entrada.vendedor === "individual" ? tasas["individual-consideration"] : tasas["company-consideration"]);
    const exenta = ganancia <= v["gm.cgt-exempt-gain"];
    const observaciones: string[] = [];
    if (exenta) observaciones.push("Your gain is not above the exempt amount, so no capital gains tax is due. You still file a capital gains tax return.");
    else if (sobrePrecio > sobreGanancia) observaciones.push("The tax on the selling price is higher than the tax on your gain, so that is what you pay.");
    return {
      impuesto: exenta ? 0 : redondear(Math.max(sobreGanancia, sobrePrecio)),
      ganancia: redondear(ganancia),
      sobreGanancia: redondear(sobreGanancia),
      sobrePrecio: redondear(sobrePrecio),
      observaciones,
    };
  },
  resultado: [
    { clave: "impuesto", etiqueta: "Capital gains tax", formato: "moneda", destacada: true },
    { clave: "ganancia", etiqueta: "Capital gain", formato: "moneda" },
    { clave: "sobreGanancia", etiqueta: "Tax worked out on the gain", formato: "moneda" },
    { clave: "sobrePrecio", etiqueta: "Tax worked out on the selling price", formato: "moneda" },
  ],
});
