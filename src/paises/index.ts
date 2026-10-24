import { crearRegistro, definirPais } from "@/motor/registro";
import zz from "./zz";
import zzEn from "./zz-en";
import zzJa from "./zz-ja";
import zzTh from "./zz-th";
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
import be from "./be";
import chFr from "./ch-fr";
import chIt from "./ch-it";
import caFr from "./ca-fr";
import beFr from "./be-fr";
import inn from "./in";
import hk from "./hk";
import ng from "./ng";
import my from "./my";
import ph from "./ph";
import ma from "./ma";
import lu from "./lu";
import luDe from "./lu-de";
import ke from "./ke";
import tz from "./tz";
import gh from "./gh";
import sn from "./sn";
import pk from "./pk";
import jp from "./jp";
import ae from "./ae";
import li from "./li";
import kw from "./kw";

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

export const PAISES = [global, zz, zzEn, zzJa, zzTh, cl, co, mx, pe, uy, ec, cr, gt, py, rd, sv, pa, hn, ni, ve, bo, us, br, gb, fr, de, es, it, ca, nl, ie, at, pt, au, nz, za, ch, sg, be, chFr, chIt, caFr, beFr, inn, hk, ng, my, ph, ma, lu, luDe, ke, tz, gh, sn, pk, jp, ae, li, kw] as const;

export const registro = crearRegistro(PAISES);
