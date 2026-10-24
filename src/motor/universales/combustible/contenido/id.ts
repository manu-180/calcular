import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const precio = montoEjemplo(ctx, 3.5);
        const galones = 300 / 30;
        return [
          `Perjalanan 150 mil pulang pergi dengan mobil yang konsumsinya 30 mpg membutuhkan ${formatearNumero(ctx, galones)} galon.`,
          `Dengan harga ${m(precio)} per galon, biayanya ${m(galones * precio)}. Jika patungan berdua, masing-masing ${m((galones * precio) / 2)}.`,
        ];
      })()
    : (() => {
        const precio = montoEjemplo(ctx, 1.2);
        const litros = (600 * 8) / 100;
        return [
          `Perjalanan 300 km pulang pergi dengan mobil yang memakai 8 liter per 100 km (${formatearNumero(ctx, 100 / 8, 1)} km/l) membutuhkan ${formatearNumero(ctx, litros)} liter.`,
          `Dengan harga ${m(precio)} per liter, biayanya ${m(litros * precio)}. Jika patungan berdua, masing-masing ${m((litros * precio) / 2)}.`,
        ];
      })();
  return {
    h1: "Kalkulator biaya bensin",
    title: tituloQueEntre(`Kalkulator biaya bensin perjalanan ${ctx.nombrePais}`, `Kalkulator biaya bensin ${ctx.nombrePais}`, "Kalkulator biaya bensin"),
    description: "Hitung biaya bensin untuk perjalanan dari jarak, konsumsi BBM kendaraan, dan harga BBM, lalu bagi biayanya per orang.",
    intro: [
      `Masukkan jarak, konsumsi BBM kendaraan Anda, dan harga per ${imperial ? "galon" : "liter"}. Anda akan melihat berapa BBM yang dibutuhkan dan berapa biaya perjalanannya.`,
      imperial ? "Konsumsi BBM diisi dalam mil per galon." : "Konsumsi BBM bisa diisi dalam liter per 100 km atau kilometer per liter (km/l).",
    ],
    comoSeCalcula: imperial
      ? ["Galon = jarak ÷ mil per galon.", "Biaya = galon × harga per galon. Pulang pergi berarti jaraknya dikali dua."]
      : [
          "Dengan liter per 100 km: liter = jarak × konsumsi ÷ 100.",
          "Dengan kilometer per liter: liter = jarak ÷ konsumsi.",
          "Biaya = liter × harga per liter. Pulang pergi berarti jaraknya dikali dua.",
        ],
    ejemplo,
    faq: [
      {
        pregunta: "Bagaimana cara mengubah km/l menjadi liter per 100 km?",
        respuesta: `Bagi 100 dengan angka km/l. Mobil yang menempuh 12 km per liter memakai sekitar ${formatearNumero(ctx, 100 / 12, 1)} liter per 100 km.`,
      },
      {
        pregunta: "Apakah biaya tol sudah termasuk?",
        respuesta: "Belum. Kalkulator ini hanya menghitung BBM. Tambahkan biaya tol dan parkir secara terpisah.",
      },
      {
        pregunta: "Mengapa mobil lebih boros di dalam kota?",
        respuesta: "Berhenti dan jalan berulang kali membutuhkan lebih banyak energi daripada melaju stabil di jalan tol, jadi konsumsi di kota biasanya lebih boros.",
      },
    ],
    glosario: [
      { termino: "Konsumsi BBM", definicion: "Jarak yang bisa ditempuh kendaraan dengan sejumlah bahan bakar." },
      { termino: "km/l", definicion: "Kilometer per liter. Makin tinggi angkanya, makin irit kendaraannya." },
    ],
  };
};
