import { definirCasos } from "@/motor/calculo";
import jubilacion from "./jubilacion";

export default definirCasos(jubilacion, [
  {
    nombre: "Mujer de 57 años con 300 cuotas",
    origen: {
      tipo: "recalculado",
      detalle: "Art. 169-A: 60% más 1.25% por cada 12 cuotas sobre 240. 60 cuotas de más = 5 × 1.25% = 6.25%. Tasa 66.25% × 1,000 = 662.50.",
    },
    fecha: "2026-10-12",
    entrada: { sexo: "mujeres", fechaNacimiento: "1969-05-10", fechaRetiro: "2026-10-12", cuotas: 300, cuotasDespues: 0, salarioBase: 1000 },
    esperado: { edad: 57, fechaEdad: "2026-05-10", tipo: "Pensión normal", tasa: 66.25, pension: 662.5 },
  },
  {
    nombre: "Hombre que se retira un año antes",
    origen: { tipo: "recalculado", detalle: "61 años: anticipa un año. 66.25% × 0.9128 = 60.47%. 1,000 × 60.473% = 604.73." },
    fecha: "2026-10-12",
    entrada: { sexo: "hombres", fechaNacimiento: "1965-03-01", fechaRetiro: "2026-10-12", cuotas: 300, cuotasDespues: 0, salarioBase: 1000 },
    esperado: { edad: 61, tipo: "Pensión anticipada", tasa: 60.47, pension: 604.73 },
  },
  {
    nombre: "Pensión proporcional con 210 cuotas",
    origen: { tipo: "recalculado", detalle: "Menos de 240 cuotas: 60% × 210 ÷ 240 = 52.5%. 800 × 52.5% = 420." },
    fecha: "2026-10-12",
    entrada: { sexo: "hombres", fechaNacimiento: "1960-01-15", fechaRetiro: "2026-10-12", cuotas: 210, cuotasDespues: 0, salarioBase: 800 },
    esperado: { tipo: "Pensión proporcional", tasa: 52.5, pension: 420 },
  },
  {
    nombre: "Cuotas aportadas después de la edad de referencia",
    origen: {
      tipo: "recalculado",
      detalle: "264 cuotas antes: 24 de más = 2 × 1.25% = 2.5%. 36 después = 3 × 2% = 6%. Tasa 68.5% × 1,200 = 822.",
    },
    fecha: "2026-10-12",
    entrada: { sexo: "mujeres", fechaNacimiento: "1965-01-01", fechaRetiro: "2026-10-12", cuotas: 300, cuotasDespues: 36, salarioBase: 1200 },
    esperado: { tasa: 68.5, pension: 822 },
  },
  {
    nombre: "Menos de 180 cuotas",
    origen: { tipo: "recalculado", detalle: "Art. 168: el mínimo es 180 cuotas." },
    fecha: "2026-10-12",
    entrada: { sexo: "mujeres", fechaNacimiento: "1965-01-01", fechaRetiro: "2026-10-12", cuotas: 150, cuotasDespues: 0, salarioBase: 1000 },
    esperaError: true,
  },
  {
    nombre: "Tres años antes de la edad",
    origen: { tipo: "recalculado", detalle: "La banda de edades empieza dos años antes de la edad de referencia." },
    fecha: "2026-10-12",
    entrada: { sexo: "hombres", fechaNacimiento: "1967-06-01", fechaRetiro: "2026-10-12", cuotas: 300, cuotasDespues: 0, salarioBase: 1000 },
    esperaError: true,
  },
]);
