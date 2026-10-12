import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";
import { CAMPO_MONEDA, diasDeVacaciones, enMoneda } from "../reglas";

export default definirCalculadora({
  id: "ve.salario-integral",
  mercado: "ve",
  concepto: "propio",
  slug: "salario-integral",
  estado: "publicado",
  requiere: {
    "ve.dias-mes-salario": "numero",
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
      etiqueta: "Salario normal mensual",
      ayuda: "Todo lo que cobras como salario. Sin cestaticket ni bonos que no son salario.",
      min: 0,
    },
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
      id: "anios",
      tipo: "entero",
      etiqueta: "Años de servicio cumplidos",
      ayuda: "Sirve para saber cuántos días de bono vacacional te tocan este año.",
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
    // Art. 122: la alícuota es la parte diaria de un pago anual, días del beneficio por salario diario entre 360.
    const diario = entrada.salario / diasMes;
    const aliUtil = (diario * entrada.diasUtilidades) / (diasMes * 12);
    const aliBono = (diario * bono) / (diasMes * 12);
    const integral = diario + aliUtil + aliBono;
    const m = entrada.moneda;
    const [d, u, b, i, im] = [diario, aliUtil, aliBono, integral, integral * diasMes].map((x) => enMoneda(redondear(x), m));
    return {
      diasBono: bono,
      diarioBs: d.bs,
      diarioUsd: d.usd,
      alicuotaUtilidadesBs: u.bs,
      alicuotaUtilidadesUsd: u.usd,
      alicuotaBonoBs: b.bs,
      alicuotaBonoUsd: b.usd,
      integralBs: i.bs,
      integralUsd: i.usd,
      integralMensualBs: im.bs,
      integralMensualUsd: im.usd,
    };
  },
  resultado: [
    { clave: "diasBono", etiqueta: "Días de bono vacacional de este año", formato: "dias" },
    { clave: "diarioBs", etiqueta: "Salario normal diario", formato: "moneda", moneda: "VES" },
    { clave: "diarioUsd", etiqueta: "Salario normal diario", formato: "moneda", moneda: "USD" },
    { clave: "alicuotaUtilidadesBs", etiqueta: "Alícuota diaria de utilidades", formato: "moneda", moneda: "VES" },
    { clave: "alicuotaUtilidadesUsd", etiqueta: "Alícuota diaria de utilidades", formato: "moneda", moneda: "USD" },
    { clave: "alicuotaBonoBs", etiqueta: "Alícuota diaria de bono vacacional", formato: "moneda", moneda: "VES" },
    { clave: "alicuotaBonoUsd", etiqueta: "Alícuota diaria de bono vacacional", formato: "moneda", moneda: "USD" },
    { clave: "integralBs", etiqueta: "Salario integral diario", formato: "moneda", moneda: "VES", destacada: true },
    { clave: "integralUsd", etiqueta: "Salario integral diario", formato: "moneda", moneda: "USD", destacada: true },
    { clave: "integralMensualBs", etiqueta: "Salario integral mensual", formato: "moneda", moneda: "VES" },
    { clave: "integralMensualUsd", etiqueta: "Salario integral mensual", formato: "moneda", moneda: "USD" },
  ],
});
