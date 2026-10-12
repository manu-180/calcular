import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";
import { OPCIONES_PERIODO, salarioDiario } from "../nomina";

export default definirCalculadora({
  id: "mx.salario-por-hora",
  mercado: "mx",
  concepto: "propio",
  slug: "salario-por-hora",
  estado: "publicado",
  requiere: {
    "mx.horas-jornada": "mapa",
    "mx.recargo-hora-doble": "numero",
    "mx.recargo-hora-triple": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Tu sueldo bruto", min: 0 },
    { id: "periodo", tipo: "opcion", etiqueta: "Ese sueldo es", opciones: OPCIONES_PERIODO, porDefecto: "mensual" },
    { id: "jornada", tipo: "opcion-dato", dato: "mx.horas-jornada", etiqueta: "Tu jornada", porDefecto: "diurna" },
  ],
  calcular(entrada, valores, { redondear }) {
    const horas = enMapa(valores["mx.horas-jornada"], entrada.jornada);
    const diario = redondear(salarioDiario(entrada.sueldo, entrada.periodo));
    const hora = redondear(diario / horas);
    return {
      diario,
      horas,
      hora,
      doble: redondear(hora + porcentaje(hora, valores["mx.recargo-hora-doble"])),
      triple: redondear(hora + porcentaje(hora, valores["mx.recargo-hora-triple"])),
    };
  },
  resultado: [
    { clave: "diario", etiqueta: "Salario diario", formato: "moneda" },
    { clave: "horas", etiqueta: "Horas de tu jornada diaria", formato: "horas" },
    { clave: "hora", etiqueta: "Salario por hora", formato: "moneda", destacada: true },
    { clave: "doble", etiqueta: "Hora extra doble", formato: "moneda" },
    { clave: "triple", etiqueta: "Hora extra triple", formato: "moneda" },
  ],
});
