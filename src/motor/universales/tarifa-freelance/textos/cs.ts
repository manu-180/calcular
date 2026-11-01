import type { TextosUi } from "../../tipos";
import type { UiTarifaFreelance } from "../definicion";

export const textosCs: TextosUi<UiTarifaFreelance> = {
  slug: "hodinova-sazba-freelance",
  ui: () => ({
    ingreso: "Kolik chcete mít čistého za rok",
    ingresoAyuda: "Po zdanění a odečtení výdajů. Je to vaše mzda na volné noze.",
    gastos: "Výdaje na podnikání za rok",
    gastosAyuda: "Vybavení, software, internet, kurzy, účetní, pojištění a spoření na důchod.",
    impuestos: "Odhad daní a odvodů (%)",
    impuestosAyuda:
      "Kolik odvedete na daních a pojistném z toho, co vyfakturujete po odečtení výdajů. Pokud si nejste jistí, zeptejte se účetní. Jako výchozí odhad poslouží 25 %.",
    diasLibres: "Dny volna za rok",
    diasLibresAyuda: "Dovolená, svátky a dny nemoci. Nikdo vám je nezaplatí, takže je musí pokrýt vaše sazba.",
    diasSemana: "Pracovní dny v týdnu",
    horasSemana: "Fakturovatelné hodiny za týden",
    horasSemanaAyuda:
      "Jen hodiny, které klientům účtujete. Shánění zakázek, administrativa a vzdělávání se nefakturují. Obvykle je to 20 až 30 hodin ze 40.",
    tarifaHora: "Hodinová sazba",
    tarifaDia: "Denní sazba",
    facturacionMensual: "Potřebná fakturace za měsíc",
    facturacionAnual: "Potřebná fakturace za rok",
    horasAnio: "Fakturovatelné hodiny za rok",
    errorIngreso: "Zadejte, kolik chcete vydělat za rok.",
    errorImpuestos: "Daně musí být nižší než 100 %.",
    errorDias: "S tolika dny volna vám v roce nezbude žádný pracovní den.",
    errorHoras: "Zadejte, kolik hodin týdně můžete fakturovat.",
    observacionFacturables: "Pokud budete účtovat méně, vyděláte méně, než plánujete, nebo budete pracovat víc hodin.",
  }),
};
