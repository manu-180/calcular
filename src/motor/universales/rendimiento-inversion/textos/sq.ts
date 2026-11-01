import type { TextosUi } from "../../tipos";
import type { UiRendimientoInversion } from "../definicion";

export const textosSq: TextosUi<UiRendimientoInversion> = {
  slug: "kthimi-nga-investimi",
  ui: () => ({
    inicial: "Shuma e investuar",
    final: "Vlera përfundimtare",
    finalAyuda: "Sa vlen sot investimi ose sa morët kur e shitët.",
    cobrado: "Të ardhura të arkëtuara gjatë kohës (opsionale)",
    cobradoAyuda: "Dividendë, interesa ose qira që i keni arkëtuar dhe nuk i keni riinvestuar.",
    anios: "Vite mbajtjeje",
    aniosAyuda: "Mund të përdorni dhjetore për periudha më të shkurtra, për shembull 1,5 për një vit e gjysmë.",
    ganancia: "Fitimi",
    roi: "Kthimi total (ROI)",
    cagr: "Kthimi vjetor (CAGR)",
    cagrAyuda: "Kthimi vjetor që, i zbatuar në mënyrë të përbërë vit pas viti, çon në të njëjtin rezultat.",
    errorInicial: "Vendosni shumën e investuar në fillim.",
    observacionCorto: "Për më pak se një vit, kthimi vjetor e shtrin një rezultat afatshkurtër sikur të përsëritej gjithë vitin. Interpretojeni me kujdes.",
    observacionInflacion: "Për të parë nëse keni fituar fuqi blerëse, krahasoni kthimin vjetor me inflacionin e së njëjtës periudhë.",
  }),
};
