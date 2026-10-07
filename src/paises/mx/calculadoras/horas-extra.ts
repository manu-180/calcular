import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { OPCIONES_PERIODO, salarioDiario } from "../nomina";

export default definirCalculadora({
  id: "mx.horas-extra",
  mercado: "mx",
  concepto: "horas-extra",
  slug: "horas-extra",
  estado: "publicado",
  requiere: {
    "mx.horas-jornada": "mapa",
    "mx.horas-extra-semana": "numero",
    "mx.horas-triples-semana": "numero",
    "mx.maximo-horas-dia": "numero",
    "mx.recargo-hora-doble": "numero",
    "mx.recargo-hora-triple": "numero",
    "mx.jornada-semanal": "numero",
  },
  campos: [
    { id: "sueldo", tipo: "moneda", etiqueta: "Tu sueldo bruto", min: 0 },
    { id: "periodo", tipo: "opcion", etiqueta: "Ese sueldo es", opciones: OPCIONES_PERIODO, porDefecto: "mensual" },
    { id: "jornada", tipo: "opcion-dato", dato: "mx.horas-jornada", etiqueta: "Tu jornada", porDefecto: "diurna" },
    { id: "horas", tipo: "numero", etiqueta: "Horas extra que trabajaste en la semana", min: 0, max: 60 },
  ],
  calcular(entrada, valores, { redondear }) {
    if (entrada.horas < 0) throw new ErrorEntrada("Las horas extra no pueden ser negativas.", "horas");
    const horasJornada = enMapa(valores["mx.horas-jornada"], entrada.jornada);
    const diario = redondear(salarioDiario(entrada.sueldo, entrada.periodo));
    const hora = redondear(diario / horasJornada);
    const limite = valores["mx.horas-extra-semana"];
    const maxTriples = valores["mx.horas-triples-semana"];
    const dobles = Math.min(entrada.horas, limite);
    const triples = Math.max(0, entrada.horas - limite);
    const pagoDobles = redondear(dobles * (hora + porcentaje(hora, valores["mx.recargo-hora-doble"])));
    const pagoTriples = redondear(triples * (hora + porcentaje(hora, valores["mx.recargo-hora-triple"])));
    const observaciones: string[] = [];
    if (triples > maxTriples) {
      observaciones.push(`Pasaste el máximo que permite la ley: ${limite + maxTriples} horas extra por semana. Igual se te pagan todas, las que pasan el límite al triple.`);
    }
    observaciones.push(`Sumando las horas extra, ningún día puede pasar de ${valores["mx.maximo-horas-dia"]} horas de trabajo.`);
    return {
      jornadaSemanal: valores["mx.jornada-semanal"],
      hora,
      dobles,
      triples,
      pagoDobles,
      pagoTriples,
      total: redondear(pagoDobles + pagoTriples),
      observaciones,
    };
  },
  resultado: [
    { clave: "hora", etiqueta: "Valor de tu hora normal", formato: "moneda" },
    { clave: "dobles", etiqueta: "Horas que se pagan dobles", formato: "horas" },
    { clave: "pagoDobles", etiqueta: "Pago de las horas dobles", formato: "moneda" },
    { clave: "triples", etiqueta: "Horas que se pagan triples", formato: "horas", ocultarSiCero: true },
    { clave: "pagoTriples", etiqueta: "Pago de las horas triples", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total por horas extra en la semana", formato: "moneda", destacada: true },
    { clave: "jornadaSemanal", etiqueta: "Jornada máxima por semana este año", formato: "horas" },
  ],
});
