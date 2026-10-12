import { definirCalculadora, enMapa, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { sumarDias } from "@/motor/vigencia";
import { DIAS_DEL_MES } from "../lib/laboral";

export default definirCalculadora({
  id: "bo.licencia-de-maternidad",
  mercado: "bo",
  concepto: "propio",
  slug: "licencia-de-maternidad",
  estado: "publicado",
  requiere: {
    "bo.maternidad-dias": "mapa",
    "bo.maternidad-goce": "numero",
    "bo.maternidad-cotizaciones-minimas": "numero",
  },
  campos: [
    { id: "parto", tipo: "fecha", etiqueta: "Fecha probable de parto" },
    { id: "sueldo", tipo: "moneda", etiqueta: "Total ganado mensual", min: 0 },
    {
      id: "diferidos",
      tipo: "entero",
      etiqueta: "Días del descanso prenatal que quiere pasar a después del parto",
      ayuda: "Solo con los controles prenatales al día y certificado del médico. Si no, deje 0.",
      min: 0,
      max: 44,
      porDefecto: 0,
    },
    { id: "cotizaciones", tipo: "entero", etiqueta: "Meses con aportes a la caja de salud en el último año", min: 0, max: 12, porDefecto: 12 },
  ],
  calcular(entrada, valores, { redondear }) {
    const dias = valores["bo.maternidad-dias"];
    const prenatalBase = enMapa(dias, "prenatal");
    if (entrada.diferidos >= prenatalBase) throw new ErrorEntrada("Puede pasar una parte del descanso prenatal, no todo.", "diferidos");
    const prenatal = prenatalBase - entrada.diferidos;
    const postnatal = enMapa(dias, "postnatal") + entrada.diferidos;
    const minimo = valores["bo.maternidad-cotizaciones-minimas"];
    const cumple = entrada.cotizaciones >= minimo;
    const subsidio = cumple ? redondear(porcentaje((entrada.sueldo / DIAS_DEL_MES) * (prenatal + postnatal), valores["bo.maternidad-goce"])) : 0;
    const observaciones = ["Las fechas son orientativas: las fija el certificado de incapacidad temporal que extiende el médico de la caja."];
    if (!cumple) observaciones.push(`Para el subsidio de maternidad hacen falta al menos ${minimo} aportes mensuales en los 12 meses anteriores.`);
    observaciones.push("Desde el embarazo hasta que su hijo cumpla un año usted tiene inamovilidad laboral: no la pueden despedir.");
    return {
      inicio: sumarDias(entrada.parto, -prenatal),
      fin: sumarDias(entrada.parto, postnatal),
      prenatal,
      postnatal,
      subsidio,
      observaciones,
    };
  },
  resultado: [
    { clave: "inicio", etiqueta: "Empieza el descanso", formato: "fecha" },
    { clave: "fin", etiqueta: "Termina el descanso", formato: "fecha" },
    { clave: "prenatal", etiqueta: "Días antes del parto", formato: "dias", decimales: 0 },
    { clave: "postnatal", etiqueta: "Días después del parto", formato: "dias", decimales: 0 },
    { clave: "subsidio", etiqueta: "Lo que cobra en todo el descanso", formato: "moneda", destacada: true },
  ],
});
