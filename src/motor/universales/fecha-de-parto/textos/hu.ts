import type { TextosUi } from "../../tipos";
import type { UiFechaDeParto } from "../definicion";

export const textosHu: TextosUi<UiFechaDeParto> = {
  slug: "szules-varhato-idopontja",
  ui: () => ({
    metodo: "Melyik dátumot ismered?",
    fum: "Az utolsó menstruáció első napja",
    concepcion: "A fogantatás napja",
    fecha: "Dátum",
    fechaAyuda: "Ha az utolsó menstruációt választod, a vérzés első napját add meg.",
    ciclo: "Ciklushossz (nap)",
    cicloAyuda: "Csak az utolsó menstruációval számolva kell. Ha nem tudod, hagyd 28 napon.",
    fpp: "Várható szülési időpont",
    edadGestacional: "Hányadik héten jársz ma",
    trimestre: "Trimeszter",
    faltan: "Hátralévő napok",
    fechaConcepcion: "Becsült fogantatás",
    semanasYDias: (s, d) => `${s} hét${d ? ` és ${d} nap` : ""}`,
    trimestres: ["Első trimeszter", "Második trimeszter", "Harmadik trimeszter"],
    errorFutura: "A dátum nem lehet későbbi a mai napnál.",
    errorCiclo: "A ciklushossznak 20 és 45 nap között kell lennie.",
    notaPasada: "Ettől a dátumtól már több mint 42 hét telt el, ezért a terhességi hetet nem mutatjuk.",
    aviso: "Ez becslés: kevés baba születik pontosan a várható napon. A legpontosabb dátumot az ultrahang és az orvosi vagy védőnői vizsgálatok adják.",
  }),
};
