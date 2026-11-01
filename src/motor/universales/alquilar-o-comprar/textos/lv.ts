import { pluralLv } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiAlquilarOComprar } from "../definicion";

// «pēc» pide genitivo en singular y dativo en plural: «pēc 1 gada», «pēc 21 gada», «pēc 3 gadiem».
const pecGadiem = (n: number | string) => pluralLv(n, "gada", "gadiem", "gadiem");

export const textosLv: TextosUi<UiAlquilarOComprar> = {
  slug: "iret-vai-pirkt-kalkulators",
  ui: () => ({
    precio: "Mājokļa cena",
    entrada: "Pirmā iemaksa (% no cenas)",
    gastosCompra: "Pirkuma izmaksas (% no cenas)",
    gastosCompraAyuda: "Īpašuma novērtējums, kredīta komisijas, notārs, reģistrācija un nekustamo īpašumu aģenta komisija.",
    tasa: "Mājokļa kredīta gada procentu likme (%)",
    aniosHipoteca: "Kredīta termiņš (gados)",
    alquiler: "Līdzīga mājokļa īres maksa mēnesī",
    aumentoAlquiler: "Īres maksas pieaugums gadā (%)",
    gastosPropietario: "Īpašnieka izmaksas gadā (% no cenas)",
    gastosPropietarioAyuda: "Remonts un uzturēšana, nekustamā īpašuma nodoklis, mājokļa apdrošināšana. Parasti no 1 līdz 2%.",
    revalorizacion: "Mājokļa cenas pieaugums gadā (%)",
    rendimiento: "Alternatīvo ieguldījumu ienesīgums (% gadā)",
    rendimientoAyuda: "Cik nopelnītu, ja pirmo iemaksu ieguldītu, nevis pirktu mājokli.",
    horizonte: "Pēc cik gadiem salīdzināt",
    veredicto: "Rezultāts",
    patrimonioComprar: "Jūsu īpašums beigās, ja pērkat",
    patrimonioAlquilar: "Jūsu īpašums beigās, ja īrējat",
    diferencia: "Starpība",
    anioDesde: "Gads, no kura izdevīgāk pirkt",
    pagadoAlquilando: "Kopā samaksāts par īri",
    pagadoComprando: "Kopā samaksāts par kredītu un uzturēšanu",
    tabla: "Salīdzinājums pa gadiem",
    colAnio: "Gads",
    colComprar: "Pirkšana",
    colAlquilar: "Īre",
    colDiferencia: "Starpība",
    errorPrecio: "Ievadiet mājokļa cenu.",
    errorAlquiler: "Ievadiet, cik maksātu līdzīga mājokļa īre.",
    convieneComprar: (anios, diferencia) => `Izdevīgāk pirkt: pēc ${pecGadiem(anios)} jums būs par ${diferencia} vairāk.`,
    convieneAlquilar: (anios, diferencia) => `Izdevīgāk īrēt: pēc ${pecGadiem(anios)} jums būs par ${diferencia} vairāk.`,
    empate: (anios) => `Pēc ${pecGadiem(anios)} abi varianti dod vienādu rezultātu.`,
    observacionDesde: (anio) => `Sākot ar ${anio}. gadu pirkšana apsteidz īri un pēc tam paliek izdevīgāka.`,
    observacionMetodo:
      "Salīdzina to, kas jums būs katrā gadījumā. Īrējot pirmā iemaksa un tas, ko ietaupāt katru mēnesi, paliek ieguldīts. Vēlākas mājokļa pārdošanas izmaksas netiek atskaitītas.",
  }),
};
