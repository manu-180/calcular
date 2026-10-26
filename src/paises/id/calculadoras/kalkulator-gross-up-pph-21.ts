import { definirCalculadora, ErrorEntrada, porcentaje } from "@/motor/calculo";
import { iuranBpjs, REQUIERE_BPJS } from "../lib/bpjs";
import { kategoriTer, OPCIONES_STATUS, REQUIERE_TER, tarifTer } from "../lib/pajak";

export default definirCalculadora({
  id: "id.kalkulator-gross-up-pph-21",
  mercado: "id",
  concepto: "propio",
  slug: "kalkulator-gross-up-pph-21",
  estado: "publicado",
  requiere: { ...REQUIERE_TER, ...REQUIERE_BPJS },
  campos: [
    { id: "gaji", tipo: "moneda", etiqueta: "Gaji per bulan sebelum tunjangan pajak", min: 0, porDefecto: 10000000 },
    { id: "status", tipo: "opcion", etiqueta: "Status PTKP", opciones: OPCIONES_STATUS, porDefecto: "tk0" },
    { id: "risiko", tipo: "opcion-dato", etiqueta: "Tingkat risiko JKK", dato: "id.jkk", porDefecto: "sangat-rendah" },
    { id: "kesehatan", tipo: "si-no", etiqueta: "Kantor membayar BPJS Kesehatan", porDefecto: true },
  ],
  calcular(entrada, v, { redondear }) {
    if (entrada.gaji <= 0) throw new ErrorEntrada("Masukkan gaji per bulan.", "gaji");
    const b = iuranBpjs({ upah: entrada.gaji, risiko: entrada.risiko, jp: false, batasJp: null, kesehatan: entrada.kesehatan }, v, redondear);
    const dasar = entrada.gaji + b.jkk + b.jkm + b.kesPemberi;
    // Punto fijo: la tunjangan tiene que igualar el PPh 21 TER del bruto que ya la incluye. Al cambiar de
    // fila de la tabla puede oscilar; se queda con la mayor, que siempre cubre el impuesto.
    let tunjangan = 0;
    let mayor = 0;
    for (let i = 0; i < 60; i++) {
      const siguiente = redondear(porcentaje(dasar + tunjangan, tarifTer(entrada.status, dasar + tunjangan, v)));
      if (siguiente === tunjangan) break;
      mayor = Math.max(mayor, siguiente);
      tunjangan = i > 40 ? mayor : siguiente;
    }
    const bruto = dasar + tunjangan;
    const tarif = tarifTer(entrada.status, bruto, v);
    return {
      tunjangan,
      bruto,
      pph: redondear(porcentaje(bruto, tarif)),
      tarif,
      kategori: `Kategori ${kategoriTer(entrada.status)}`,
    };
  },
  resultado: [
    { clave: "tunjangan", etiqueta: "Tunjangan PPh 21 per bulan", formato: "moneda", destacada: true },
    { clave: "bruto", etiqueta: "Penghasilan bruto setelah gross-up", formato: "moneda" },
    { clave: "pph", etiqueta: "PPh 21 TER bulan ini", formato: "moneda" },
    { clave: "tarif", etiqueta: "Tarif TER", formato: "porcentaje", decimales: 2 },
    { clave: "kategori", etiqueta: "Kategori TER", formato: "texto" },
  ],
});
