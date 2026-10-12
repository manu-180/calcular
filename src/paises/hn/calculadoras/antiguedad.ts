import { definirCalculadora, enMapa } from "@/motor/calculo";
import { diasEntre } from "@/motor/vigencia";
import { cesantia, diasVacacionesPorAnio, sumarMeses, textoTiempo, tiempoTrabajado, tramoPreaviso, ultimoAniversario, validarFechas } from "../reglas";

export default definirCalculadora({
  id: "hn.antiguedad",
  mercado: "hn",
  concepto: "propio",
  slug: "antiguedad",
  estado: "publicado",
  requiere: {
    "hn.vacaciones-dias": "mapa",
    "hn.preaviso-dias": "mapa",
    "hn.cesantia-dias-menos-de-un-anio": "mapa",
    "hn.cesantia-tope-meses": "mapa",
  },
  campos: [
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "fechaCorte", tipo: "fecha", etiqueta: "Calcular hasta", porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    validarFechas(entrada.fechaIngreso, entrada.fechaCorte, "fechaCorte");
    const t = tiempoTrabajado(entrada.fechaIngreso, entrada.fechaCorte);
    const tabla = valores["hn.vacaciones-dias"];
    const aniversario = ultimoAniversario(entrada.fechaIngreso, entrada.fechaCorte);
    const proximo = sumarMeses(entrada.fechaIngreso, (aniversario.anios + 1) * 12);
    const c = cesantia(t, valores["hn.cesantia-dias-menos-de-un-anio"], enMapa(valores["hn.cesantia-tope-meses"], "general"));
    return {
      tiempo: textoTiempo(t),
      diasCorridos: diasEntre(entrada.fechaIngreso, entrada.fechaCorte) + 1,
      vacaciones: diasVacacionesPorAnio(tabla, aniversario.anios),
      proximoAniversario: proximo,
      vacacionesProximo: diasVacacionesPorAnio(tabla, aniversario.anios + 1),
      preaviso: enMapa(valores["hn.preaviso-dias"], tramoPreaviso(t)),
      mesesCesantia: redondear(c.meses),
      observaciones: ["La continuidad no se corta por vacaciones, enfermedad justificada, licencias ni la renovación del contrato."],
    };
  },
  resultado: [
    { clave: "tiempo", etiqueta: "Antigüedad", formato: "texto" },
    { clave: "diasCorridos", etiqueta: "Días corridos desde el ingreso", formato: "dias" },
    { clave: "vacaciones", etiqueta: "Vacaciones por el último año cumplido", formato: "dias" },
    { clave: "proximoAniversario", etiqueta: "Próximo aniversario", formato: "fecha" },
    { clave: "vacacionesProximo", etiqueta: "Vacaciones al cumplirlo", formato: "dias" },
    { clave: "preaviso", etiqueta: "Preaviso que corresponde hoy", formato: "dias" },
    { clave: "mesesCesantia", etiqueta: "Meses de salario de cesantía si lo despiden sin causa", formato: "numero", decimales: 2, destacada: true },
  ],
});
