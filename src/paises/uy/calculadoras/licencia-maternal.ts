import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";

export default definirCalculadora({
  id: "uy.licencia-maternal",
  mercado: "uy",
  concepto: "propio",
  slug: "licencia-maternal",
  estado: "publicado",
  requiere: {
    "uy.bpc": "numero",
    "uy.maternidad-semanas": "numero",
    "uy.maternidad-minimo": "numero",
    "uy.paternidad-dias": "mapa",
    "uy.licencias-especiales": "mapa",
  },
  campos: [
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Qué querés calcular",
      opciones: [
        { valor: "maternidad", etiqueta: "Licencia maternal (subsidio por maternidad)" },
        { valor: "paternidad", etiqueta: "Licencia paternal (subsidio por paternidad)" },
        { valor: "cuidados", etiqueta: "Medio horario para cuidados (hasta los 6 meses del bebé)" },
      ],
      porDefecto: "maternidad",
    },
    {
      id: "promedio",
      tipo: "moneda",
      etiqueta: "Promedio mensual nominal de los últimos 6 meses",
      ayuda: "Si trabajás por tu cuenta, el promedio de los últimos 12 meses.",
      min: 0,
    },
    {
      id: "semanas",
      tipo: "entero",
      etiqueta: "Semanas de licencia maternal",
      ayuda: "Son 14 como mínimo. Pueden llegar a 18 por parto múltiple, bebé de 1,5 kg o menos o parto muy prematuro.",
      min: 14,
      max: 18,
      porDefecto: 14,
    },
    {
      id: "dependiente",
      tipo: "si-no",
      etiqueta: "Sos trabajador dependiente (con licencia de 3 días pagos por la empresa)",
      ayuda: "Solo para la licencia paternal.",
      porDefecto: true,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.promedio <= 0) throw new ErrorEntrada("Escribí tu promedio mensual.", "promedio");
    if (entrada.tipo === "maternidad" && entrada.semanas < valores["uy.maternidad-semanas"]) throw new ErrorEntrada("La licencia maternal dura al menos 14 semanas.", "semanas");
    const minimo = valores["uy.maternidad-minimo"] * valores["uy.bpc"];
    const mensual = Math.max(entrada.promedio, minimo);
    const diario = mensual / 30;
    const observaciones: string[] = [];
    if (entrada.promedio < minimo) observaciones.push("Se te aplica el mínimo de dos BPC por mes.");
    if (entrada.tipo === "cuidados") {
      observaciones.push("Trabajás la mitad de tu horario (hasta 4 horas por día) y el BPS te paga la mitad del subsidio. Lo pueden usar la madre o el padre, por turnos, hasta que el bebé cumpla 6 meses.");
      return { dias: null, subsidio: redondear(mensual / 2), aguinaldo: redondear(mensual / 2 / 12), diasEmpresa: null, observaciones };
    }
    const dias = entrada.tipo === "maternidad" ? entrada.semanas * 7 : enMapa(valores["uy.paternidad-dias"], entrada.dependiente ? "dependiente" : "no-dependiente");
    const subsidio = redondear(diario * dias);
    if (entrada.tipo === "paternidad" && entrada.dependiente) observaciones.push("Los 3 primeros días (el del nacimiento y los dos siguientes) los paga la empresa como licencia común. Después empiezan los días del BPS.");
    observaciones.push("El BPS también paga la parte de licencia y salario vacacional que generás en esos días, y descuenta el aporte personal.");
    return { dias, subsidio, aguinaldo: redondear(subsidio / 12), diasEmpresa: entrada.tipo === "paternidad" && entrada.dependiente ? enMapa(valores["uy.licencias-especiales"], "paternidad") : null, observaciones };
  },
  resultado: [
    { clave: "dias", etiqueta: "Días de licencia que paga el BPS", formato: "dias" },
    { clave: "subsidio", etiqueta: "Subsidio del BPS", formato: "moneda", destacada: true, ayuda: "En el medio horario, el monto es por mes." },
    { clave: "aguinaldo", etiqueta: "Parte de aguinaldo", formato: "moneda" },
    { clave: "diasEmpresa", etiqueta: "Días que paga la empresa", formato: "dias" },
  ],
});
