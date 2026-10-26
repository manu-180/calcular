import { pluralRo } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiPrestamo } from "../definicion";

export const textosRo: TextosUi<UiPrestamo> = {
  slug: "calculator-credit",
  ui: () => ({
    monto: "Suma creditului",
    tasa: "Rata anuală a dobânzii (%)",
    tasaAyuda: "Dobânda anuală nominală din ofertă. Comisioanele nu sunt incluse.",
    meses: "Perioada în luni",
    extra: "Plată suplimentară pe lună (opțional)",
    extraAyuda: "Cât ați adăuga lunar ca să terminați mai repede. Toată suma merge la principal.",
    cuota: "Rata lunară",
    intereses: "Dobândă totală",
    total: "Total de plată",
    mesesReales: "Luni până la achitare, cu plata suplimentară",
    ahorro: "Dobândă economisită",
    tabla: "Grafic de rambursare",
    colMes: "Luna",
    colPago: "Rată",
    colInteres: "Dobândă",
    colCapital: "Principal",
    colSaldo: "Sold",
    errorMonto: "Introduceți o sumă mai mare decât zero.",
    observacionCostos: "Rata nu include asigurări, comisioane sau taxe pe care le poate adăuga creditorul. Cereți costul total al creditului și DAE înainte să semnați.",
    observacionExtra: (meses, ahorro) => `Cu plata suplimentară terminați în ${pluralRo(meses, "lună", "luni")} și economisiți ${ahorro} la dobândă.`,
  }),
};
