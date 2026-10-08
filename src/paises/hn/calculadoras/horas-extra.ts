import { definirCalculadora, enMapa, porcentaje } from "@/motor/calculo";
import { DIAS_MES } from "../reglas";

export default definirCalculadora({
  id: "hn.horas-extra",
  mercado: "hn",
  concepto: "horas-extra",
  slug: "horas-extra",
  estado: "publicado",
  requiere: {
    "hn.recargo-horas-extra": "mapa",
    "hn.jornada-horas": "mapa",
  },
  campos: [
    { id: "salario", tipo: "moneda", etiqueta: "Salario ordinario mensual", min: 0 },
    {
      id: "tipo",
      tipo: "opcion",
      etiqueta: "Cuándo hizo las horas extra",
      opciones: [
        { valor: "diurna", etiqueta: "De día (entre las 5:00 a. m. y las 7:00 p. m.)" },
        { valor: "nocturna", etiqueta: "De noche, después de una jornada de día" },
        { valor: "prolongacion-nocturna", etiqueta: "Alargando una jornada nocturna" },
      ],
      porDefecto: "diurna",
    },
    { id: "horas", tipo: "numero", etiqueta: "Cantidad de horas extra", min: 0, porDefecto: 1 },
  ],
  calcular(entrada, valores, { redondear }) {
    const jornada = entrada.tipo === "prolongacion-nocturna" ? "nocturna" : "diurna";
    const diario = entrada.salario / DIAS_MES;
    const horaOrdinaria = diario / enMapa(valores["hn.jornada-horas"], jornada);
    const recargo = enMapa(valores["hn.recargo-horas-extra"], entrada.tipo);
    const horaExtra = redondear(horaOrdinaria + porcentaje(horaOrdinaria, recargo));
    const observaciones = ["La jornada extra sumada a la ordinaria no puede pasar de 12 horas por día."];
    if (jornada === "nocturna") observaciones.push("La jornada nocturna es de 6 horas y se paga igual que una diurna de 8, por eso la hora nocturna vale más.");
    return {
      horaOrdinaria: redondear(horaOrdinaria),
      recargo,
      horaExtra,
      total: redondear(horaExtra * entrada.horas),
      observaciones,
    };
  },
  resultado: [
    { clave: "horaOrdinaria", etiqueta: "Valor de la hora ordinaria", formato: "moneda" },
    { clave: "recargo", etiqueta: "Recargo", formato: "porcentaje" },
    { clave: "horaExtra", etiqueta: "Valor de cada hora extra", formato: "moneda" },
    { clave: "total", etiqueta: "Total por horas extra", formato: "moneda", destacada: true },
  ],
});
