import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";

// Borrador: el nisab 2026 (Keputusan Ketua BAZNAS 15/2026) y la tasa todavía no se leyeron en una
// fuente primaria (baznas.go.id devuelve 403).
export default definirCalculadora({
  id: "id.kalkulator-zakat-penghasilan",
  mercado: "id",
  concepto: "propio",
  slug: "kalkulator-zakat-penghasilan",
  estado: "borrador",
  requiere: {
    "id.zakat-nisab-bulan": "numero",
    "id.zakat-kadar": "numero",
  },
  campos: [
    { id: "penghasilan", tipo: "moneda", etiqueta: "Penghasilan bruto per bulan", min: 0, porDefecto: 10000000 },
    { id: "lain", tipo: "moneda", etiqueta: "Penghasilan lain per bulan (bonus, honor, usaha sampingan)", min: 0, porDefecto: 0 },
  ],
  calcular(entrada, v, { redondear }) {
    const total = entrada.penghasilan + entrada.lain;
    if (total <= 0) throw new ErrorEntrada("Masukkan penghasilan per bulan.", "penghasilan");
    const wajib = total >= v["id.zakat-nisab-bulan"];
    const zakat = wajib ? redondear(porcentaje(total, v["id.zakat-kadar"])) : 0;
    return {
      zakat,
      setahun: zakat * 12,
      nisab: v["id.zakat-nisab-bulan"],
      status: wajib ? "Sudah mencapai nisab" : "Belum mencapai nisab",
    };
  },
  resultado: [
    { clave: "zakat", etiqueta: "Zakat penghasilan per bulan", formato: "moneda", destacada: true },
    { clave: "setahun", etiqueta: "Zakat setahun", formato: "moneda" },
    { clave: "nisab", etiqueta: "Nisab per bulan", formato: "moneda" },
    { clave: "status", etiqueta: "Status", formato: "texto" },
  ],
});
