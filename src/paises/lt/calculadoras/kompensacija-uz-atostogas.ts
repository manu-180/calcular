import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

// Borrador: los datos que pide no se pudieron leer en la fuente primaria (scripts/paises/lt/INFORME.md).
export default definirCalculadora({
  id: "lt.kompensacija-uz-atostogas",
  mercado: "lt",
  concepto: "propio",
  slug: "kompensacija-uz-atostogas",
  estado: "borrador",
  requiere: {
    "lt.atostogu-dienos": "numero",
  },
  campos: [
    { id: "uzmokestis", tipo: "moneda", etiqueta: "Darbo užmokestis per paskutinius 3 mėnesius", min: 0, porDefecto: 6000 },
    { id: "darboDienos", tipo: "entero", etiqueta: "Dirbtos dienos per tuos 3 mėnesius", min: 1, porDefecto: 63 },
    { id: "nepanaudotos", tipo: "numero", etiqueta: "Nepanaudotos atostogų dienos", min: 0, porDefecto: 5 },
  ],
  calcular(e, v, { redondear }) {
    if (e.darboDienos <= 0) throw new ErrorEntrada("Įveskite dirbtas dienas.", "darboDienos");
    const dienos = e.uzmokestis / e.darboDienos;
    return { kompensacija: redondear(dienos * e.nepanaudotos), vidutinisDienos: redondear(dienos), maziausios: v["lt.atostogu-dienos"] };
  },
  resultado: [
    { clave: "kompensacija", etiqueta: "Kompensacija ant popieriaus", formato: "moneda", destacada: true },
    { clave: "vidutinisDienos", etiqueta: "Vidutinis dienos užmokestis", formato: "moneda" },
    { clave: "maziausios", etiqueta: "Mažiausios kasmetinės atostogos", formato: "dias" },
  ],
});
