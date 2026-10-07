import { definirCalculadora } from "@/motor/calculo";
import { diasPreaviso, textoTiempo, tiempoTrabajado, validarFechas } from "../reglas";

export default definirCalculadora({
  id: "cr.preaviso",
  mercado: "cr",
  concepto: "preaviso",
  slug: "preaviso",
  estado: "publicado",
  requiere: {
    "cr.dias-mes-planilla": "numero",
    "cr.preaviso-dias": "mapa",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario promedio mensual de los últimos seis meses",
      ayuda: "Bruto, con horas extra y comisiones incluidas.",
      min: 0,
    },
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "fechaSalida", tipo: "fecha", etiqueta: "Fecha en que termina el contrato", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    validarFechas(entrada.fechaIngreso, entrada.fechaSalida);
    const t = tiempoTrabajado(entrada.fechaIngreso, entrada.fechaSalida);
    const dias = diasPreaviso(t, valores["cr.preaviso-dias"]);
    const diario = entrada.salario / valores["cr.dias-mes-planilla"];
    const observaciones = dias === 0 ? ["Con menos de tres meses de trabajo no hay obligación de dar preaviso."] : [];
    return {
      tiempo: textoTiempo(t),
      dias,
      salarioDiario: redondear(diario),
      preaviso: redondear(diario * dias),
      observaciones,
    };
  },
  resultado: [
    { clave: "tiempo", etiqueta: "Tiempo trabajado", formato: "texto" },
    { clave: "dias", etiqueta: "Días de preaviso", formato: "dias" },
    { clave: "salarioDiario", etiqueta: "Salario diario (promedio entre 30)", formato: "moneda" },
    { clave: "preaviso", etiqueta: "Preaviso en dinero", formato: "moneda", destacada: true },
  ],
});
