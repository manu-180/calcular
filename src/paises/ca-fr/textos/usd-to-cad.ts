import { definirTextos } from "@/motor/edicion";
import usdToCad from "../../ca/calculadoras/usd-to-cad";
import { MENSAJES_COMUNES } from "../lib/comun";

export default definirTextos(usdToCad, {
  calculadora: "ca-fr.usd-to-cad",
  slug: "convertisseur-dollar-americain",
  campos: {
    direccion: { etiqueta: "Convertir", opciones: { "usd-cad": "Dollars américains en dollars canadiens", "cad-usd": "Dollars canadiens en dollars américains" } },
    monto: { etiqueta: "Montant" },
  },
  filas: {
    resultado: { etiqueta: "Montant converti" },
    moneda: { etiqueta: "Devise du résultat" },
    tasa: { etiqueta: "Dollars canadiens par dollar américain" },
    inversa: { etiqueta: "Dollars américains par dollar canadien" },
    fecha: { etiqueta: "Date du taux" },
  },
  mensajes: {
    ...MENSAJES_COMUNES,
    "Canadian dollars (CAD)": "Dollars canadiens (CAD)",
    "US dollars (USD)": "Dollars américains (USD)",
    "This is the Bank of Canada daily average rate. Banks and card issuers add their own margin when you buy or sell currency.":
      "C'est le taux moyen quotidien de la Banque du Canada. Les banques et les émetteurs de cartes ajoutent leur propre marge quand vous achetez ou vendez des devises.",
  },
});
