import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

export const textosHu: TextosUi<UiTarjetaDeCredito> = {
  slug: "hitelkartya-torlesztes",
  ui: () => ({
    saldo: "Hitelkártya-tartozás",
    tasa: "Éves kamat (%)",
    tasaAyuda: "A vásárlások kamata a kamatmentes időszak után. A számlakivonaton vagy a szerződésben találod.",
    modo: "Hogyan törlesztesz?",
    modoFijo: "Minden hónapban ugyanannyit",
    modoMinimo: "A minimális összeget",
    pagoFijo: "Fix havi befizetés",
    minimoPorcentaje: "Minimális befizetés (a tartozás százalékában)",
    minimoPorcentajeAyuda: "Ennyit kér tőled havonta a kártyakibocsátó. Ha nem vagy biztos benne, gyakori érték az 5%.",
    minimoPiso: "A minimális befizetés legalább",
    meses: "Hónapok száma a visszafizetésig",
    intereses: "Kifizetett kamat",
    total: "Összesen befizetve",
    primerPago: "Az első minimális befizetés",
    tabla: "Törlesztési terv hónapról hónapra",
    colMes: "Hónap",
    colPago: "Befizetés",
    colInteres: "Kamat",
    colCapital: "Tőke",
    colSaldo: "Tartozás",
    errorSaldo: "Add meg, mennyi a tartozásod a kártyán.",
    errorFaltaPago: "Add meg, mennyit fizetsz be havonta.",
    errorNoCubre: (interes) => `Ezzel a befizetéssel a tartozás sosem csökken: már az első hónap kamata is ennyi: ${interes}. Emeld a befizetést.`,
    errorMuyLargo: "Ezzel a befizetéssel több mint 50 évig tartana a visszafizetés. Emeld a befizetést.",
    observacionAnios: (anios, meses) => (meses === "0" ? `Ez összesen ${anios} év.` : `Ez összesen ${anios} év és ${meses} hónap.`),
    observacionFijo: (pago, meses, ahorro) =>
      `Ha mindig ugyanannyit fizetsz, mint az első minimális befizetés (${pago}), ennyi hónap alatt végzel: ${meses}. A megspórolt kamat: ${ahorro}.`,
    observacionNoGastar: "A számítás feltételezi, hogy a visszafizetés alatt nem vásárolsz többet a kártyával.",
  }),
};
