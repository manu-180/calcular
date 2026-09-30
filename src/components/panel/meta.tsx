import type { ComponentType, SVGProps } from "react";
import type { Kpi, KpiClave, PanelDatos, PasoEmbudo } from "@/lib/panel/tipos";
import { duracion, numero, pesos, plural } from "@/lib/panel/formato";
import type { FormatoNumero } from "./NumeroAnimado";
import { IcoBolsa, IcoCalculadora, IcoMano, IcoPersonas, IcoReloj, IcoTarjeta } from "./iconos";

type MetaKpi = {
  etiqueta: string;
  Icono: ComponentType<SVGProps<SVGSVGElement>>;
  formato: FormatoNumero;
  valor: (n: number) => string;
};

export const META_KPI: Record<KpiClave, MetaKpi> = {
  visitantes: {
    etiqueta: "Visitantes",
    Icono: IcoPersonas,
    formato: "numero",
    valor: (n) => plural(n, "persona", "personas"),
  },
  usos: {
    etiqueta: "Usaron una calculadora",
    Icono: IcoCalculadora,
    formato: "numero",
    valor: (n) => plural(n, "uso", "usos"),
  },
  tiempo: {
    etiqueta: "Tiempo usándolas",
    Icono: IcoReloj,
    formato: "duracion",
    valor: (n) => `${duracion(n)} típico`,
  },
  interes: {
    etiqueta: "Quisieron comprar",
    Icono: IcoMano,
    formato: "numero",
    valor: (n) => plural(n, "persona", "personas"),
  },
  checkouts: {
    etiqueta: "Fueron a pagar",
    Icono: IcoTarjeta,
    formato: "numero",
    valor: (n) => plural(n, "persona", "personas"),
  },
  ventas: {
    etiqueta: "Compraron",
    Icono: IcoBolsa,
    formato: "numero",
    valor: (n) => plural(n, "venta", "ventas"),
  },
  ingresos: {
    etiqueta: "Plata que entró",
    Icono: IcoBolsa,
    formato: "pesos",
    valor: (n) => pesos(n),
  },
};

export const TARJETAS: KpiClave[] = ["visitantes", "usos", "tiempo", "interes", "checkouts", "ventas"];

export function kpiDe(datos: PanelDatos, clave: KpiClave): Kpi {
  return datos.kpis.find((k) => k.clave === clave) ?? { clave, valor: 0, anterior: 0, serie: [] };
}

export function ultimoEsParcial(datos: PanelDatos): boolean {
  const serie = datos.kpis[0]?.serie ?? [];
  const ultimo = serie[serie.length - 1];
  if (!ultimo) return false;
  const largo = datos.granularidad === "hora" ? 3600_000 : 86_400_000;
  return Date.parse(ultimo.t) + largo > Date.parse(datos.hasta) + 60_000;
}

export function tituloDePagina(datos: PanelDatos, path: string): string {
  return datos.paginas.find((p) => p.path === path)?.titulo ?? path;
}

export function tituloDeProducto(datos: PanelDatos, producto: string): string {
  return datos.embudos.find((e) => e.producto === producto)?.titulo ?? producto;
}

export const NOMBRE_PASO: Record<PasoEmbudo["paso"], string> = {
  vio_oferta: "Vieron la oferta",
  abrio_compra: "Abrieron la compra",
  fue_a_pagar: "Fueron a pagar",
  pago: "Pagaron",
};

export function pasosEmbudo(pasos: PasoEmbudo[]) {
  const n = (p: PasoEmbudo["paso"]) => pasos.find((x) => x.paso === p)?.n ?? 0;
  return { vio: n("vio_oferta"), abrio: n("abrio_compra"), fue: n("fue_a_pagar"), pago: n("pago") };
}

export function fraseEmbudo(p: { vio: number; abrio: number; fue: number; pago: number }): string {
  const c = (n: number, uno: string, varios: string) => (n === 1 ? `1 ${uno}` : `${numero(n)} ${varios}`);
  if (p.vio === 0 && p.abrio === 0) return "Nadie vio esta oferta en este período.";
  const inicio =
    p.vio === 1 ? "De 1 persona que vio la oferta, " : p.vio > 0 ? `De ${numero(p.vio)} que vieron la oferta, ` : "";
  if (p.abrio === 0) return `${c(p.vio, "persona vio", "personas vieron")} la oferta y nadie abrió la compra.`;
  const abrio = c(p.abrio, "abrió la compra", "abrieron la compra");
  if (p.fue === 0) return `${inicio}${abrio} y nadie fue a pagar.`;
  const fue = c(p.fue, "fue a pagar", "fueron a pagar");
  if (p.pago === 0) return `${inicio}${abrio}, ${fue} y nadie pagó.`;
  return `${inicio}${abrio}, ${fue} y ${c(p.pago, "pagó", "pagaron")}.`;
}
