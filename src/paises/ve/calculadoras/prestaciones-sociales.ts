import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_MONEDA, diasDePrestaciones, diasDeVacaciones, enMoneda, salarioIntegralDiario, textoTiempo, tiempoTrabajado, validarFechas } from "../reglas";

export default definirCalculadora({
  id: "ve.prestaciones-sociales",
  mercado: "ve",
  concepto: "fondo-cesantia",
  slug: "prestaciones-sociales",
  estado: "publicado",
  requiere: {
    "ve.dias-mes-salario": "numero",
    "ve.prestaciones-garantia-dias": "numero",
    "ve.prestaciones-dias-adicionales": "numero",
    "ve.prestaciones-dias-adicionales-tope": "numero",
    "ve.prestaciones-retroactivo-dias": "numero",
    "ve.prestaciones-dias-por-mes-menos-3-meses": "numero",
    "ve.utilidades-dias-minimo": "numero",
    "ve.utilidades-dias-maximo": "numero",
    "ve.vacaciones-dias-base": "numero",
    "ve.vacaciones-dias-adicionales-tope": "numero",
    "ve.bono-vacacional-dias-base": "numero",
    "ve.bono-vacacional-dias-tope": "numero",
  },
  campos: [
    CAMPO_MONEDA,
    {
      id: "salario",
      tipo: "numero",
      etiqueta: "Último salario mensual",
      ayuda: "Solo la parte salarial. El cestaticket y el bono de guerra económica no cuentan.",
      min: 0,
    },
    { id: "fechaIngreso", tipo: "fecha", etiqueta: "Fecha de ingreso" },
    { id: "fechaSalida", tipo: "fecha", etiqueta: "Último día de trabajo", porDefecto: "hoy" },
    {
      id: "diasUtilidades",
      tipo: "entero",
      etiqueta: "Días de utilidades que paga tu empresa al año",
      ayuda: "Si no lo sabes, deja el mínimo de ley.",
      min: 30,
      max: 120,
      porDefecto: 30,
    },
    {
      id: "garantia",
      tipo: "numero",
      etiqueta: "Garantía depositada hasta hoy, sin intereses (opcional)",
      ayuda: "Sale de tu fideicomiso o del informe trimestral de la empresa. Si lo dejas vacío, la estimamos con tu último salario.",
      min: 0,
      requerido: false,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    validarFechas(entrada.fechaIngreso, entrada.fechaSalida);
    const minU = valores["ve.utilidades-dias-minimo"];
    const maxU = valores["ve.utilidades-dias-maximo"];
    if (entrada.diasUtilidades < minU || entrada.diasUtilidades > maxU) {
      throw new ErrorEntrada(`Las utilidades van de ${minU} a ${maxU} días por año.`, "diasUtilidades");
    }
    const t = tiempoTrabajado(entrada.fechaIngreso, entrada.fechaSalida);
    const diasMes = valores["ve.dias-mes-salario"];
    const diario = entrada.salario / diasMes;
    const { bono } = diasDeVacaciones(t.anios + 1, {
      base: valores["ve.vacaciones-dias-base"],
      topeAdicionales: valores["ve.vacaciones-dias-adicionales-tope"],
      bonoBase: valores["ve.bono-vacacional-dias-base"],
      bonoTope: valores["ve.bono-vacacional-dias-tope"],
    });
    const integral = redondear(salarioIntegralDiario(diario, entrada.diasUtilidades, bono, diasMes));
    const p = diasDePrestaciones(t, {
      garantiaDias: valores["ve.prestaciones-garantia-dias"],
      adicionalesDias: valores["ve.prestaciones-dias-adicionales"],
      adicionalesTope: valores["ve.prestaciones-dias-adicionales-tope"],
      retroactivoDias: valores["ve.prestaciones-retroactivo-dias"],
      diasPorMesCorto: valores["ve.prestaciones-dias-por-mes-menos-3-meses"],
    });

    const observaciones: string[] = [];
    let garantia: number;
    let retroactivo: number;
    let total: number;
    if (p.corta) {
      garantia = 0;
      retroactivo = redondear(p.diasRetroactivo * integral);
      total = retroactivo;
      observaciones.push("Trabajaste menos de tres meses: te tocan 5 días de salario por cada mes o fracción, sin comparar con la garantía.");
    } else {
      garantia = entrada.garantia ?? redondear(p.diasGarantia * integral);
      retroactivo = redondear(p.diasRetroactivo * integral);
      total = Math.max(garantia, retroactivo);
      if (entrada.garantia === null) {
        observaciones.push("La garantía es una estimación con tu último salario, como si nunca hubiera cambiado. Si tu salario subió, la real es menor: búscala en tu fideicomiso.");
      }
      observaciones.push(total === retroactivo && retroactivo > garantia ? "Cobras el cálculo retroactivo porque es mayor que la garantía." : "Cobras la garantía porque es mayor que el cálculo retroactivo.");
    }
    observaciones.push("No incluye los intereses de la garantía, que también te corresponden.");

    const m = entrada.moneda;
    const g = enMoneda(garantia, m);
    const r = enMoneda(retroactivo, m);
    const tt = enMoneda(total, m);
    const sd = enMoneda(integral, m);
    return {
      tiempo: textoTiempo(t),
      salarioIntegralBs: sd.bs,
      salarioIntegralUsd: sd.usd,
      diasGarantia: p.diasGarantia,
      garantiaBs: p.corta ? null : g.bs,
      garantiaUsd: p.corta ? null : g.usd,
      diasRetroactivo: p.diasRetroactivo,
      retroactivoBs: r.bs,
      retroactivoUsd: r.usd,
      totalBs: tt.bs,
      totalUsd: tt.usd,
      observaciones,
    };
  },
  resultado: [
    { clave: "tiempo", etiqueta: "Tiempo de servicio", formato: "texto" },
    { clave: "salarioIntegralBs", etiqueta: "Salario integral diario", formato: "moneda", moneda: "VES" },
    { clave: "salarioIntegralUsd", etiqueta: "Salario integral diario", formato: "moneda", moneda: "USD" },
    { clave: "diasGarantia", etiqueta: "Días de garantía depositados", formato: "dias", ocultarSiCero: true },
    { clave: "garantiaBs", etiqueta: "Garantía (literales a y b)", formato: "moneda", moneda: "VES" },
    { clave: "garantiaUsd", etiqueta: "Garantía (literales a y b)", formato: "moneda", moneda: "USD" },
    { clave: "diasRetroactivo", etiqueta: "Días del cálculo retroactivo", formato: "dias" },
    { clave: "retroactivoBs", etiqueta: "Cálculo retroactivo (literal c)", formato: "moneda", moneda: "VES" },
    { clave: "retroactivoUsd", etiqueta: "Cálculo retroactivo (literal c)", formato: "moneda", moneda: "USD" },
    { clave: "totalBs", etiqueta: "Prestaciones sociales a cobrar", formato: "moneda", moneda: "VES", destacada: true },
    { clave: "totalUsd", etiqueta: "Prestaciones sociales a cobrar", formato: "moneda", moneda: "USD", destacada: true },
  ],
});
