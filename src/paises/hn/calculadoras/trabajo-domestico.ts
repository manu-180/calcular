import { definirCalculadora, enMapa } from "@/motor/calculo";
import { diasEntre } from "@/motor/vigencia";
import { salarioDiario, textoTiempo, tiempoTrabajado, validarFechas } from "../reglas";

export default definirCalculadora({
  id: "hn.trabajo-domestico",
  mercado: "hn",
  concepto: "trabajo-domestico",
  slug: "trabajo-domestico",
  estado: "publicado",
  requiere: {
    "hn.periodo-prueba-dias": "mapa",
    "hn.preaviso-domestico-dias": "mapa",
    "hn.indemnizacion-domestico-dias": "mapa",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario mensual en dinero",
      ayuda: "Solo lo que recibe en efectivo. La comida y el cuarto no cuentan para estos pagos.",
      min: 0,
    },
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "fechaSalida", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
    {
      id: "motivo",
      tipo: "opcion",
      etiqueta: "Cómo terminó el trabajo",
      opciones: [
        { valor: "despido", etiqueta: "El patrono me despidió sin darme el aviso" },
        { valor: "maltrato", etiqueta: "Me fui por maltrato" },
        { valor: "falta-pago", etiqueta: "Me fui porque no me pagaban el salario" },
        { valor: "renuncia", etiqueta: "Renuncié" },
      ],
      porDefecto: "despido",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    validarFechas(entrada.fechaIngreso, entrada.fechaSalida);
    const t = tiempoTrabajado(entrada.fechaIngreso, entrada.fechaSalida);
    const diasServicio = diasEntre(entrada.fechaIngreso, entrada.fechaSalida) + 1;
    const diasPrueba = enMapa(valores["hn.periodo-prueba-dias"], "domestico");
    const enPrueba = diasServicio <= diasPrueba;
    const tramo = enPrueba ? "prueba" : t.anios >= 1 ? "1-anio-o-mas" : "menos-de-1-anio";
    const diasAviso = enMapa(valores["hn.preaviso-domestico-dias"], tramo);
    const diario = salarioDiario(entrada.salario);
    const observaciones: string[] = [];

    let diasPreaviso = 0;
    let diasIndemnizacion = 0;
    if (entrada.motivo === "despido") diasPreaviso = diasAviso;
    else if (entrada.motivo === "maltrato") diasIndemnizacion = enMapa(valores["hn.indemnizacion-domestico-dias"], "maltrato");
    else if (entrada.motivo === "falta-pago")
      diasIndemnizacion = enMapa(valores["hn.indemnizacion-domestico-dias"], t.anios >= 1 ? "falta-pago-1-anio-o-mas" : "falta-pago-menos-de-1-anio");
    else observaciones.push(`Si renuncia, avise con ${diasAviso} ${diasAviso === 1 ? "día" : "días"} de anticipación.`);

    if (enPrueba) observaciones.push(`Está dentro de los primeros ${diasPrueba} días, que son de prueba.`);
    observaciones.push("Aparte de esto le corresponden las vacaciones y los décimos tercer y cuarto mes proporcionales.");
    observaciones.push("Si el despido fue por abandono, falta de respeto o descuido, el patrono solo paga los días trabajados.");

    const preaviso = redondear(diario * diasPreaviso);
    const indemnizacion = redondear(diario * diasIndemnizacion);
    return {
      tiempo: textoTiempo(t),
      diasAviso,
      preaviso,
      indemnizacion,
      total: redondear(preaviso + indemnizacion),
      observaciones,
    };
  },
  resultado: [
    { clave: "tiempo", etiqueta: "Tiempo trabajado", formato: "texto" },
    { clave: "diasAviso", etiqueta: "Días de aviso que corresponden", formato: "dias" },
    { clave: "preaviso", etiqueta: "Pago por el aviso que no le dieron", formato: "moneda", ocultarSiCero: true },
    { clave: "indemnizacion", etiqueta: "Indemnización", formato: "moneda", ocultarSiCero: true },
    { clave: "total", etiqueta: "Total a cobrar", formato: "moneda", destacada: true },
  ],
});
