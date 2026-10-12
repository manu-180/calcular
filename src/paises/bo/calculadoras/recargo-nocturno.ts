import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";
import { DIAS_DEL_MES } from "../lib/laboral";

export default definirCalculadora({
  id: "bo.recargo-nocturno",
  mercado: "bo",
  concepto: "propio",
  slug: "recargo-nocturno",
  estado: "publicado",
  requiere: {
    "bo.recargo-nocturno": "mapa",
    "bo.jornada-horas-dia": "numero",
  },
  campos: [
    { id: "haberBasico", tipo: "moneda", etiqueta: "Haber básico mensual", min: 0 },
    { id: "horas", tipo: "numero", etiqueta: "Horas que trabajó entre las 20 y las 6 en el mes", min: 0, max: 250 },
    { id: "tipo", tipo: "opcion-dato", etiqueta: "Dónde trabaja", dato: "bo.recargo-nocturno", porDefecto: "comercio" },
  ],
  calcular(entrada, valores, { redondear }) {
    const hora = entrada.haberBasico / DIAS_DEL_MES / valores["bo.jornada-horas-dia"];
    const tasa = enMapa(valores["bo.recargo-nocturno"], entrada.tipo);
    return {
      hora: redondear(hora),
      tasa,
      recargo: redondear(entrada.horas * porcentaje(hora, tasa)),
      observaciones: [
        "Las horas nocturnas ya están pagadas en su sueldo: el recargo se suma a eso.",
        "La jornada nocturna no puede pasar de 7 horas. Lo que pase de ahí son horas extras y se pagan aparte.",
      ],
    };
  },
  resultado: [
    { clave: "hora", etiqueta: "Valor de la hora normal", formato: "moneda" },
    { clave: "tasa", etiqueta: "Recargo que le corresponde", formato: "porcentaje", decimales: 0 },
    { clave: "recargo", etiqueta: "Recargo nocturno del mes", formato: "moneda", destacada: true },
  ],
});
