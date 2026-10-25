import type { TextosUi } from "../../tipos";
import type { UiTarifaFreelance } from "../definicion";

export const textosHu: TextosUi<UiTarifaFreelance> = {
  slug: "szabaduszo-oradij-kalkulator",
  ui: () => ({
    ingreso: "Mennyit szeretnél évente hazavinni",
    ingresoAyuda: "Adók és költségek után. Ez a fizetésed szabadúszóként.",
    gastos: "Éves vállalkozási költségek",
    gastosAyuda: "Eszközök, szoftverek, internet, tanfolyamok, könyvelő, egészségbiztosítás és nyugdíj-megtakarítás.",
    impuestos: "Becsült adók és járulékok (%)",
    impuestosAyuda: "Amennyi a számlázott összeg és a költségek különbségéből adóra és járulékra megy. Ha nem vagy biztos benne, kérdezz meg egy könyvelőt. Kiindulásnak 25 százalék megfelel.",
    diasLibres: "Szabadnapok évente",
    diasLibresAyuda: "Szabadság, munkaszüneti napok és betegség. Ezeket senki nem fizeti ki, ezért az óradíjadnak kell fedeznie őket.",
    diasSemana: "Munkanapok hetente",
    horasSemana: "Számlázható órák hetente",
    horasSemanaAyuda: "Csak az órák, amelyeket kiszámlázol. Az ügyfélszerzés, az adminisztráció és a tanulás nem számlázható. 40 órából általában 20 és 30 között.",
    tarifaHora: "Óradíj",
    tarifaDia: "Napidíj",
    facturacionMensual: "Szükséges havi számlázás",
    facturacionAnual: "Szükséges éves számlázás",
    horasAnio: "Számlázható órák évente",
    errorIngreso: "Add meg, mennyit szeretnél évente keresni.",
    errorImpuestos: "Az adóknak 100 százalék alatt kell lenniük.",
    errorDias: "Ennyi szabadnappal nem marad munkanap az évben.",
    errorHoras: "Add meg, hetente hány órát tudsz kiszámlázni.",
    observacionFacturables: "Ha ennél kevesebbet kérsz, kevesebbet keresel, mint tervezted, vagy több órát kell dolgoznod.",
  }),
};
