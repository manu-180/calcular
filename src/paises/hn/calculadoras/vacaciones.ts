import { definirCalculadora, enMapa, ErrorEntrada } from "@/motor/calculo";
import { diasEntre } from "@/motor/vigencia";
import { DIAS_ANIO, DIAS_MES, ultimoAniversario } from "../reglas";

const FILA_MAXIMA = 4;

export default definirCalculadora({
  id: "hn.vacaciones",
  mercado: "hn",
  concepto: "vacaciones",
  slug: "vacaciones",
  estado: "publicado",
  requiere: {
    "hn.vacaciones-dias": "mapa",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario ordinario mensual promedio de los últimos seis meses",
      min: 0,
    },
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "fechaCorte", tipo: "fecha", etiqueta: "Fecha de hoy o último día de trabajo", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.fechaCorte < entrada.fechaIngreso) throw new ErrorEntrada("La fecha tiene que ser igual o posterior a la de ingreso.", "fechaCorte");
    const tabla = valores["hn.vacaciones-dias"];
    const aniversario = ultimoAniversario(entrada.fechaIngreso, entrada.fechaCorte);
    const anios = aniversario.anios;
    const diario = entrada.salario / DIAS_MES;
    const diasPeriodo = anios >= 1 ? enMapa(tabla, String(Math.min(anios, FILA_MAXIMA))) : 0;
    const diasSiguiente = enMapa(tabla, String(Math.min(anios + 1, FILA_MAXIMA)));
    const transcurridos = Math.min(DIAS_ANIO, diasEntre(aniversario.fecha, entrada.fechaCorte) + 1);
    const diasProporcionales = redondear((diasSiguiente * transcurridos) / DIAS_ANIO);
    const observaciones: string[] = [];
    if (anios === 0) observaciones.push("Todavía no cumple un año. Las vacaciones completas se ganan con cada año de trabajo continuo.");
    else observaciones.push("Los días son laborables y consecutivos. El patrono le avisa la fecha con 10 días de anticipación y le paga 3 días antes de que empiecen.");
    observaciones.push("La parte proporcional del año en curso se paga si el contrato termina antes del aniversario por causa del patrono, como un despido injustificado.");
    return {
      anios,
      diasPeriodo,
      pagoPeriodo: redondear(diario * diasPeriodo),
      diasSiguiente,
      diasProporcionales,
      pagoProporcional: redondear(diario * diasProporcionales),
      observaciones,
    };
  },
  resultado: [
    { clave: "anios", etiqueta: "Años cumplidos", formato: "anios" },
    { clave: "diasPeriodo", etiqueta: "Vacaciones por el último año cumplido", formato: "dias", ocultarSiCero: true },
    { clave: "pagoPeriodo", etiqueta: "Pago de esas vacaciones", formato: "moneda", destacada: true, ocultarSiCero: true },
    { clave: "diasSiguiente", etiqueta: "Días que le tocarán al cumplir el próximo año", formato: "dias" },
    { clave: "diasProporcionales", etiqueta: "Días proporcionales del año en curso", formato: "dias", decimales: 2 },
    { clave: "pagoProporcional", etiqueta: "Pago proporcional del año en curso", formato: "moneda" },
  ],
});
