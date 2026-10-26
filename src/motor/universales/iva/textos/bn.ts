import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosBn: TextosUi<UiIva> = {
  slug: "vat",
  ui: () => ({
    operacion: "আপনি কী করতে চান?",
    agregar: "ভ্যাট ছাড়া দামের সঙ্গে ভ্যাট যোগ করুন",
    quitar: "ভ্যাটসহ দাম থেকে ভ্যাট বাদ দিন",
    monto: "দাম",
    montoAyuda: "ভ্যাট যোগ করলে ভ্যাট ছাড়া দাম, বাদ দিলে ভ্যাটসহ দাম লিখুন।",
    otraTasa: "ভিন্ন ভ্যাট হার (%)",
    otraTasaAyuda: "ঐচ্ছিক। পণ্যটিতে কম হার প্রযোজ্য হলে এখানে লিখুন। না লিখলে সাধারণ হার ধরা হবে।",
    neto: "ভ্যাট ছাড়া দাম",
    impuesto: "ভ্যাট",
    total: "ভ্যাটসহ দাম",
    tasaUsada: "প্রয়োগ করা হার",
    errorTasa: "ভ্যাটের হারটি সঠিক নয়।",
  }),
};
