import type { RegionMundo } from "../../i18n/mundo";
import { BRUTOS_GRILLA } from "../calculo";
import type { GrillaMundo, PaisMundo } from "../tipos";
import { nombreDePais } from "../../ui/paises";
import { regionDe } from "./regiones";

// Lo que viaja al navegador: un país por fila con los netos redondeados y sin repetir los brutos comunes
// (BRUTOS_GRILLA). Los puntos propios que la grilla agregó en un escalón de la ley van aparte como
// [bruto, neto]. El nombre ya va en el idioma de la página (Intl.DisplayNames en el servidor), así el
// cliente no arma nombres. check_mundo informa cuánto pesa.
export interface PaisCliente {
  mercado: string;
  iso: string;
  moneda: string;
  ppa: number;
  pagas: number;
  nombre: string;
  href: string;
  region: RegionMundo | null;
  verificadoEl: string;
  // Un neto por cada bruto de BRUTOS_GRILLA (o de `brutos`, si el país no los tiene todos).
  netos: readonly number[];
  extra?: readonly (readonly [number, number])[];
  brutos?: readonly number[];
}

export interface GrillaCliente {
  brutos: readonly number[];
  paises: readonly PaisCliente[];
}

export function compactar(grilla: GrillaMundo, locale: string, origenAR: string): GrillaCliente {
  const comunes = new Set(BRUTOS_GRILLA);
  const paises = grilla.paises
    .filter((p) => p.puntos.length > 1 && p.ppa > 0)
    .map((p): PaisCliente => {
      const propios = new Set(p.puntos.map((x) => x.bruto));
      const conComunes = BRUTOS_GRILLA.every((b) => propios.has(b));
      const base = {
        mercado: p.mercado,
        iso: p.iso,
        moneda: p.moneda,
        ppa: p.ppa,
        pagas: p.pagas,
        nombre: nombreDePais({ codigo: p.mercado, pais: p.iso, nombre: p.iso, idioma: "en" }, locale),
        href: p.sitio === "ar" ? `${origenAR}${p.ruta}` : p.ruta,
        region: regionDe(p.iso),
        verificadoEl: p.datosVerificadosEl,
      };
      if (!conComunes) return { ...base, netos: p.puntos.map((x) => Math.round(x.neto)), brutos: p.puntos.map((x) => x.bruto) };
      const extra = p.puntos.filter((x) => !comunes.has(x.bruto)).map((x) => [Math.round(x.bruto), Math.round(x.neto)] as const);
      return {
        ...base,
        netos: BRUTOS_GRILLA.map((b) => Math.round(p.puntos.find((x) => x.bruto === b)!.neto)),
        ...(extra.length ? { extra } : {}),
      };
    });
  return { brutos: [...BRUTOS_GRILLA], paises };
}

// De vuelta a la forma del contrato, para usar compararDesde y cargaDesde tal cual.
export function expandir(c: GrillaCliente): GrillaMundo {
  const paises: PaisMundo[] = c.paises.map((p) => {
    const brutos = p.brutos ?? c.brutos;
    const puntos = [...p.netos.map((neto, i) => ({ bruto: brutos[i], neto })), ...(p.extra ?? []).map(([bruto, neto]) => ({ bruto, neto }))].sort((a, b) => a.bruto - b.bruto);
    return {
      mercado: p.mercado,
      iso: p.iso,
      moneda: p.moneda,
      ppa: p.ppa,
      anioPpa: 0,
      pagas: p.pagas,
      calculadora: "",
      ruta: p.href,
      sitio: "intl",
      puntos,
      datosVerificadosEl: p.verificadoEl,
    };
  });
  return { version: 1, generadoEl: "", fuentePpa: { organismo: "", indicador: "", url: "", consultadoEl: "", anio: 0 }, paises };
}
