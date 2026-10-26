import { pluralCs } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import { duracionCs } from "../../dias-entre-fechas/textos/cs";
import type { UiEdad } from "../definicion";

export const textosCs: TextosUi<UiEdad> = {
  slug: "vypocet-veku",
  ui: () => ({
    nacimiento: "Datum narození",
    referencia: "Věk k datu",
    referenciaAyuda: "Ve výchozím nastavení dnešek. Změňte datum, pokud chcete znát věk k jinému dni.",
    edad: "Věk",
    anios: "Dovršené roky",
    totalMeses: "V měsících",
    totalSemanas: "V týdnech",
    totalDias: "Ve dnech",
    proximo: "Příští narozeniny",
    faltan: "Zbývá dní",
    cumplira: "Kolik let oslaví",
    duracion: duracionCs,
    errorFutura: "Datum narození nemůže být pozdější než datum, ke kterému věk počítáte.",
    cumpleHoy: (anios) => `Dnes jsou narozeniny: je to přesně ${pluralCs(anios, "rok", "roky", "let")}.`,
    nota29: "Kdo se narodil 29. února, tomu v nepřestupných letech počítáme narozeniny 28. února.",
  }),
};
