import { definirCasos } from "@/motor/calculo";
import edadDeJubilacion from "./edad-de-jubilacion";

export default definirCasos(edadDeJubilacion, [
  {
    nombre: "Nacido en 1980 con 30 años de servicio",
    origen: { tipo: "oficial", url: "https://www.impo.com.uy/bases/leyes/20130-2023/35", detalle: "Ley 20.130, art. 35 A: desde 1977, 65 años. 1980 + 65 = 2045." },
    fecha: "2026-10-12",
    entrada: { nacimiento: 1980, anios: 30, bps: true },
    esperado: { edad: 65, anio: "2045", regimen: "Sistema Previsional Común (Ley 20.130)" },
  },
  {
    nombre: "Nacido en 1974: transición",
    origen: { tipo: "oficial", url: "https://www.impo.com.uy/bases/leyes/20130-2023/35", detalle: "Tabla del art. 35 A: 1974, 62 años." },
    fecha: "2026-10-12",
    entrada: { nacimiento: 1974, anios: 32, bps: true },
    esperado: { edad: 62, anio: "2036" },
  },
  {
    nombre: "Nacido en 1970: régimen anterior",
    origen: { tipo: "oficial", url: "https://www.impo.com.uy/bases/leyes/16713-1995/18", detalle: "Ley 16.713, art. 18: 60 años y 30 de servicio. 1970 + 60 = 2030." },
    fecha: "2026-10-12",
    entrada: { nacimiento: 1970, anios: 35, bps: true },
    esperado: { edad: 60, anio: "2030", regimen: "Régimen anterior (Ley 16.713)" },
  },
  {
    nombre: "20 años de servicio en otra caja",
    origen: { tipo: "recalculado", detalle: "Sin la tabla del BPS (literal D), vale el literal C: 69 años con 18 de servicio." },
    fecha: "2026-10-12",
    entrada: { nacimiento: 1980, anios: 20, bps: false },
    esperado: { edad: 69 },
  },
  {
    nombre: "20 años de servicio en el BPS",
    origen: { tipo: "recalculado", detalle: "Con la tabla del literal D: 68 años (19 de servicio mínimo)." },
    fecha: "2026-10-12",
    entrada: { nacimiento: 1980, anios: 20, bps: true },
    esperado: { edad: 68, anio: "2048" },
  },
  {
    nombre: "Menos de 15 años de servicio",
    origen: { tipo: "recalculado", detalle: "Ninguna tabla llega con 10 años: sin causal común." },
    fecha: "2026-10-12",
    entrada: { nacimiento: 1980, anios: 10, bps: true },
    esperado: { edad: null, anio: null },
  },
]);
