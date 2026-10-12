import { definirCalculadora } from "@/motor/calculo";
import { diasDePrestaciones, diasDeVacaciones, textoTiempo, tiempoTrabajado, validarFechas } from "../reglas";

export default definirCalculadora({
  id: "ve.antiguedad-laboral",
  mercado: "ve",
  concepto: "propio",
  slug: "antiguedad-laboral",
  estado: "publicado",
  requiere: {
    "ve.prestaciones-garantia-dias": "numero",
    "ve.prestaciones-dias-adicionales": "numero",
    "ve.prestaciones-dias-adicionales-tope": "numero",
    "ve.prestaciones-retroactivo-dias": "numero",
    "ve.prestaciones-dias-por-mes-menos-3-meses": "numero",
    "ve.vacaciones-dias-base": "numero",
    "ve.vacaciones-dias-adicionales-tope": "numero",
    "ve.bono-vacacional-dias-base": "numero",
    "ve.bono-vacacional-dias-tope": "numero",
  },
  campos: [
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "fechaSalida", tipo: "fecha", etiqueta: "Calcular hasta el día", porDefecto: "hoy" },
  ],
  calcular(entrada, valores) {
    validarFechas(entrada.fechaIngreso, entrada.fechaSalida);
    const t = tiempoTrabajado(entrada.fechaIngreso, entrada.fechaSalida);
    const proximo = diasDeVacaciones(t.anios + 1, {
      base: valores["ve.vacaciones-dias-base"],
      topeAdicionales: valores["ve.vacaciones-dias-adicionales-tope"],
      bonoBase: valores["ve.bono-vacacional-dias-base"],
      bonoTope: valores["ve.bono-vacacional-dias-tope"],
    });
    const p = diasDePrestaciones(t, {
      garantiaDias: valores["ve.prestaciones-garantia-dias"],
      adicionalesDias: valores["ve.prestaciones-dias-adicionales"],
      adicionalesTope: valores["ve.prestaciones-dias-adicionales-tope"],
      retroactivoDias: valores["ve.prestaciones-retroactivo-dias"],
      diasPorMesCorto: valores["ve.prestaciones-dias-por-mes-menos-3-meses"],
    });
    return {
      tiempo: textoTiempo(t),
      anios: t.anios,
      mesesTotales: t.anios * 12 + t.meses,
      diasVacaciones: proximo.vacaciones,
      diasBono: proximo.bono,
      diasGarantia: p.corta ? null : p.diasGarantia,
      diasRetroactivo: p.diasRetroactivo,
      observaciones: [
        "Las vacaciones y el bono vacacional son los que corresponden a tu próximo aniversario.",
        "Los días de prestaciones son los acumulados a la fecha elegida. Para pasarlos a dinero usa la calculadora de prestaciones sociales.",
      ],
    };
  },
  resultado: [
    { clave: "tiempo", etiqueta: "Antigüedad", formato: "texto" },
    { clave: "anios", etiqueta: "Años completos", formato: "anios" },
    { clave: "mesesTotales", etiqueta: "Meses completos en total", formato: "meses" },
    { clave: "diasVacaciones", etiqueta: "Días hábiles de vacaciones en tu próximo aniversario", formato: "dias", destacada: true },
    { clave: "diasBono", etiqueta: "Días de bono vacacional en tu próximo aniversario", formato: "dias" },
    { clave: "diasGarantia", etiqueta: "Días de garantía de prestaciones acumulados", formato: "dias" },
    { clave: "diasRetroactivo", etiqueta: "Días de prestaciones por el cálculo retroactivo", formato: "dias" },
  ],
});
