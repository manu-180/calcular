import { GRAMATICA } from "../../i18n/gramatica";
import { nombreDePais } from "../../ui/paises";
import type { Idioma } from "../../tipos";
import { conArticulo, PRODUCTOS } from "../productos";
import type { ConversionHora, IndiceHoras } from "../tipos";

// Lo que viaja al navegador: por país, el salario por hora y, por producto, horas y precio. Los nombres
// ya van en el idioma de la página (Intl.DisplayNames en el servidor) y la frase de lugar ya armada
// («En México», «Au Mexique»), así el cliente no carga gramáticas. Unos pocos KB para todo el índice.

export interface CeldaCliente {
  horas: number;
  monto: number;
  moneda: string;
}

export interface PaisHorasCliente {
  iso: string;
  // Edición del país (la del traspaso de «Tu sueldo en el mundo»).
  mercado: string;
  nombre: string;
  // El país como lugar, con mayúscula inicial: «En México», «In der Schweiz», «メキシコで».
  en: string;
  moneda: string;
  porHora: number;
  // Para pasar un sueldo mensual a hora con la misma regla que el mínimo: sueldo ÷ horasMes. Y cuántos
  // sueldos se cobran al año, para llevar el bruto anual del traspaso a uno mensual.
  horasMes: number;
  pagas: number;
  celdas: Readonly<Record<string, CeldaCliente>>;
}

export interface ProductoCliente {
  id: string;
  nombre: string;
  conArticulo: string;
  periodo: "unico" | "mes";
}

export interface DatosHorasCliente {
  productos: readonly ProductoCliente[];
  paises: readonly PaisHorasCliente[];
}

const mayuscula = (s: string) => (s ? s[0].toLocaleUpperCase() + s.slice(1) : s);

export function nombreEnPagina(iso: string, idioma: Idioma, locale: string): string {
  return nombreDePais({ codigo: iso.toLowerCase(), pais: iso, nombre: iso, idioma }, locale);
}

export function lugarEnPagina(nombre: string, idioma: Idioma): string {
  return mayuscula(GRAMATICA[idioma].en(nombre));
}

const SEMANA_COMPLETA = 40;

// La misma conversión de porHoraDe (calculo.ts), dada vuelta: cuántas horas paga un sueldo mensual. Donde
// la ley fija el mínimo por hora, sin jornada leída, se toma la semana de 40 horas.
function horasMesDe(c: ConversionHora): { horasMes: number; pagas: number } {
  if (c.tipo === "divisor" && c.divisor) return { horasMes: c.divisor, pagas: 12 };
  const pagas = c.tipo === "mes" ? (c.pagas ?? 12) : 12;
  const semana = c.horasSemana ?? (c.horasDia ? c.horasDia * 5 : SEMANA_COMPLETA);
  return { horasMes: Math.round(((52 * semana) / pagas) * 100) / 100, pagas };
}

// publicados: los productos con página (publicacionDe); el selector no ofrece uno cuya URL da 404.
export function datosCliente(indice: IndiceHoras, idioma: Idioma, locale: string, publicados?: readonly string[]): DatosHorasCliente {
  const paises = indice.filas.map((f): PaisHorasCliente => {
    const nombre = nombreEnPagina(f.iso, idioma, locale);
    const celdas: Record<string, CeldaCliente> = {};
    for (const [id, c] of Object.entries(f.celdas)) celdas[id] = { horas: Math.round(c.horas * 100) / 100, monto: c.precio.monto, moneda: c.precio.moneda };
    return { iso: f.iso, mercado: f.mercado, nombre, en: lugarEnPagina(nombre, idioma), moneda: f.minimo.moneda, porHora: Math.round(f.minimo.porHora * 100) / 100, ...horasMesDe(f.minimo.conversion), celdas };
  });
  paises.sort((a, b) => a.nombre.localeCompare(b.nombre, locale));
  const productos = PRODUCTOS.filter((p) => (publicados ? publicados.includes(p.id) : paises.some((x) => x.celdas[p.id]))).map((p) => ({ id: p.id, nombre: p.nombre, conArticulo: conArticulo(p, idioma, locale), periodo: p.periodo }));
  return { productos, paises };
}
