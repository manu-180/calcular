import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

export const textosHy: TextosUi<UiMargenDeGanancia> = {
  slug: "shahuyti-marzha",
  ui: () => ({
    modo: "Ի՞նչ եք ուզում հաշվարկել",
    modoPrecio: "Մարժան՝ ըստ ինքնարժեքի և գնի",
    modoMargen: "Գինը՝ ըստ ցանկալի մարժայի",
    modoMarkup: "Գինը՝ ըստ ցանկալի հավելագնի",
    costo: "Մեկ միավորի ինքնարժեք",
    costoAyuda: "Որքան արժե մեկ միավորը գնելը կամ արտադրելը՝ առանց հաճախորդին փոխանցվող ԱԱՀ-ի։",
    precio: "Վաճառքի գին",
    precioAyuda: "Միայն մարժան հաշվարկելիս։ Առանց ԱԱՀ-ի։",
    objetivo: "Ցանկալի մարժա կամ հավելագին (%)",
    objetivoAyuda: "Միայն գինը հաշվարկելիս։",
    precioResultado: "Վաճառքի գին",
    margen: "Շահույթի մարժա",
    margenAyuda: "Շահույթը՝ որպես վաճառքի գնի տոկոս։",
    markup: "Հավելագին",
    markupAyuda: "Շահույթը՝ որպես ինքնարժեքի տոկոս։",
    ganancia: "Շահույթ մեկ միավորից",
    errorCosto: "Մուտքագրեք մեկ միավորի ինքնարժեքը։",
    errorFaltaPrecio: "Մուտքագրեք վաճառքի գինը, որպեսզի հաշվարկենք մարժան։",
    errorFaltaObjetivo: "Մուտքագրեք այն մարժան կամ հավելագինը, որին ձգտում եք։",
    errorMargen100: "Մարժան պետք է 100% արժեքից ցածր լինի։ 100% դեպքում ամբողջ գինը շահույթ կլիներ՝ առանց որևէ ինքնարժեքի։",
    observacionPerdida: "Այս գնով վաճառում եք ինքնարժեքից ցածր և յուրաքանչյուր վաճառքից վնաս եք կրում։",
  }),
};
