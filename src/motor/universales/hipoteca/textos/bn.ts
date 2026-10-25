import { cifrasBn } from "../../../i18n/bengali";
import type { TextosUi } from "../../tipos";
import type { UiHipoteca } from "../definicion";

export const textosBn: TextosUi<UiHipoteca> = {
  slug: "mortgage",
  ui: () => ({
    precio: "ফ্ল্যাট বা বাড়ির দাম",
    entradaPorcentaje: "ডাউন পেমেন্ট (দামের %)",
    entradaMonto: "ডাউন পেমেন্টের পরিমাণ (ঐচ্ছিক)",
    entradaMontoAyuda: "লিখলে শতাংশের বদলে এই পরিমাণ ধরা হবে।",
    tasa: "বার্ষিক সুদের হার (%)",
    anios: "মেয়াদ (বছর)",
    gastos: "মাসিক আবাসন খরচ (ঐচ্ছিক)",
    gastosAyuda: "হোল্ডিং ট্যাক্স, বিমা, সার্ভিস চার্জের মতো যা কিস্তির সঙ্গে প্রতি মাসে দিতে হয়।",
    cuota: "হোম লোনের মাসিক কিস্তি",
    cuotaTotal: "আবাসন খরচসহ মাসিক পরিশোধ",
    entrada: "ডাউন পেমেন্ট",
    prestado: "ঋণের পরিমাণ",
    intereses: "মোট সুদ",
    total: "হোম লোনে মোট পরিশোধ",
    tabla: "বছরভিত্তিক পরিশোধ",
    colAnio: "বছর",
    colIntereses: "পরিশোধিত সুদ",
    colCapital: "পরিশোধিত আসল",
    colSaldo: "বছর শেষে বাকি ঋণ",
    errorPrecio: "ফ্ল্যাট বা বাড়ির দাম লিখুন।",
    errorEntrada: "ডাউন পেমেন্টেই পুরো দাম মিটে যাচ্ছে, তাই ঋণের হিসাব নেই। ডাউন পেমেন্ট কমিয়ে দেখুন।",
    observacionPrestado: (porcentaje) => `আপনি দামের ${cifrasBn(porcentaje)}% ঋণ নিচ্ছেন। এই অনুপাত যত বেশি, ব্যাংকের যাচাই সাধারণত তত কড়া হয়।`,
    observacionCostos: "রেজিস্ট্রেশন খরচ, কর ও দালালি ফির মতো আনুষঙ্গিক খরচ এখানে ধরা হয়নি। এগুলোর জন্য ডাউন পেমেন্টের বাইরে আলাদা টাকা রাখুন।",
  }),
};
