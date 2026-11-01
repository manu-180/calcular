import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "lr.nasscorp-pension",
  mercado: "lr",
  concepto: "jubilacion",
  slug: "nasscorp-pension",
  estado: "publicado",
  requiere: {
    "lr.pension-base-rate": "numero",
    "lr.pension-increment": "numero",
    "lr.pension-min-months": "mapa",
    "lr.pension-age": "numero",
    "lr.pension-grant-months": "numero",
  },
  campos: [
    {
      id: "mejores",
      tipo: "moneda",
      etiqueta: "Total earnings of your best five years",
      ayuda: "Add up your gross earnings in the five years you earned the most.",
      min: 0,
      porDefecto: 875000,
    },
    { id: "meses", tipo: "entero", etiqueta: "Monthly contributions paid", min: 0, porDefecto: 132 },
    { id: "nacimiento", tipo: "opcion-dato", etiqueta: "You were", dato: "lr.pension-min-months", porDefecto: "before-1980" },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.mejores <= 0) throw new ErrorEntrada("Enter your earnings of your best five years.", "mejores");
    if (entrada.meses < 0) throw new ErrorEntrada("Enter the number of monthly contributions.", "meses");
    const minimo = enMapa(v["lr.pension-min-months"], entrada.nacimiento);
    const promedio = redondear(entrada.mejores / 60);
    const observaciones: string[] = [];
    let tasa = 0;
    if (entrada.meses >= minimo) {
      tasa = v["lr.pension-base-rate"] + Math.floor((entrada.meses - minimo) / 10) * v["lr.pension-increment"];
    } else if (entrada.meses >= v["lr.pension-grant-months"]) {
      observaciones.push(`With fewer than ${minimo} monthly contributions you get a one-off retirement grant instead of a monthly pension.`);
    } else {
      observaciones.push(`You need at least ${v["lr.pension-grant-months"]} monthly contributions for a retirement grant.`);
    }
    observaciones.push(`The pension is paid from age ${v["lr.pension-age"]}.`);
    return {
      pension: tasa > 0 ? redondear(porcentaje(promedio, tasa)) : 0,
      promedio,
      tasa,
      minimo,
      faltan: Math.max(0, minimo - entrada.meses),
      observaciones,
    };
  },
  resultado: [
    { clave: "pension", etiqueta: "Retirement pension a month", formato: "moneda", destacada: true },
    { clave: "promedio", etiqueta: "Average monthly earnings (best five years)", formato: "moneda" },
    { clave: "tasa", etiqueta: "Pension rate", formato: "porcentaje", decimales: 0 },
    { clave: "minimo", etiqueta: "Minimum contributions for a pension", formato: "meses" },
    { clave: "faltan", etiqueta: "Contributions still missing", formato: "meses", ocultarSiCero: true },
  ],
});
