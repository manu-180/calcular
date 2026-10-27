import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "qa.property-registration-fee",
  mercado: "qa",
  concepto: "propio",
  slug: "property-registration-fee",
  estado: "publicado",
  requiere: {
    "qa.property-registration-rates": "mapa",
    "qa.property-registration-fixed": "mapa",
  },
  campos: [
    {
      id: "operacion",
      tipo: "opcion",
      etiqueta: "Transaction",
      opciones: [
        { valor: "venta", etiqueta: "Sale" },
        { valor: "donacionFamilia", etiqueta: "Gift to parents, children or spouse" },
        { valor: "donacionOtros", etiqueta: "Gift to anyone else" },
        { valor: "herencia", etiqueta: "Transfer by inheritance" },
        { valor: "hipoteca", etiqueta: "Mortgage" },
      ],
      porDefecto: "venta",
    },
    { id: "valor", tipo: "moneda", etiqueta: "Property value or mortgage amount", ayuda: "For a mortgage, the debt it secures.", min: 0, porDefecto: 2500000, visibleSi: { operacion: ["venta", "donacionOtros", "hipoteca"] } },
    { id: "inmuebles", tipo: "entero", etiqueta: "Number of properties", min: 1, max: 100, porDefecto: 1, visibleSi: { operacion: ["herencia"] } },
  ],
  calcular(entrada, v, { redondear }) {
    const tasas = v["qa.property-registration-rates"];
    const fijas = v["qa.property-registration-fixed"];
    const valor = entrada.valor ?? 0;
    if (["venta", "donacionOtros", "hipoteca"].includes(entrada.operacion) && valor <= 0) throw new ErrorEntrada("Enter the value.", "valor");
    let tasa = 0;
    let tarifa = 0;
    if (entrada.operacion === "venta") tasa = enMapa(tasas, "sale");
    else if (entrada.operacion === "donacionOtros") tasa = enMapa(tasas, "gift-other");
    else if (entrada.operacion === "hipoteca") tasa = enMapa(tasas, "mortgage");
    else if (entrada.operacion === "donacionFamilia") tarifa = enMapa(fijas, "gift-family");
    else tarifa = enMapa(fijas, "inheritance") * (entrada.inmuebles ?? 1);
    const tasaRegistro = tasa > 0 ? redondear(porcentaje(valor, tasa)) : redondear(tarifa);
    return { tasaRegistro, tasa, observaciones: ["Transactions for ministries, public bodies and charitable gifts are exempt."] };
  },
  resultado: [
    { clave: "tasaRegistro", etiqueta: "Registration fee", formato: "moneda", destacada: true },
    { clave: "tasa", etiqueta: "Fee rate", formato: "porcentaje", decimales: 3, ocultarSiCero: true },
  ],
});
