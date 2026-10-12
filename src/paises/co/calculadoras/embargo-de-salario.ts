import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "co.embargo-de-salario",
  mercado: "co",
  concepto: "propio",
  slug: "embargo-de-salario",
  estado: "publicado",
  requiere: {
    "co.smmlv": "numero",
    "co.embargo": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    { id: "tipo", tipo: "opcion-dato", etiqueta: "Por qué es el embargo", dato: "co.embargo", porDefecto: "excedente" },
  ],
  calcular(entrada, valores, { redondear }) {
    const smmlv = valores["co.smmlv"];
    const tasa = enMapa(valores["co.embargo"], entrada.tipo);
    // CST art. 156: para alimentos o cooperativas el porcentaje va sobre todo el salario; para el resto,
    // el mínimo es inembargable (art. 154) y solo se toma una parte del excedente (art. 155).
    const base = entrada.tipo === "excedente" ? Math.max(0, entrada.salario - smmlv) : entrada.salario;
    const maximo = redondear(porcentaje(base, tasa));
    const observaciones: string[] = [];
    if (entrada.tipo === "excedente" && entrada.salario <= smmlv) observaciones.push("El salario mínimo no se puede embargar por deudas comunes.");
    return {
      base,
      tasa,
      maximo,
      queda: entrada.salario - maximo,
      observaciones,
    };
  },
  resultado: [
    { clave: "base", etiqueta: "Parte del salario que se puede embargar", formato: "moneda", decimales: 0 },
    { clave: "tasa", etiqueta: "Porcentaje embargable", formato: "porcentaje" },
    { clave: "maximo", etiqueta: "Embargo máximo al mes", formato: "moneda", decimales: 0, destacada: true },
    { clave: "queda", etiqueta: "Lo mínimo que te queda", formato: "moneda", decimales: 0 },
  ],
});
