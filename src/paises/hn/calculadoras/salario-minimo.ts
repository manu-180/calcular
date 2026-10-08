import { definirCalculadora, enMapa } from "@/motor/calculo";

export default definirCalculadora({
  id: "hn.salario-minimo",
  mercado: "hn",
  concepto: "salario-minimo",
  slug: "salario-minimo",
  estado: "publicado",
  requiere: {
    "hn.salario-minimo-mensual": "mapa",
    "hn.salario-minimo-diario": "mapa",
    "hn.salario-minimo-hora": "mapa",
  },
  campos: [
    {
      id: "rama",
      tipo: "opcion",
      etiqueta: "Rama de actividad de la empresa",
      opciones: [
        { valor: "agricultura", etiqueta: "Agricultura, silvicultura, caza y pesca" },
        { valor: "minas", etiqueta: "Explotación de minas y canteras" },
        { valor: "manufactura", etiqueta: "Industria manufacturera" },
        { valor: "electricidad", etiqueta: "Electricidad, gas y agua" },
        { valor: "construccion", etiqueta: "Construcción" },
        { valor: "comercio", etiqueta: "Comercio al por mayor y menor" },
        { valor: "restaurantes-hoteles", etiqueta: "Restaurantes y hoteles" },
        { valor: "transporte", etiqueta: "Transporte, almacenamiento y comunicaciones" },
        { valor: "financieros", etiqueta: "Financieras, bienes inmuebles y servicios a empresas" },
        { valor: "servicios-comunales", etiqueta: "Servicios comunales, sociales y personales, seguridad y limpieza" },
        { valor: "hospitales", etiqueta: "Hospitales" },
      ],
      porDefecto: "comercio",
    },
    {
      id: "tamano",
      tipo: "opcion",
      etiqueta: "Cantidad de trabajadores de la empresa",
      opciones: [
        { valor: "1-10", etiqueta: "De 1 a 10" },
        { valor: "11-50", etiqueta: "De 11 a 50" },
        { valor: "51-150", etiqueta: "De 51 a 150" },
        { valor: "151-mas", etiqueta: "151 o más" },
      ],
      porDefecto: "1-10",
    },
    { id: "sueldo", tipo: "moneda", etiqueta: "Su salario mensual (opcional, para compararlo)", min: 0, requerido: false },
  ],
  calcular(entrada, valores, { redondear }) {
    const clave = `${entrada.rama}-${entrada.tamano}`;
    const mensual = enMapa(valores["hn.salario-minimo-mensual"], clave);
    const diario = enMapa(valores["hn.salario-minimo-diario"], clave);
    const hora = enMapa(valores["hn.salario-minimo-hora"], clave);
    const observaciones: string[] = [];
    if (entrada.rama === "agricultura") observaciones.push("En una agroindustria, quien trabaja en el área industrial cobra el mínimo de la industria manufacturera.");
    if (entrada.rama === "manufactura") observaciones.push("La maquila textil y las empresas de zona libre tienen su propio salario mínimo y no entran en esta tabla.");
    let diferencia: number | null = null;
    if (entrada.sueldo !== null) {
      diferencia = redondear(entrada.sueldo - mensual);
      observaciones.push(
        diferencia < 0
          ? "Su salario está por debajo del mínimo. Por una jornada completa no le pueden pagar menos."
          : "Su salario está en el mínimo o por encima.",
      );
    }
    return { mensual, diario, hora, diferencia, observaciones };
  },
  resultado: [
    { clave: "mensual", etiqueta: "Salario mínimo mensual", formato: "moneda", destacada: true },
    { clave: "diario", etiqueta: "Por jornada ordinaria de 8 horas", formato: "moneda" },
    { clave: "hora", etiqueta: "Por hora", formato: "moneda" },
    { clave: "diferencia", etiqueta: "Diferencia entre su salario y el mínimo", formato: "moneda" },
  ],
});
