import type { TextosUi } from "../../tipos";
import type { UiFechaDeParto } from "../definicion";

export const textosSv: TextosUi<UiFechaDeParto> = {
  slug: "graviditetskalkylator",
  ui: () => ({
    metodo: "Vilket datum vet du?",
    fum: "Första dagen i senaste mensen",
    concepcion: "Datum för befruktning",
    fecha: "Datum",
    fechaAyuda: "Väljer du senaste mensen, fyll i första blödningsdagen.",
    ciclo: "Cykelns längd (dagar)",
    cicloAyuda: "Används bara med senaste mensen. Vet du inte, låt det stå 28.",
    fpp: "Beräknat förlossningsdatum (BF)",
    edadGestacional: "Graviditetsvecka i dag",
    trimestre: "Trimester",
    faltan: "Dagar kvar",
    fechaConcepcion: "Ungefärlig befruktning",
    semanasYDias: (s, d) => `${s} ${s === 1 ? "vecka" : "veckor"}${d ? ` och ${d} ${d === 1 ? "dag" : "dagar"}` : ""}`,
    trimestres: ["Första trimestern", "Andra trimestern", "Tredje trimestern"],
    errorFutura: "Datumet kan inte vara senare än i dag.",
    errorCiclo: "Cykelns längd måste vara mellan 20 och 45 dagar.",
    notaPasada: "Det har gått mer än 42 veckor sedan det datumet, så graviditetsveckan visas inte.",
    aviso: "Det här är en uppskattning. Få barn föds exakt på BF. Ultraljud och kontroller hos barnmorska ger det säkraste datumet, och det ersätter inte en bedömning av barnmorska, läkare eller annan vårdpersonal.",
  }),
};
