import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

export const textosBn: TextosUi<UiMargenDeGanancia> = {
  slug: "profit-margin",
  ui: () => ({
    modo: "আপনি কী হিসাব করতে চান?",
    modoPrecio: "খরচ ও দাম থেকে মার্জিন",
    modoMargen: "নির্দিষ্ট মার্জিনের জন্য বিক্রয়মূল্য",
    modoMarkup: "নির্দিষ্ট মার্কআপের জন্য বিক্রয়মূল্য",
    costo: "প্রতি ইউনিটের খরচ",
    costoAyuda: "একটি ইউনিট কিনতে বা বানাতে যা খরচ হয়, ক্রেতার কাছ থেকে নেওয়া ভ্যাট ছাড়া।",
    precio: "বিক্রয়মূল্য",
    precioAyuda: "শুধু মার্জিন হিসাব করলে লিখুন। ভ্যাট ছাড়া।",
    objetivo: "লক্ষ্য মার্জিন বা মার্কআপ (%)",
    objetivoAyuda: "শুধু বিক্রয়মূল্য হিসাব করলে লিখুন।",
    precioResultado: "বিক্রয়মূল্য",
    margen: "লাভের মার্জিন",
    margenAyuda: "বিক্রয়মূল্যের শতাংশ হিসেবে লাভ।",
    markup: "মার্কআপ",
    markupAyuda: "খরচের শতাংশ হিসেবে লাভ।",
    ganancia: "প্রতি ইউনিটে লাভ",
    errorCosto: "একটি ইউনিটের খরচ লিখুন।",
    errorFaltaPrecio: "মার্জিন হিসাব করতে বিক্রয়মূল্য লিখুন।",
    errorFaltaObjetivo: "আপনি কত মার্জিন বা মার্কআপ চান, লিখুন।",
    errorMargen100: "মার্জিন ১০০% এর কম হতে হবে: ১০০% মানে পুরো দামটাই লাভ, কোনো খরচ নেই।",
    observacionPerdida: "এই দামে আপনি খরচের চেয়ে কমে বিক্রি করছেন: প্রতিটি বিক্রিতে লোকসান হবে।",
  }),
};
