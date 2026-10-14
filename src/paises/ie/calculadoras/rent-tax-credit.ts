import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "ie.rent-tax-credit",
  mercado: "ie",
  concepto: "propio",
  slug: "rent-tax-credit",
  estado: "publicado",
  requiere: {
    "ie.rent-tax-credit": "mapa",
    "ie.rent-tax-credit-rate": "numero",
  },
  campos: [
    { id: "alquiler", tipo: "moneda", etiqueta: "Rent you paid in the year", min: 0, porDefecto: 18000 },
    { id: "tipo", tipo: "opcion-dato", dato: "ie.rent-tax-credit", etiqueta: "Who is claiming", porDefecto: "single" },
    {
      id: "impuesto",
      tipo: "moneda",
      etiqueta: "Your Income Tax for the year, after other credits (optional)",
      min: 0,
      requerido: false,
      ayuda: "The credit cannot be more than the Income Tax you pay.",
    },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.alquiler <= 0) throw new ErrorEntrada("Enter the rent you paid in the year.", "alquiler");
    const tasa = v["ie.rent-tax-credit-rate"];
    const porAlquiler = redondear((entrada.alquiler * tasa) / 100);
    const maximo = enMapa(v["ie.rent-tax-credit"], entrada.tipo);
    let credito = Math.min(porAlquiler, maximo);
    const observaciones: string[] = [];
    if (entrada.impuesto !== null && entrada.impuesto < credito) {
      credito = entrada.impuesto;
      observaciones.push("Your credit is limited to the Income Tax you pay for the year.");
    }
    observaciones.push("The credit only reduces Income Tax. It does not reduce USC or PRSI. Rent does not include amounts for utilities, board or laundry.");
    return { credito: redondear(credito), porAlquiler, maximo, observaciones };
  },
  resultado: [
    { clave: "credito", etiqueta: "Rent Tax Credit", formato: "moneda", destacada: true },
    { clave: "porAlquiler", etiqueta: "Credit on the rent you paid, before the cap", formato: "moneda" },
    { clave: "maximo", etiqueta: "Maximum credit", formato: "moneda" },
  ],
});
