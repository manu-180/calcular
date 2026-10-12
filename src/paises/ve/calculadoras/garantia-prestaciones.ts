import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_MONEDA, diasDeVacaciones, enMoneda, salarioIntegralDiario } from "../reglas";

export default definirCalculadora({
  id: "ve.garantia-prestaciones",
  mercado: "ve",
  concepto: "propio",
  slug: "garantia-de-prestaciones",
  estado: "publicado",
  requiere: {
    "ve.dias-mes-salario": "numero",
    "ve.prestaciones-garantia-dias": "numero",
    "ve.prestaciones-dias-adicionales": "numero",
    "ve.prestaciones-dias-adicionales-tope": "numero",
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
      etiqueta: "Salario del último mes del trimestre",
      ayuda: "Solo la parte salarial. El cestaticket y el bono de guerra económica no cuentan.",
      min: 0,
    },
    {
      id: "diasUtilidades",
      tipo: "entero",
      etiqueta: "Días de utilidades que paga la empresa al año",
      ayuda: "Si no lo sabes, deja el mínimo de ley.",
      min: 30,
      max: 120,
      porDefecto: 30,
    },
    {
      id: "anios",
      tipo: "entero",
      etiqueta: "Años de servicio cumplidos",
      min: 0,
      max: 60,
      porDefecto: 0,
    },
  ],
  calcular(entrada, valores, { redondear }) {
    const minU = valores["ve.utilidades-dias-minimo"];
    const maxU = valores["ve.utilidades-dias-maximo"];
    if (entrada.diasUtilidades < minU || entrada.diasUtilidades > maxU) {
      throw new ErrorEntrada(`Las utilidades van de ${minU} a ${maxU} días por año.`, "diasUtilidades");
    }
    const diasMes = valores["ve.dias-mes-salario"];
    const { bono } = diasDeVacaciones(entrada.anios + 1, {
      base: valores["ve.vacaciones-dias-base"],
      topeAdicionales: valores["ve.vacaciones-dias-adicionales-tope"],
      bonoBase: valores["ve.bono-vacacional-dias-base"],
      bonoTope: valores["ve.bono-vacacional-dias-tope"],
    });
    const integral = redondear(salarioIntegralDiario(entrada.salario / diasMes, entrada.diasUtilidades, bono, diasMes));
    const diasTrimestre = valores["ve.prestaciones-garantia-dias"];
    // Art. 142 b: desde el segundo año, 2 días por año de servicio, acumulativos, hasta 30.
    const adicionales = entrada.anios >= 2 ? Math.min(valores["ve.prestaciones-dias-adicionales"] * (entrada.anios - 1), valores["ve.prestaciones-dias-adicionales-tope"]) : 0;
    const m = entrada.moneda;
    const [i, t, a, an] = [integral, redondear(diasTrimestre * integral), redondear(adicionales * integral), redondear(diasTrimestre * 4 * integral + adicionales * integral)].map((x) =>
      enMoneda(x, m),
    );
    const observaciones = ["La garantía se deposita cada trimestre en tu fideicomiso, en un fondo o en la contabilidad de la empresa, y genera intereses."];
    if (adicionales > 0) {
      observaciones.push("Los días adicionales se pagan una vez al año, con el salario integral promedio del año. Aquí los estimamos con el salario que escribiste.");
    }
    return {
      integralBs: i.bs,
      integralUsd: i.usd,
      diasTrimestre,
      trimestreBs: t.bs,
      trimestreUsd: t.usd,
      diasAdicionales: adicionales,
      adicionalesBs: a.bs,
      adicionalesUsd: a.usd,
      anualBs: an.bs,
      anualUsd: an.usd,
      observaciones,
    };
  },
  resultado: [
    { clave: "integralBs", etiqueta: "Salario integral diario", formato: "moneda", moneda: "VES" },
    { clave: "integralUsd", etiqueta: "Salario integral diario", formato: "moneda", moneda: "USD" },
    { clave: "diasTrimestre", etiqueta: "Días de garantía por trimestre", formato: "dias" },
    { clave: "trimestreBs", etiqueta: "Depósito del trimestre", formato: "moneda", moneda: "VES", destacada: true },
    { clave: "trimestreUsd", etiqueta: "Depósito del trimestre", formato: "moneda", moneda: "USD", destacada: true },
    { clave: "diasAdicionales", etiqueta: "Días adicionales de este aniversario", formato: "dias", ocultarSiCero: true },
    { clave: "adicionalesBs", etiqueta: "Depósito por días adicionales", formato: "moneda", moneda: "VES", ocultarSiCero: true },
    { clave: "adicionalesUsd", etiqueta: "Depósito por días adicionales", formato: "moneda", moneda: "USD", ocultarSiCero: true },
    { clave: "anualBs", etiqueta: "Garantía de un año con este salario", formato: "moneda", moneda: "VES" },
    { clave: "anualUsd", etiqueta: "Garantía de un año con este salario", formato: "moneda", moneda: "USD" },
  ],
});
