import { crearRegistro, definirPais } from "@/motor/registro";
import zz from "./zz";
import cl from "./cl";

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

export const PAISES = [global, zz, cl] as const;

export const registro = crearRegistro(PAISES);
