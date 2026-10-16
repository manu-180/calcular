import { crearRegistro, definirPais } from "@/motor/registro";
import zz from "./zz";
import zzEn from "./zz-en";
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
import us from "./us";
import br from "./br";
import gb from "./gb";
import fr from "./fr";
import de from "./de";
import es from "./es";
import it from "./it";
import ca from "./ca";
import nl from "./nl";
import ie from "./ie";
import at from "./at";
import pt from "./pt";
import au from "./au";
import nz from "./nz";
import za from "./za";
import ch from "./ch";
import sg from "./sg";

// "global" no es un país: es la home de calcularya.com con el selector y el x-default de cada clúster
// hreflang, en inglés (ADR 0002, D2). No tiene datos ni calculadoras. Un global con errores de datos
// corta el build (next.config.ts, mercadosDelRegistro).
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

export const PAISES = [global, zz, zzEn, cl, co, mx, pe, uy, ec, cr, gt, py, rd, sv, pa, hn, ni, ve, bo, us, br, gb, fr, de, es, it, ca, nl, ie, at, pt, au, nz, za, ch, sg] as const;

export const registro = crearRegistro(PAISES);
