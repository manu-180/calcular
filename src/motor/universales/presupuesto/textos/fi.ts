import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosFi: TextosUi<UiPresupuesto> = {
  slug: "budjetti-50-30-20",
  ui: () => ({
    ingreso: "Nettotulot kuukaudessa",
    ingresoAyuda: "Summa, joka tulee tilillesi joka kuukausi verojen ja muiden vähennysten jälkeen.",
    pctNecesidades: "Välttämättömät menot (%)",
    pctNecesidadesAyuda: "Asuminen, ruoka, sähkö, liikkuminen, terveys ja lainojen vähimmäismaksut.",
    pctGustos: "Muut menot ja vapaa-aika (%)",
    pctGustosAyuda: "Ravintolat, ostokset, joita ilman pärjäisit, tilaukset ja matkat.",
    pctAhorro: "Säästäminen (%)",
    pctAhorroAyuda: "Puskurirahasto, säästötavoitteet, eläke ja velkojen ylimääräiset lyhennykset.",
    necesidades: "Välttämättömiin menoihin",
    gustos: "Muihin menoihin ja vapaa-aikaan",
    ahorro: "Säästöön",
    ahorroAnual: "Säästöt vuodessa",
    errorIngreso: "Syötä kuukausitulosi.",
    errorSuma: (suma) => `Osuudet ovat yhteensä ${suma} %. Niiden summan pitää olla 100 %.`,
    observacionAhorroBajo: "Jos säästät alle 10 %, yllättäviin menoihin jää vähän liikkumavaraa. Karsi muista menoista, jos voit.",
  }),
};
