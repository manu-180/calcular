import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

export default definirCalculadora({
  id: "cr.embargo-de-salario",
  mercado: "cr",
  concepto: "propio",
  slug: "embargo-de-salario",
  estado: "publicado",
  requiere: {
    "cr.salario-minimo-mes": "mapa",
    "cr.salario-minimo-jornada": "mapa",
    "cr.embargo-proporciones": "mapa",
    "cr.embargo-multiplo": "numero",
    "cr.embargo-jornadas-mes": "numero",
  },
  campos: [
    {
      id: "salarioLiquido",
      tipo: "moneda",
      etiqueta: "Salario líquido mensual",
      ayuda: "Lo que queda después de rebajar la Caja, el Banco Popular y la renta.",
      min: 0,
    },
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Tipo de embargo",
      opciones: [
        { valor: "comun", etiqueta: "Deuda común (préstamo, tarjeta, cobro judicial)" },
        { valor: "pension-alimentaria", etiqueta: "Pensión alimentaria" },
      ],
      porDefecto: "comun",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const liquido = entrada.salarioLiquido;
    const proporciones = valores["cr.embargo-proporciones"];
    // Art. 172: el mínimo inembargable es el menor salario mensual del decreto; si el menor está fijado
    // por jornada, se multiplica por 26.
    const menorMes = Math.min(...Object.values(valores["cr.salario-minimo-mes"]));
    const menorJornada = Math.min(...Object.values(valores["cr.salario-minimo-jornada"])) * valores["cr.embargo-jornadas-mes"];
    const minimo = Math.min(menorMes, menorJornada);

    let embargable: number;
    const observaciones: string[] = [];
    if (entrada.tipo === "pension-alimentaria") {
      embargable = redondear(porcentaje(liquido, enMapa(proporciones, "pension-alimentaria")));
      observaciones.push("Por pensión alimentaria se puede embargar hasta la mitad del salario, aunque sea el mínimo. El monto exacto lo fija el juzgado.");
    } else {
      const tope = minimo * valores["cr.embargo-multiplo"];
      const primera = Math.max(0, Math.min(liquido, tope) - minimo);
      const segunda = Math.max(0, liquido - tope);
      embargable = redondear(
        redondear(porcentaje(primera, enMapa(proporciones, "hasta-tres-minimos"))) + redondear(porcentaje(segunda, enMapa(proporciones, "resto"))),
      );
      if (liquido <= minimo) observaciones.push("Su salario no supera el mínimo inembargable: por una deuda común no se puede embargar nada.");
      observaciones.push("Aunque tenga varios embargos, entre todos no pueden pasar de este monto.");
    }
    return {
      minimoInembargable: redondear(minimo),
      embargable,
      libre: redondear(liquido - embargable),
      observaciones,
    };
  },
  resultado: [
    { clave: "minimoInembargable", etiqueta: "Mínimo inembargable", formato: "moneda" },
    { clave: "embargable", etiqueta: "Monto máximo que se puede embargar por mes", formato: "moneda", destacada: true },
    { clave: "libre", etiqueta: "Lo que le queda del salario", formato: "moneda" },
  ],
});
