import { crearRegistro, definirPais } from "@/motor/registro";
import zz from "./zz";
import zzEn from "./zz-en";
import zzDa from "./zz-da";
import zzFi from "./zz-fi";
import zzAr from "./zz-ar";
import zzId from "./zz-id";
import zzBn from "./zz-bn";
import zzHe from "./zz-he";
import zzJa from "./zz-ja";
import zzNb from "./zz-nb";
import zzPl from "./zz-pl";
import zzSv from "./zz-sv";
import zzTr from "./zz-tr";
import zzTh from "./zz-th";
import zzUk from "./zz-uk";
import zzUz from "./zz-uz";
import zzRu from "./zz-ru";
import zzRo from "./zz-ro";
import zzCs from "./zz-cs";
import zzEl from "./zz-el";
import zzHu from "./zz-hu";
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
import ci from "./ci";
import ao from "./ao";
import tn from "./tn";
import ug from "./ug";
import kr from "./kr";
import jm from "./jm";
import mu from "./mu";
import pl from "./pl";
import se from "./se";
import dk from "./dk";
import no from "./no";
import fi from "./fi";
import idn from "./id";
import tr from "./tr";
import bd from "./bd";
import eg from "./eg";
import sa from "./sa";
import jo from "./jo";
import ua from "./ua";
import uz from "./uz";

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

export const PAISES = [global, zz, zzEn, zzJa, zzPl, zzSv, zzDa, zzNb, zzFi, zzAr, zzId, zzTr, zzBn, zzTh, zzUk, zzUz, zzRu, zzRo, zzCs, zzEl, zzHu, zzHe, cl, co, mx, pe, uy, ec, cr, gt, py, rd, sv, pa, hn, ni, ve, bo, us, br, gb, fr, de, es, it, ca, nl, ie, at, pt, au, nz, za, ch, sg, be, chFr, chIt, caFr, beFr, inn, hk, ng, my, ph, ma, lu, luDe, ke, tz, gh, sn, pk, jp, ae, li, kw, ci, ao, tn, ug, kr, jm, mu, pl, se, dk, no, fi, idn, tr, bd, eg, sa, jo, ua, uz] as const;

export const registro = crearRegistro(PAISES);
