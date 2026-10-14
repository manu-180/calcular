import { textosConSuiza } from "../../comun/locales";
import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

const textos: TextosUi<UiPresupuesto> = {
  slug: "50-30-20-regel",
  ui: () => ({
    ingreso: "Monatliches Nettoeinkommen",
    ingresoAyuda: "Was jeden Monat auf Ihrem Konto ankommt, nach Steuern und Abgaben.",
    pctNecesidades: "Fixkosten (%)",
    pctNecesidadesAyuda: "Miete, Lebensmittel, Strom und Heizung, Mobilität, Versicherungen und Mindestraten für Kredite.",
    pctGustos: "Freizeit und Wünsche (%)",
    pctGustosAyuda: "Essen gehen, Shopping, Abos, Urlaub.",
    pctAhorro: "Sparen (%)",
    pctAhorroAyuda: "Notgroschen, Sparziele, Altersvorsorge und Sondertilgungen.",
    necesidades: "Für Fixkosten",
    gustos: "Für Freizeit und Wünsche",
    ahorro: "Zum Sparen",
    ahorroAnual: "Ersparnis in einem Jahr",
    errorIngreso: "Geben Sie Ihr monatliches Einkommen ein.",
    errorSuma: (suma) => `Die drei Prozentsätze ergeben zusammen ${suma} %. Sie müssen 100 % ergeben.`,
    observacionAhorroBajo: "Wer weniger als 10 % spart, hat wenig Polster für Unvorhergesehenes. Wenn möglich, kürzen Sie etwas bei den Wünschen.",
  }),
};

export const textosDe = textosConSuiza(textos);
