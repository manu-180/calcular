import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosSv: TextosUi<UiOvulacion> = {
  slug: "agglossning",
  ui: () => ({
    fum: "Första dagen i senaste mensen",
    fumAyuda: "Första blödningsdagen, inte den sista.",
    ciclo: "Cykelns längd (dagar)",
    cicloAyuda: "Från första dagen i en mens till dagen före nästa. Varierar den, använd ett genomsnitt.",
    ovulacion: "Ungefärlig ägglossning",
    fertilDesde: "Fertila dagar från",
    fertilHasta: "Fertila dagar till",
    proxima: "Nästa mens",
    tabla: "Kommande cykler",
    colRegla: "Mens",
    colDesde: "Fertil från",
    colHasta: "Fertil till",
    colOvulacion: "Ägglossning",
    errorCiclo: "Cykelns längd måste vara mellan 21 och 45 dagar.",
    aviso: "Det här är en uppskattning för regelbundna cykler. Det är inget preventivmedel och ersätter inte en bedömning av barnmorska, läkare eller annan vårdpersonal.",
  }),
};
