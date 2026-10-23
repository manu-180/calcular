import type { RegionMundo } from "../../i18n/mundo";
import { BRUTOS_GRILLA } from "../calculo";
import type { GrillaMundo, PaisMundo } from "../tipos";
import { nombreDePais } from "../../ui/paises";
import { regionDe } from "./regiones";

// Lo que viaja al navegador: un país por fila con los netos redondeados y sin repetir los brutos (son
// los mismos para todos, BRUTOS_GRILLA). Unos 46 × 56 enteros. El nombre ya va en el idioma de la
// página (Intl.DisplayNames en el servidor), así el cliente no arma nombres.
export interface PaisCliente {
  mercado: string;
  iso: string;
  moneda: string;
  ppa: number;
  nombre: string;
  href: string;
  region: RegionMundo | null;
  verificadoEl: string;
  netos: readonly number[];
  // Solo si el país no usa los brutos comunes (una grilla vieja o parcial).
  brutos?: readonly number[];
}

export interface GrillaCliente {
  brutos: readonly number[];
  paises: readonly PaisCliente[];
}

const mismos = (a: readonly number[], b: readonly number[]) => a.length === b.length && a.every((x, i) => x === b[i]);

export function compactar(grilla: GrillaMundo, locale: string, origenAR: string): GrillaCliente {
  const paises = grilla.paises
    .filter((p) => p.puntos.length > 1 && p.ppa > 0)
    .map((p): PaisCliente => {
      const brutos = p.puntos.map((x) => x.bruto);
      return {
        mercado: p.mercado,
        iso: p.iso,
        moneda: p.moneda,
        ppa: p.ppa,
        nombre: nombreDePais({ codigo: p.mercado, pais: p.iso, nombre: p.iso, idioma: "en" }, locale),
        href: p.sitio === "ar" ? `${origenAR}${p.ruta}` : p.ruta,
        region: regionDe(p.iso),
        verificadoEl: p.datosVerificadosEl,
        netos: p.puntos.map((x) => Math.round(x.neto)),
        ...(mismos(brutos, BRUTOS_GRILLA) ? {} : { brutos }),
      };
    });
  return { brutos: [...BRUTOS_GRILLA], paises };
}

// De vuelta a la forma del contrato, para usar compararDesde y cargaDesde tal cual.
export function expandir(c: GrillaCliente): GrillaMundo {
  const paises: PaisMundo[] = c.paises.map((p) => {
    const brutos = p.brutos ?? c.brutos;
    return {
      mercado: p.mercado,
      iso: p.iso,
      moneda: p.moneda,
      ppa: p.ppa,
      anioPpa: 0,
      calculadora: "",
      ruta: p.href,
      sitio: "intl",
      puntos: p.netos.map((neto, i) => ({ bruto: brutos[i], neto })),
      datosVerificadosEl: p.verificadoEl,
    };
  });
  return { version: 1, generadoEl: "", fuentePpa: { organismo: "", indicador: "", url: "", consultadoEl: "" }, paises };
}
