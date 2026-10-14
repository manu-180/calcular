import { crearRegistro, definirPais } from "@/motor/registro";
import zz from "./zz";
import cl from "./cl";
import co from "./co";
import mx from "./mx";
import pe from "./pe";
import uy from "./uy";
import ec from "./ec";
import cr from "./cr";
import gt from "./gt";
import py from "./py";
import rd from "./do";
import sv from "./sv";
import pa from "./pa";
import hn from "./hn";
import ni from "./ni";
import ve from "./ve";
import bo from "./bo";

// "global" no es un país: es la home de calcularya.com con el selector, en inglés y x-default de cada
// clúster hreflang (ADR 0002, D2). No tiene datos ni calculadoras.
const global = definirPais({
  mercado: {
    codigo: "global",
    pais: "",
    nombre: "Worldwide",
    locale: "en",
    idioma: "en",
    trato: "tu",
    monedas: ["USD"],
    zonaHoraria: "America/Mexico_City",
    estado: "publicado",
    redondeo: { decimales: 2, modo: "mitad-arriba" },
  },
});

export const PAISES = [global, zz, cl, co, mx, pe, uy, ec, cr, gt, py, rd, sv, pa, hn, ni, ve, bo] as const;

export const registro = crearRegistro(PAISES);
