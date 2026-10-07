import { definirCalculadora, ErrorEntrada, porRegion } from "@/motor/calculo";
import { enMeses, fecha, fechaLarga, maxFecha, partes, periodoQueContiene, sumarMeses, tiempoTrabajado } from "../lib/fechas";

export default definirCalculadora({
  id: "ec.decimo-cuarto-sueldo",
  mercado: "ec",
  concepto: "decimo-cuarto",
  slug: "decimo-cuarto-sueldo",
  estado: "publicado",
  requiere: {
    "ec.sbu": "numero",
    "ec.decimo-cuarto-mes-inicio": "numero-por-region",
  },
  campos: [
    { id: "region", tipo: "region", etiqueta: "Región donde trabajas", porDefecto: "sierra" },
    {
      id: "inicio",
      tipo: "fecha",
      etiqueta: "Fecha en que empezaste a trabajar",
      ayuda: "Si entraste antes de que empezara el período, se toma el período completo.",
    },
    {
      id: "salida",
      tipo: "fecha",
      etiqueta: "Fecha de salida",
      ayuda: "Déjala vacía si sigues trabajando: calculamos el próximo pago.",
      requerido: false,
    },
  ],
  calcular(entrada, valores, { fecha: hoy, redondear }) {
    const sbu = valores["ec.sbu"];
    const mes = porRegion(valores["ec.decimo-cuarto-mes-inicio"], entrada.region);
    const sigue = entrada.salida === null;
    const corte = entrada.salida ?? hoy;
    if (entrada.inicio > corte) {
      throw sigue
        ? new ErrorEntrada("La fecha en que empezaste no puede ser posterior a hoy.", "inicio")
        : new ErrorEntrada("La fecha de salida tiene que ser posterior a la fecha en que empezaste.", "salida");
    }

    let periodo = periodoQueContiene(corte, mes);
    const anioInicio = partes(periodo.inicio)[0];
    let pago = fecha(anioInicio + 1, mes, 15);
    // Entre el día 1 y el 15 del mes de pago todavía se debe el período que acaba de cerrar.
    if (sigue && hoy <= fecha(anioInicio, mes, 15)) {
      const inicioAnterior = sumarMeses(periodo.inicio, -12);
      periodo = periodoQueContiene(inicioAnterior, mes);
      pago = fecha(anioInicio, mes, 15);
    }
    if (entrada.inicio > periodo.fin) throw new ErrorEntrada("Empezaste a trabajar después de este período.", "inicio");

    const hasta = sigue ? periodo.fin : corte;
    const meses = Math.min(12, enMeses(tiempoTrabajado(maxFecha(entrada.inicio, periodo.inicio), hasta)));
    const decimo = redondear((sbu * meses) / 12);

    const observaciones = [
      sigue
        ? "Usamos el salario básico vigente hoy. Si cambia antes de la fecha de pago, se paga con el nuevo."
        : "Al salir te pagan esta parte proporcional junto con la liquidación.",
      "Si lo cobras cada mes en tu rol de pagos, ya lo recibiste. Este cálculo es para quien lo cobra acumulado.",
    ];

    return {
      periodo: `Del ${fechaLarga(periodo.inicio)} al ${fechaLarga(periodo.fin)}`,
      fechaPago: sigue ? `Hasta el ${fechaLarga(pago)}` : "Con tu liquidación",
      meses: redondear(meses),
      mensual: redondear(sbu / 12),
      decimo,
      observaciones,
    };
  },
  resultado: [
    { clave: "periodo", etiqueta: "Período que se paga", formato: "texto" },
    { clave: "fechaPago", etiqueta: "Fecha de pago", formato: "texto" },
    { clave: "meses", etiqueta: "Meses trabajados en el período", formato: "meses", decimales: 2 },
    { clave: "mensual", etiqueta: "Valor mensual (si lo cobras cada mes)", formato: "moneda" },
    { clave: "decimo", etiqueta: "Décimo cuarto a cobrar", formato: "moneda", destacada: true },
  ],
});
