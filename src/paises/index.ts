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

// "global" no es un país: es la home de calcularya.com con el selector. No tiene datos ni calculadoras.
const global = definirPais({
  mercado: {
    codigo: "global",
    pais: "",
    nombre: "Latinoamérica",
    locale: "es-419",
    idioma: "es",
    trato: "tu",
    monedas: ["USD"],
    zonaHoraria: "America/Mexico_City",
    estado: "publicado",
    redondeo: { decimales: 2, modo: "mitad-arriba" },
  },
});

export const PAISES = [global, zz, cl, co, mx, pe, uy, ec, cr, gt, py, rd, sv, pa, hn, ni, ve] as const;

export const registro = crearRegistro(PAISES);
