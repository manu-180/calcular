import { definirTextos } from "@/motor/edicion";
import bono from "../../zz/calculadoras/bono";

export default definirTextos(bono, {
  calculadora: "zz-tr.bono",
  slug: "yariyil-ikramiyesi",
  campos: {
    sueldo: { etiqueta: "Aylık brüt maaş" },
    meses: { etiqueta: "Bu yarıyılda çalıştığınız ay sayısı" },
    region: { etiqueta: "Çalıştığınız bölge" },
    regimen: { etiqueta: "İşletme büyüklüğü", opciones: { general: "Orta ya da büyük işletme", pequena: "Küçük işletme" } },
  },
  filas: {
    base: { etiqueta: "Hesaplamada kullanılan maaş" },
    bono: { etiqueta: "İkramiye" },
    bonificacion: { etiqueta: "Ek ödeme" },
    total: { etiqueta: "Elinize geçecek toplam" },
  },
  mensajes: {
    "Los meses van de 1 a 6.": "Ay sayısı 1 ile 6 arasında olmalıdır.",
    "Tu sueldo está por debajo del mínimo de tu zona, así que el bono se calcula con el mínimo.":
      "Maaşınız bölgenizin asgari ücretinin altında. Bu yüzden ikramiye asgari ücretten hesaplanır.",
  },
});
