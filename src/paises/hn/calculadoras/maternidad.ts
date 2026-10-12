import { definirCalculadora, enMapa } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";
import { salarioDiario } from "../reglas";

const DIAS_SEMANA = 7;

export default definirCalculadora({
  id: "hn.maternidad",
  mercado: "hn",
  concepto: "propio",
  slug: "maternidad",
  estado: "publicado",
  requiere: {
    "hn.maternidad-semanas": "mapa",
    "hn.maternidad-promedio-dias": "numero",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario promedio mensual de los últimos seis meses",
      ayuda: "El promedio de lo que ganó en los últimos 180 días antes de empezar el descanso.",
      min: 0,
    },
    { id: "fechaParto", tipo: "fecha", etiqueta: "Fecha probable del parto", ayuda: "La que indica el certificado médico." },
  ],
  calcular(entrada, valores, { redondear }) {
    const semanas = valores["hn.maternidad-semanas"];
    const diasAntes = enMapa(semanas, "antes") * DIAS_SEMANA;
    const diasDespues = enMapa(semanas, "despues") * DIAS_SEMANA;
    const dias = diasAntes + diasDespues;
    const diario = salarioDiario(entrada.salario);
    return {
      inicio: sumarDias(entrada.fechaParto, -diasAntes),
      fin: sumarDias(entrada.fechaParto, diasDespues),
      dias,
      diario: redondear(diario),
      total: redondear(diario * dias),
      observaciones: [
        "Si está asegurada en el IHSS, el Seguro Social le paga un subsidio y el patrono cubre la diferencia hasta su salario completo.",
        "Si el IHSS no está obligado a pagar el subsidio, el patrono paga todo.",
        "Al volver, tiene dos descansos de 30 minutos por día para alimentar a su bebé durante sus primeros seis meses.",
      ],
    };
  },
  resultado: [
    { clave: "inicio", etiqueta: "Empieza el descanso", formato: "fecha" },
    { clave: "fin", etiqueta: "Termina el descanso", formato: "fecha" },
    { clave: "dias", etiqueta: "Días de descanso pagado", formato: "dias" },
    { clave: "diario", etiqueta: "Salario diario promedio", formato: "moneda" },
    { clave: "total", etiqueta: "Pago total del descanso", formato: "moneda", destacada: true },
  ],
});
