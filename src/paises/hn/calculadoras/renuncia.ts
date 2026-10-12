import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";
import {
  cesantia,
  decimoProporcional,
  MES_INICIO_DECIMO_CUARTO,
  MES_INICIO_DECIMO_TERCERO,
  salarioDiario,
  textoTiempo,
  tiempoTrabajado,
  tramoPreaviso,
  validarFechas,
} from "../reglas";

export default definirCalculadora({
  id: "hn.renuncia",
  mercado: "hn",
  concepto: "propio",
  slug: "renuncia",
  estado: "publicado",
  requiere: {
    "hn.preaviso-dias": "mapa",
    "hn.preaviso-omitido": "mapa",
    "hn.cesantia-dias-menos-de-un-anio": "mapa",
    "hn.cesantia-tope-meses": "mapa",
    "hn.cesantia-renuncia-porcentaje": "numero",
    "hn.cesantia-renuncia-anios": "numero",
    "hn.decimo-tercero": "numero",
    "hn.decimo-cuarto": "numero",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario promedio mensual de los últimos seis meses", min: 0 },
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "fechaSalida", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
    { id: "diasPendientes", tipo: "numero", etiqueta: "Días de vacaciones ganadas que no tomó", min: 0, porDefecto: 0 },
    { id: "microempresa", tipo: "si-no", etiqueta: "La empresa tiene 10 empleados o menos", porDefecto: false },
  ],
  calcular(entrada, valores, { redondear }) {
    validarFechas(entrada.fechaIngreso, entrada.fechaSalida);
    const t = tiempoTrabajado(entrada.fechaIngreso, entrada.fechaSalida);
    const diario = salarioDiario(entrada.salario);
    const observaciones: string[] = [];

    const anios = valores["hn.cesantia-renuncia-anios"];
    let cesantiaMonto = 0;
    if (entrada.microempresa) observaciones.push("En una microempresa la renuncia no da derecho a cesantía.");
    else if (t.anios >= anios) {
      const tope = enMapa(valores["hn.cesantia-tope-meses"], "general");
      const c = cesantia(t, valores["hn.cesantia-dias-menos-de-un-anio"], tope);
      cesantiaMonto = redondear(porcentaje(entrada.salario * c.meses, valores["hn.cesantia-renuncia-porcentaje"]));
    } else observaciones.push(`La cesantía por renuncia solo corresponde con ${anios} años o más de trabajo continuo.`);

    const vacaciones = redondear(diario * entrada.diasPendientes);
    const decimoTercero = redondear(
      decimoProporcional(entrada.salario, valores["hn.decimo-tercero"], entrada.fechaIngreso, entrada.fechaSalida, MES_INICIO_DECIMO_TERCERO).monto,
    );
    const decimoCuarto = redondear(
      decimoProporcional(entrada.salario, valores["hn.decimo-cuarto"], entrada.fechaIngreso, entrada.fechaSalida, MES_INICIO_DECIMO_CUARTO).monto,
    );

    const diasPreaviso = enMapa(valores["hn.preaviso-dias"], tramoPreaviso(t));
    const reclamoPreaviso = redondear(porcentaje(diario * diasPreaviso, enMapa(valores["hn.preaviso-omitido"], "trabajador")));
    observaciones.push(`Avise por escrito con ${diasPreaviso} ${diasPreaviso === 1 ? "día" : "días"} de anticipación. Si no lo hace, el patrono puede reclamarle la mitad del salario de ese tiempo.`);

    return {
      tiempo: textoTiempo(t),
      cesantia: cesantiaMonto,
      vacaciones,
      decimoTercero,
      decimoCuarto,
      total: redondear(cesantiaMonto + vacaciones + decimoTercero + decimoCuarto),
      diasPreaviso,
      reclamoPreaviso,
      observaciones,
    };
  },
  resultado: [
    { clave: "tiempo", etiqueta: "Tiempo trabajado", formato: "texto" },
    { clave: "cesantia", etiqueta: "Cesantía por renuncia", formato: "moneda", ocultarSiCero: true },
    { clave: "vacaciones", etiqueta: "Vacaciones ganadas sin tomar", formato: "moneda", ocultarSiCero: true },
    { clave: "decimoTercero", etiqueta: "Décimo tercer mes proporcional", formato: "moneda" },
    { clave: "decimoCuarto", etiqueta: "Décimo cuarto mes proporcional", formato: "moneda" },
    { clave: "total", etiqueta: "Total a cobrar", formato: "moneda", destacada: true },
    { clave: "diasPreaviso", etiqueta: "Preaviso que usted debe dar", formato: "dias" },
    { clave: "reclamoPreaviso", etiqueta: "Lo que le pueden reclamar si no da el preaviso", formato: "moneda" },
  ],
});
