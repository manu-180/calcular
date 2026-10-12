import { aplicarEscala, definirCalculadora } from "@/motor/calculo";
import { filaDe } from "../lib/fechas";

export default definirCalculadora({
  id: "ni.cuota-fija",
  mercado: "ni",
  concepto: "regimen-simplificado",
  slug: "cuota-fija",
  estado: "publicado",
  requiere: {
    "ni.cuota-fija-minima": "escala",
    "ni.cuota-fija-maxima": "escala",
    "ni.cuota-fija-tope": "numero",
    "ni.cuota-fija-inventario": "numero",
  },
  campos: [
    { id: "ingresos", tipo: "moneda", etiqueta: "Ventas de un mes promedio", min: 0 },
    { id: "inventario", tipo: "moneda", etiqueta: "Costo de tu inventario de mercadería", min: 0, requerido: false },
  ],
  calcular(entrada, valores) {
    const tope = valores["ni.cuota-fija-tope"];
    const topeInventario = valores["ni.cuota-fija-inventario"];
    if (entrada.ingresos > tope || (entrada.inventario ?? 0) > topeInventario) {
      return {
        estrato: null,
        minima: null,
        maxima: null,
        califica: "No",
        observaciones: ["Con esas ventas o ese inventario no podés estar en cuota fija: te corresponde el régimen general del IR y el IVA."],
      };
    }
    const { numero } = filaDe(valores["ni.cuota-fija-minima"], entrada.ingresos);
    const minima = aplicarEscala(valores["ni.cuota-fija-minima"], entrada.ingresos);
    const maxima = aplicarEscala(valores["ni.cuota-fija-maxima"], entrada.ingresos);
    const observaciones =
      maxima === 0
        ? ["En el primer estrato estás exento de pagar la cuota, pero igual tenés que inscribirte y cumplir las demás obligaciones."]
        : ["La ley fija un rango por estrato. El monto exacto te lo asigna la DGI al inscribirte."];
    observaciones.push("La cuota fija reemplaza el IR de actividades económicas y el IVA. Las alcaldías cobran sus propios impuestos aparte.");
    return { estrato: numero, minima, maxima, califica: "Sí", observaciones };
  },
  resultado: [
    { clave: "califica", etiqueta: "Podés estar en cuota fija", formato: "texto" },
    { clave: "estrato", etiqueta: "Estrato", formato: "numero" },
    { clave: "minima", etiqueta: "Cuota mínima del estrato", formato: "moneda" },
    { clave: "maxima", etiqueta: "Cuota máxima del estrato", formato: "moneda", destacada: true },
  ],
});
