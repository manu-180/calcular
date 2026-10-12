import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";
import {
  cesantia,
  decimoProporcional,
  MES_INICIO_DECIMO_CUARTO,
  MES_INICIO_DECIMO_TERCERO,
  textoTiempo,
  tiempoTrabajado,
  validarFechas,
} from "../reglas";

export default definirCalculadora({
  id: "hn.muerte-del-trabajador",
  mercado: "hn",
  concepto: "propio",
  slug: "muerte-del-trabajador",
  estado: "publicado",
  requiere: {
    "hn.cesantia-dias-menos-de-un-anio": "mapa",
    "hn.cesantia-tope-meses": "mapa",
    "hn.cesantia-fallecimiento-porcentaje": "numero",
    "hn.cesantia-fallecimiento-meses": "numero",
    "hn.decimo-tercero": "numero",
    "hn.decimo-cuarto": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario promedio mensual de los últimos seis meses", min: 0 },
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "fechaFallecimiento", tipo: "fecha", etiqueta: "Fecha del fallecimiento" },
    { id: "microempresa", tipo: "si-no", etiqueta: "La empresa tiene 10 empleados o menos", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    validarFechas(entrada.fechaIngreso, entrada.fechaFallecimiento, "fechaFallecimiento");
    const t = tiempoTrabajado(entrada.fechaIngreso, entrada.fechaFallecimiento);
    const minimoMeses = valores["hn.cesantia-fallecimiento-meses"];
    const observaciones: string[] = [];
    let cesantiaMonto = 0;
    if (entrada.microempresa) observaciones.push("En una microempresa este beneficio no aplica.");
    else if (t.anios * 12 + t.meses < minimoMeses) observaciones.push(`Hace falta haber trabajado al menos ${minimoMeses} meses.`);
    else {
      const tope = enMapa(valores["hn.cesantia-tope-meses"], "general");
      const c = cesantia(t, valores["hn.cesantia-dias-menos-de-un-anio"], tope);
      cesantiaMonto = redondear(porcentaje(entrada.salario * c.meses, valores["hn.cesantia-fallecimiento-porcentaje"]));
    }
    const decimoTercero = redondear(
      decimoProporcional(entrada.salario, valores["hn.decimo-tercero"], entrada.fechaIngreso, entrada.fechaFallecimiento, MES_INICIO_DECIMO_TERCERO).monto,
    );
    const decimoCuarto = redondear(
      decimoProporcional(entrada.salario, valores["hn.decimo-cuarto"], entrada.fechaIngreso, entrada.fechaFallecimiento, MES_INICIO_DECIMO_CUARTO).monto,
    );
    observaciones.push("Vale para la muerte por causa natural. Si fue por un accidente o enfermedad de trabajo, use la calculadora de accidente de trabajo.");
    observaciones.push("No corresponde si el trabajador estaba cubierto contra el riesgo de muerte en el IHSS o en otro sistema donde aporta el patrono.");
    observaciones.push("A esto se suman las vacaciones ganadas que no tomó.");
    return {
      tiempo: textoTiempo(t),
      cesantia: cesantiaMonto,
      decimoTercero,
      decimoCuarto,
      total: redondear(cesantiaMonto + decimoTercero + decimoCuarto),
      observaciones,
    };
  },
  resultado: [
    { clave: "tiempo", etiqueta: "Tiempo trabajado", formato: "texto" },
    { clave: "cesantia", etiqueta: "Cesantía para los beneficiarios", formato: "moneda" },
    { clave: "decimoTercero", etiqueta: "Décimo tercer mes proporcional", formato: "moneda" },
    { clave: "decimoCuarto", etiqueta: "Décimo cuarto mes proporcional", formato: "moneda" },
    { clave: "total", etiqueta: "Total para los beneficiarios", formato: "moneda", destacada: true },
  ],
});
