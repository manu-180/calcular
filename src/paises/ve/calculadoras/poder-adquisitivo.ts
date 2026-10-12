import { definirCalculadora } from "@/motor/calculo";
import type { PuntoSerieTupla } from "@/motor/tipos";
import { actualizarPorIndice } from "../lib/inflacion";
import series from "../series.json";

// Igual que la calculadora de inflación: hace falta la serie entera para comparar dos meses.
const PUNTOS = series.series.find((s) => s.id === "ve.inpc")!.puntos as unknown as readonly PuntoSerieTupla[];

// Desde octubre 2021 rige la expresión monetaria del Decreto 4.553: un salario anterior está en otra unidad.
const PRIMER_MES = "2021-10-01";

export default definirCalculadora({
  id: "ve.poder-adquisitivo",
  mercado: "ve",
  concepto: "propio",
  slug: "poder-adquisitivo",
  estado: "publicado",
  requiere: {
    "ve.inpc": "serie",
  },
  campos: [
    { id: "salarioAntes", tipo: "moneda", etiqueta: "Salario de antes (en bolívares)", min: 0, porDefecto: 10000, moneda: "VES" },
    { id: "mesAntes", tipo: "fecha", etiqueta: "Mes de ese salario", min: PRIMER_MES, porDefecto: "2025-09-01" },
    { id: "salarioAhora", tipo: "moneda", etiqueta: "Salario de ahora (en bolívares)", min: 0, porDefecto: 40000, moneda: "VES" },
    { id: "mesAhora", tipo: "fecha", etiqueta: "Mes del salario de ahora", min: PRIMER_MES, porDefecto: "hoy" },
  ],
  calcular(entrada, valores, { redondear }) {
    const r = actualizarPorIndice(PUNTOS, valores["ve.inpc"], entrada.salarioAntes, entrada.mesAntes, entrada.mesAhora, redondear, {
      antesDelInicio: () => "Elige un mes desde octubre de 2021, cuando empezó el bolívar digital. Los montos anteriores están en otra unidad monetaria.",
      destinoSinDato: (ultimoMes) => `El BCV todavía no publicó el INPC del mes que elegiste. Se usó el último disponible, ${ultimoMes}.`,
      haciaAtras: "El mes de ahora es anterior al de antes: el resultado compara hacia atrás en el tiempo.",
    }, PRIMER_MES);
    const equivalente = r.montoActualizado;
    const variacionReal = equivalente > 0 ? redondear((entrada.salarioAhora / equivalente - 1) * 100) : null;
    const diferencia = redondear(entrada.salarioAhora - equivalente);
    const observaciones = [...r.observaciones];
    if (variacionReal !== null) {
      observaciones.push(
        variacionReal < 0
          ? "Tu salario subió menos que los precios: con lo que cobras ahora compras menos que antes."
          : "Tu salario subió más que los precios: con lo que cobras ahora compras más que antes.",
      );
    }
    return {
      mesOrigen: r.mesOrigen,
      mesDestino: r.mesDestino,
      inflacion: r.variacionAcumulada,
      equivalente,
      variacionReal,
      diferencia,
      observaciones,
    };
  },
  resultado: [
    { clave: "mesOrigen", etiqueta: "Mes de antes", formato: "texto" },
    { clave: "mesDestino", etiqueta: "Mes de ahora", formato: "texto" },
    { clave: "inflacion", etiqueta: "Inflación entre los dos meses", formato: "porcentaje" },
    { clave: "equivalente", etiqueta: "Salario que necesitas hoy para comprar lo mismo", formato: "moneda", moneda: "VES" },
    { clave: "variacionReal", etiqueta: "Cambio real de tu salario", formato: "porcentaje", destacada: true },
    { clave: "diferencia", etiqueta: "Diferencia contra lo que necesitas", formato: "moneda", moneda: "VES" },
  ],
});
