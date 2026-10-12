import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";

const DIAS_DEL_MES = 30;
const MESES = 12;

// Aguinaldo, vacaciones y Quincena 25 se pagan una vez al año: se reparten en doce meses para mostrar
// el costo mensual real de un puesto.
export default definirCalculadora({
  id: "sv.costo-empleador",
  mercado: "sv",
  concepto: "costo-empleador",
  slug: "costo-empleador",
  estado: "publicado",
  requiere: {
    "sv.afp-patrono": "numero",
    "sv.isss-patrono": "numero",
    "sv.isss-salario-maximo": "numero",
    "sv.aguinaldo-dias": "mapa",
    "sv.vacaciones-dias": "numero",
    "sv.vacaciones-recargo": "numero",
    "sv.quincena25-porcentaje": "numero",
    "sv.quincena25-salario-maximo": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual del trabajador", min: 0 },
    {
      id: "antiguedad",
      tipo: "opcion",
      etiqueta: "Antigüedad del trabajador",
      ayuda: "Define los días de aguinaldo.",
      opciones: [
        { valor: "uno-a-tres", etiqueta: "Menos de 3 años" },
        { valor: "tres-a-diez", etiqueta: "De 3 a menos de 10 años" },
        { valor: "diez-o-mas", etiqueta: "10 años o más" },
      ],
      porDefecto: "uno-a-tres",
    },
    { id: "quincena25", tipo: "si-no", etiqueta: "Incluir la Quincena 25", ayuda: "Obligatoria para empresas privadas desde enero de 2027.", porDefecto: true },
  ],
  calcular(entrada, valores, { redondear }) {
    const diario = entrada.salario / DIAS_DEL_MES;
    const isss = redondear(porcentaje(Math.min(entrada.salario, valores["sv.isss-salario-maximo"]), valores["sv.isss-patrono"]));
    const afp = redondear(porcentaje(entrada.salario, valores["sv.afp-patrono"]));
    const aguinaldo = redondear((diario * enMapa(valores["sv.aguinaldo-dias"], entrada.antiguedad)) / MESES);
    const salarioVacaciones = diario * valores["sv.vacaciones-dias"];
    const vacaciones = redondear((salarioVacaciones + porcentaje(salarioVacaciones, valores["sv.vacaciones-recargo"])) / MESES);
    const aplicaQuincena = entrada.quincena25 && entrada.salario <= valores["sv.quincena25-salario-maximo"];
    const quincena = aplicaQuincena ? redondear(porcentaje(entrada.salario, valores["sv.quincena25-porcentaje"]) / MESES) : 0;
    const mensual = redondear(entrada.salario + isss + afp + aguinaldo + vacaciones + quincena);
    const observaciones = [
      "Si la empresa tiene diez o más trabajadores, suma además el aporte a INSAFORP sobre la planilla.",
      "No incluye indemnizaciones, horas extra ni bonos que la empresa pague por su cuenta.",
    ];
    return {
      isss,
      afp,
      aguinaldo,
      vacaciones,
      quincena,
      mensual,
      anual: redondear(mensual * MESES),
      observaciones,
    };
  },
  resultado: [
    { clave: "isss", etiqueta: "ISSS patronal", formato: "moneda" },
    { clave: "afp", etiqueta: "AFP patronal", formato: "moneda" },
    { clave: "aguinaldo", etiqueta: "Aguinaldo (por mes)", formato: "moneda" },
    { clave: "vacaciones", etiqueta: "Vacaciones con recargo (por mes)", formato: "moneda" },
    { clave: "quincena", etiqueta: "Quincena 25 (por mes)", formato: "moneda", ocultarSiCero: true },
    { clave: "mensual", etiqueta: "Costo mensual total", formato: "moneda", destacada: true },
    { clave: "anual", etiqueta: "Costo anual total", formato: "moneda" },
  ],
});
