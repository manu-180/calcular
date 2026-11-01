import { definirCalculadora, ErrorEntrada } from "@/motor/calculo";

// Borrador: los datos que pide no se pudieron leer en la fuente primaria (scripts/paises/lt/INFORME.md).
export default definirCalculadora({
  id: "lt.atostoginiu-skaiciuokle",
  mercado: "lt",
  concepto: "vacaciones",
  slug: "atostoginiu-skaiciuokle",
  estado: "borrador",
  requiere: {
    "lt.atostogu-dienos": "numero",
  },
  campos: [
    { id: "uzmokestis", tipo: "moneda", etiqueta: "Darbo užmokestis per paskutinius 3 mėnesius", min: 0, porDefecto: 6000 },
    { id: "darboDienos", tipo: "entero", etiqueta: "Dirbtos dienos per tuos 3 mėnesius", min: 1, porDefecto: 63 },
    { id: "dienos", tipo: "entero", etiqueta: "Atostogų darbo dienos", min: 1, porDefecto: 10 },
  ],
  calcular(e, v, { redondear }) {
    if (e.darboDienos <= 0) throw new ErrorEntrada("Įveskite dirbtas dienas.", "darboDienos");
    const dienos = e.uzmokestis / e.darboDienos;
    return { atostoginiai: redondear(dienos * e.dienos), vidutinisDienos: redondear(dienos), maziausios: v["lt.atostogu-dienos"] };
  },
  resultado: [
    { clave: "atostoginiai", etiqueta: "Atostoginiai ant popieriaus", formato: "moneda", destacada: true },
    { clave: "vidutinisDienos", etiqueta: "Vidutinis dienos užmokestis", formato: "moneda" },
    { clave: "maziausios", etiqueta: "Mažiausios kasmetinės atostogos", formato: "dias" },
  ],
});
