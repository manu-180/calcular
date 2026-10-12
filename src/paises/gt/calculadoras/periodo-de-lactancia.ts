import { definirCalculadora, enMapa } from "@/motor/calculo";
import { DIAS_MES, sumarMeses } from "../prestaciones";

export default definirCalculadora({
  id: "gt.periodo-de-lactancia",
  mercado: "gt",
  concepto: "propio",
  slug: "periodo-de-lactancia",
  estado: "publicado",
  requiere: {
    "gt.lactancia-meses": "numero",
    "gt.lactancia-horas": "numero",
    "gt.jornada-horas": "mapa",
  },
  campos: [
    { id: "regreso", tipo: "fecha", etiqueta: "Día en que regresó (o regresa) a trabajar" },
    { id: "salario", tipo: "moneda", etiqueta: "Salario mensual", min: 0 },
    { id: "jornada", tipo: "opcion-dato", dato: "gt.jornada-horas", etiqueta: "Su jornada", porDefecto: "diurna" },
  ],
  calcular(entrada, valores, { redondear }) {
    const horas = enMapa(valores["gt.jornada-horas"], entrada.jornada);
    const valorHora = redondear(entrada.salario / DIAS_MES / horas);
    return {
      fin: sumarMeses(entrada.regreso, valores["gt.lactancia-meses"]),
      horasDiarias: valores["gt.lactancia-horas"],
      valorHora,
      valorDiario: redondear(valorHora * valores["gt.lactancia-horas"]),
      observaciones: [
        "Puede tomarla en dos medias horas o juntarla para entrar una hora después o salir una hora antes.",
        "Esa hora se paga como trabajada: no se la pueden descontar.",
        "Si su médico lo indica, el período de lactancia se puede alargar.",
      ],
    };
  },
  resultado: [
    { clave: "fin", etiqueta: "Su período de lactancia dura hasta el", formato: "fecha" },
    { clave: "horasDiarias", etiqueta: "Tiempo libre pagado cada día", formato: "horas" },
    { clave: "valorDiario", etiqueta: "Lo que vale ese tiempo cada día", formato: "moneda", destacada: true },
    { clave: "valorHora", etiqueta: "Valor de una hora de su salario", formato: "moneda" },
  ],
});
