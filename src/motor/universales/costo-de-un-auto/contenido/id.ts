import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const g: GastosAuto = {
    precio: montoEjemplo(ctx, 25000),
    depreciacion: 15,
    seguro: montoEjemplo(ctx, 100),
    distancia: 1000,
    consumo: imperial ? 28 : 8,
    precioCombustible: montoEjemplo(ctx, imperial ? 3.5 : 1.2),
    mantenimiento: montoEjemplo(ctx, 60),
    estacionamiento: 0,
    otros: 0,
  };
  const mensual = costoMensual(g, imperial);
  const unidad = imperial ? "mil" : "kilometer";
  return {
    h1: "Kalkulator biaya kepemilikan mobil",
    title: tituloQueEntre(`Kalkulator biaya punya mobil ${ctx.nombrePais}`, `Biaya punya mobil ${ctx.nombrePais}`, "Kalkulator biaya punya mobil"),
    description: `Hitung biaya mobil yang sebenarnya per bulan, per tahun, dan per ${unidad}: BBM, asuransi, perawatan, parkir, dan penyusutan nilainya.`,
    intro: [
      "Banyak orang tahu berapa uang yang habis untuk bensin. Sedikit yang menjumlahkan asuransi, perawatan, parkir, dan terutama nilai mobil yang turun setiap tahun.",
      "Isi biaya Anda dan kami tampilkan berapa sebenarnya biaya mobil Anda. Hasilnya membantu Anda memutuskan apakah membeli, berganti mobil, atau memakai transportasi lain.",
    ],
    comoSeCalcula: [
      imperial
        ? "BBM per bulan = mil per bulan ÷ mil per galon × harga per galon."
        : "BBM per bulan = kilometer per bulan × liter per 100 km ÷ 100 × harga per liter.",
      "Penyusutan per bulan = nilai mobil × penyusutan per tahun ÷ 12.",
      "Biaya sebenarnya = BBM + asuransi + perawatan + parkir + biaya lain + penyusutan.",
      `Biaya per ${unidad} = biaya sebenarnya per bulan ÷ jarak tempuh dalam sebulan.`,
    ],
    ejemplo: [
      `Mobil senilai ${m(g.precio)} yang menempuh ${formatearNumero(ctx, g.distancia)} ${imperial ? "mil" : "km"} per bulan memakan biaya ${m(mensual)} per bulan, termasuk penyusutannya.`,
      `Artinya ${m(mensual * 12)} per tahun dan ${formatearMonto(ctx, mensual / g.distancia)} per ${unidad}.`,
    ],
    faq: [
      {
        pregunta: "Apa itu penyusutan nilai mobil?",
        respuesta:
          "Penyusutan adalah nilai yang hilang seiring waktu dan pemakaian. Anda tidak membayarnya setiap bulan, tetapi terasa saat mobil dijual. Pada mobil baru, ini sering menjadi biaya terbesar.",
      },
      {
        pregunta: "Mengapa cicilan kredit tidak ditambahkan?",
        respuesta:
          "Sebagian cicilan membayar mobil itu sendiri, yang sudah dihitung sebagai penyusutan. Jika keduanya dijumlahkan, mobil terhitung dua kali. Bunga kreditnya adalah biaya tambahan di luar itu.",
      },
      {
        pregunta: "Bagaimana cara menekan biaya mobil?",
        respuesta:
          "Bandingkan premi asuransi setiap tahun, jaga tekanan ban dan jadwal servis, dan jangan terlalu sering berganti mobil: nilai mobil paling banyak turun di tahun-tahun pertama.",
      },
    ],
    glosario: [
      { termino: "Penyusutan", definicion: "Nilai mobil yang hilang karena waktu dan pemakaian." },
      { termino: `Biaya per ${unidad}`, definicion: `Biaya rata-rata setiap ${unidad} yang ditempuh, dengan semua biaya dihitung.` },
    ],
  };
};
