import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosBn: TextosUi<UiAhorroRetiro> = {
  slug: "retirement-savings",
  ui: () => ({
    edadActual: "বর্তমান বয়স",
    edadRetiro: "যে বয়সে অবসর নিতে চান",
    actual: "এখন পর্যন্ত জমানো টাকা",
    aporte: "প্রতি মাসে জমা",
    rendimiento: "প্রকৃত বার্ষিক মুনাফা (%)",
    rendimientoAyuda: "মূল্যস্ফীতি বাদ দিয়ে বিনিয়োগের মুনাফা। দীর্ঘ মেয়াদে ২ থেকে ৫% একটি সাবধানি অনুমান।",
    aniosRenta: "কত বছর ধরে খরচ করবেন",
    aniosRentaAyuda: "অবসরের এই তহবিল কত বছরে খরচ করবেন।",
    capital: "অবসরের সময় তহবিল",
    renta: "তহবিল থেকে প্রতি মাসে খরচ করা যাবে",
    aportado: "মোট জমা দেওয়া টাকা",
    intereses: "বিনিয়োগে বাড়তি আয়",
    tabla: "বয়সভিত্তিক তহবিল",
    colEdad: "বয়স",
    colAportado: "ততদিনে মোট জমা",
    colSaldo: "তহবিল",
    errorEdades: "অবসরের বয়স বর্তমান বয়সের চেয়ে বেশি হতে হবে।",
    errorSinAhorro: "এখনকার সঞ্চয় বা মাসিক জমার পরিমাণ লিখুন।",
    observacionDineroDeHoy: "মুনাফা থেকে মূল্যস্ফীতি বাদ দেওয়া হয়েছে, তাই অঙ্কগুলো আজকের টাকার মূল্যে দেখানো হচ্ছে।",
    observacionPublica: "শুধু নিজের জমানো তহবিল হিসাব করা হয়েছে। সরকারি পেনশন বা অন্য কোনো ভাতা এর মধ্যে নেই।",
  }),
};
