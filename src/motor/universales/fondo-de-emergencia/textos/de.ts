import type { TextosUi } from "../../tipos";
import type { UiFondoDeEmergencia } from "../definicion";

export const textosDe: TextosUi<UiFondoDeEmergencia> = {
  slug: "notgroschen-rechner",
  ui: () => ({
    gastos: "Feste Ausgaben pro Monat",
    gastosAyuda: "Was Sie in jedem Fall zahlen müssen: Miete, Lebensmittel, Strom und Heizung, Mobilität, Versicherungen und Kreditraten.",
    meses: "Wie viele Monate soll er abdecken?",
    mesesAyuda: "3 bis 6 Monate bei sicherem Einkommen. Mehr, wenn es schwankt oder nur eine Person im Haushalt verdient.",
    actual: "Schon zurückgelegt (optional)",
    aporte: "Was Sie monatlich sparen können (optional)",
    meta: "Empfohlener Notgroschen",
    falta: "Noch zu sparen",
    mesesParaLlegar: "Monate bis zum vollen Notgroschen",
    cobertura: "So viele Monate deckt Ihr Erspartes heute",
    errorGastos: "Geben Sie Ihre festen Ausgaben für einen Monat ein.",
    yaCubierto: "Ihr Notgroschen ist komplett. Was Sie ab jetzt sparen, können Sie für andere Ziele verwenden.",
    sinAporte: "Geben Sie ein, wie viel Sie monatlich sparen können, dann sehen Sie, wie lange es dauert.",
    observacionDonde: "Legen Sie ihn auf ein eigenes Konto, von dem Sie jederzeit abheben können und das nicht schwankt, zum Beispiel ein Tagesgeldkonto.",
  }),
};
