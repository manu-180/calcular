import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";
import { salarioDiario, textoTiempo, tiempoTrabajado, tramoPreaviso, validarFechas } from "../reglas";

export default definirCalculadora({
  id: "hn.preaviso",
  mercado: "hn",
  concepto: "preaviso",
  slug: "preaviso",
  estado: "publicado",
  requiere: {
    "hn.preaviso-dias": "mapa",
    "hn.preaviso-omitido": "mapa",
  },
  campos: [
    {
      id: "salario",
      tipo: "moneda",
      etiqueta: "Salario promedio mensual de los últimos seis meses",
      min: 0,
    },
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "fechaAviso", tipo: "fecha", etiqueta: "Fecha en que se da el aviso", porDefecto: "hoy" },
    {
      id: "quien",
      tipo: "opcion",
      etiqueta: "Quién termina el contrato",
      opciones: [
        { valor: "patrono", etiqueta: "El patrono (despido)" },
        { valor: "trabajador", etiqueta: "El trabajador (renuncia)" },
      ],
      porDefecto: "patrono",
    },
  ],
  calcular(entrada, valores, { redondear }) {
    validarFechas(entrada.fechaIngreso, entrada.fechaAviso, "fechaAviso");
    const t = tiempoTrabajado(entrada.fechaIngreso, entrada.fechaAviso);
    const dias = enMapa(valores["hn.preaviso-dias"], tramoPreaviso(t));
    const parte = enMapa(valores["hn.preaviso-omitido"], entrada.quien);
    const salarioPreaviso = redondear(salarioDiario(entrada.salario) * dias);
    const observaciones: string[] = [];
    if (entrada.quien === "patrono") {
      observaciones.push("Si el patrono no da el preaviso, tiene que pagarle el salario de esos días.");
      observaciones.push("Mientras corre el preaviso, usted tiene derecho a un día pagado por semana para buscar otro trabajo.");
    } else {
      observaciones.push("Si usted renuncia sin dar el preaviso, el patrono puede reclamarle la mitad del salario de esos días.");
    }
    observaciones.push("El preaviso se da por escrito y empieza a correr el día siguiente a la notificación.");
    return {
      tiempo: textoTiempo(t),
      dias,
      fechaFin: sumarDias(entrada.fechaAviso, dias),
      salarioPreaviso,
      montoOmitido: redondear(porcentaje(salarioPreaviso, parte)),
      observaciones,
    };
  },
  resultado: [
    { clave: "tiempo", etiqueta: "Tiempo trabajado", formato: "texto" },
    { clave: "dias", etiqueta: "Días de preaviso", formato: "dias" },
    { clave: "fechaFin", etiqueta: "El preaviso termina el", formato: "fecha" },
    { clave: "salarioPreaviso", etiqueta: "Salario de los días de preaviso", formato: "moneda" },
    { clave: "montoOmitido", etiqueta: "Lo que se paga si no se da el preaviso", formato: "moneda", destacada: true },
  ],
});
