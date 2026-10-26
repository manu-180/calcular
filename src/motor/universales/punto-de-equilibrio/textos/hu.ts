import type { TextosUi } from "../../tipos";
import type { UiPuntoDeEquilibrio } from "../definicion";

export const textosHu: TextosUi<UiPuntoDeEquilibrio> = {
  slug: "fedezeti-pont-kalkulator",
  ui: () => ({
    fijos: "Havi fix költségek",
    fijosAyuda: "Amit akkor is fizetsz, ha semmit nem adsz el: bérleti díj, fix bérek, rezsi, szoftverek.",
    precio: "Eladási ár darabonként",
    variable: "Változó költség darabonként",
    variableAyuda: "Amennyibe minden eladott darab kerül: anyag, áru, jutalék, szállítás.",
    objetivo: "Kívánt havi nyereség (nem kötelező)",
    objetivoAyuda: "Hogy lásd, mennyit kell eladnod a költségeken felül.",
    unidades: "Darabszám a fedezeti ponthoz",
    facturacion: "Árbevétel a fedezeti ponthoz",
    contribucion: "Fedezeti hozzájárulás darabonként",
    contribucionAyuda: "Amennyi minden eladásból a fix költségekre jut: eladási ár mínusz változó költség.",
    contribucionPct: "Fedezeti hányad (%)",
    unidadesObjetivo: "Darabszám a kívánt nyereséghez",
    facturacionObjetivo: "Árbevétel a kívánt nyereséghez",
    errorPrecio: "Add meg egy darab eladási árát.",
    errorMargen: "A változó költség eléri vagy meghaladja az eladási árat: minden eladáson veszítesz, és soha nem éred el a fedezeti pontot. Ellenőrizd az árat vagy a költséget.",
    observacionRedondeo: "A darabszámot felfelé kerekítjük, mert egy darab töredékét nem lehet eladni.",
  }),
};
