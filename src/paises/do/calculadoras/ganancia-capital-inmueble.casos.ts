import { definirCasos } from "@/motor/calculo";
import gananciaCapitalInmueble from "./ganancia-capital-inmueble";

export default definirCasos(gananciaCapitalInmueble, [
  {
    nombre: "Venta por RD$8,000,000 con costo ajustado de RD$5,000,000",
    origen: { tipo: "recalculado", detalle: "Ley 30-26, art. 14 (art. 296-1): ganancia 3,000,000 × 10 % = 300,000." },
    fecha: "2026-10-12",
    entrada: { precio: 8000000, costo: 5000000, reinversion: 0, mayor65: false },
    esperado: { ganancia: 3000000, exenta: 0, gravada: 3000000, impuesto: 300000 },
  },
  {
    nombre: "Reinversión de la mitad en nueva vivienda habitual",
    origen: { tipo: "recalculado", detalle: "Párrafo III: exención proporcional. Reinvierte 4,000,000 de 8,000,000 = 50 %. Exenta 1,500,000, gravada 1,500,000, impuesto 150,000." },
    fecha: "2026-10-12",
    entrada: { precio: 8000000, costo: 5000000, reinversion: 4000000, mayor65: false },
    esperado: { exenta: 1500000, gravada: 1500000, impuesto: 150000 },
  },
  {
    nombre: "Vendedor de 65 años o más con su vivienda habitual",
    origen: { tipo: "recalculado", detalle: "Art. 299 literal m (Ley 30-26, art. 16): exenta." },
    fecha: "2026-10-12",
    entrada: { precio: 8000000, costo: 5000000, reinversion: 0, mayor65: true },
    esperado: { gravada: 0, impuesto: 0 },
  },
  {
    nombre: "Venta con pérdida",
    origen: { tipo: "recalculado", detalle: "Costo ajustado mayor que el precio: no hay ganancia." },
    fecha: "2026-10-12",
    entrada: { precio: 4000000, costo: 5000000, reinversion: 0, mayor65: false },
    esperado: { ganancia: 0, impuesto: 0 },
  },
  {
    nombre: "Reinversión mayor que el precio",
    origen: { tipo: "recalculado", detalle: "Entrada imposible." },
    fecha: "2026-10-12",
    entrada: { precio: 4000000, costo: 1000000, reinversion: 5000000, mayor65: false },
    esperaError: true,
  },
]);
