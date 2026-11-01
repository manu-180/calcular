import type { TextosUi } from "../../tipos";
import type { UiPuntoDeEquilibrio } from "../definicion";

export const textosEt: TextosUi<UiPuntoDeEquilibrio> = {
  slug: "tasuvuspunkt",
  ui: () => ({
    fijos: "Püsikulud kuus",
    fijosAyuda: "Kulud, mida maksad ka siis, kui midagi ei müü: üür, püsivad palgad, elekter, tarkvara ja tellimused.",
    precio: "Müügihind ühiku kohta",
    variable: "Muutuvkulud ühiku kohta",
    variableAyuda: "Mida iga müüdud ühik sulle maksma läheb: materjalid, ostud, vahendustasud ja transport.",
    objetivo: "Soovitud kasum kuus (valikuline)",
    objetivoAyuda: "Näed, kui palju pead lisaks kulude katmisele müüma.",
    unidades: "Ühikuid tasuvuspunktini",
    facturacion: "Käive tasuvuspunktis",
    contribucion: "Kate ühiku kohta",
    contribucionAyuda: "Mis jääb igast müügist püsikulude katmiseks: hind miinus muutuvkulud.",
    contribucionPct: "Kattemäär (%)",
    unidadesObjetivo: "Ühikuid soovitud kasumini",
    facturacionObjetivo: "Käive soovitud kasumi jaoks",
    errorPrecio: "Sisesta ühe ühiku müügihind.",
    errorMargen: "Muutuvkulud on hinnaga võrdsed või sellest suuremad. Iga müük toob kahjumit ja sa ei jõua kunagi tasuvuspunktini. Kontrolli hinda ja kulusid.",
    observacionRedondeo: "Ühikute arv ümardatakse ülespoole, sest ühiku osa ei saa müüa.",
  }),
};
