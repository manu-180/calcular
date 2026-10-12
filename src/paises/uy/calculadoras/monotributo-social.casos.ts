import { definirCasos } from "@/motor/calculo";
import monotributoSocial from "./monotributo-social";

const URL = "https://www.bps.gub.uy/6667/monotributo-social-mides-ley-18874.html" as const;

export default definirCasos(monotributoSocial, [
  {
    nombre: "Primer año sin Fonasa",
    origen: { tipo: "oficial", url: URL, detalle: "Tabla del BPS, enero 2026: 25 %, aportes jubilatorios y FRL 522, total 659." },
    fecha: "2026-10-12",
    entrada: { etapa: "1", salud: "sin-snis" },
    esperado: { porcentaje: 25, jubilatorio: 522, salud: 137, total: 659 },
  },
  {
    nombre: "Primer año con Fonasa y con hijos",
    origen: { tipo: "oficial", url: URL, detalle: "Tabla del BPS: con opción al SNIS, sin cónyuge y con hijos, 5.430 (522 + 4.908)." },
    fecha: "2026-10-12",
    entrada: { etapa: "1", salud: "snis-hijos" },
    esperado: { total: 5430 },
  },
  {
    nombre: "Tercer año con Fonasa, cónyuge e hijos",
    origen: { tipo: "oficial", url: URL, detalle: "Tabla del BPS: 75 %, con cónyuge y con hijos, 7.367 (1.567 + 5.800)." },
    fecha: "2026-10-12",
    entrada: { etapa: "3", salud: "snis-conyuge-hijos" },
    esperado: { jubilatorio: 1567, total: 7367 },
  },
  {
    nombre: "Desde el mes 37 sin Fonasa",
    origen: { tipo: "oficial", url: URL, detalle: "Tabla del BPS: 100 %, total 2.637." },
    fecha: "2026-10-12",
    entrada: { etapa: "4", salud: "sin-snis" },
    esperado: { porcentaje: 100, total: 2637 },
  },
]);
