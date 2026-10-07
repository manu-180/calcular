import { crearRegistro, definirPais } from "@/motor/registro";
import zz from "./zz";
import cl from "./cl";
import co from "./co";
import mx from "./mx";

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

export const PAISES = [global, zz, cl, co, mx] as const;

export const registro = crearRegistro(PAISES);
