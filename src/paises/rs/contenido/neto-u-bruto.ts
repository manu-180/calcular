import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "rs.neto-u-bruto",
  h1: "Neto u bruto kalkulator {{anio}}",
  title: "Neto u bruto {{anio}}: koliki bruto daje željenu platu",
  description: "Pretvorite neto u bruto zaradu: uračunati su porez {{rs.porez-na-zarade}}, neoporezivi deo {{rs.neoporezivi-iznos}} i doprinosi. Vidite i trošak poslodavca.",
  intro: [
    "Da bi na račun stiglo 100.000 dinara, bruto zarada mora da pokrije porez od {{rs.porez-na-zarade}} iznad neoporezivih {{rs.neoporezivi-iznos}} i doprinose od 19,9 odsto.",
    "Ovaj obračun je koristan kad se o plati pregovara u neto iznosu, a ugovor o radu mora da navede bruto. Rezultat je najmanji bruto iz koga ostaje bar traženi neto.",
  ],
  comoSeCalcula: [
    "U običnom rasponu formula je bruto = (neto minus porez na neoporezivi iznos) podeljeno sa 0,701. Tih 0,701 je ono što ostaje od svakog dinara iznad neoporezivog dela.",
    "Kad je zarada ispod {{rs.najniza-osnovica}} ili iznad {{rs.najvisa-osnovica}}, doprinosi se ne računaju na stvarni bruto, pa kalkulator traži tačan iznos korak po korak, do na paru.",
    "Na dobijeni bruto se dodaju doprinosi poslodavca: {{rs.pio-poslodavac}} za PIO i {{rs.zdravstvo}} za zdravstvo.",
  ],
  ejemplo: [
    "Želite 73.522,10 dinara neto. Porez na neoporezivi iznos bi bio 3.422,10 dinara, pa je (73.522,10 minus 3.422,10) podeljeno sa 0,701 jednako 100.000 dinara bruto.",
    "Za minimalnih 64.554 dinara neto (174 radna časa) bruto je oko 87.206,71 dinara, a poslodavca košta oko 100.418 dinara.",
  ],
  faq: [
    {
      pregunta: "Da li u ugovoru mora da piše bruto zarada?",
      respuesta: "Zakon o radu u čl. 105 pod zaradom podrazumeva iznos koji sadrži porez i doprinose koji se plaćaju iz zarade. Zato je bruto iznos osnova obračuna, čak i kad se dogovarate u neto iznosu.",
    },
    {
      pregunta: "Zašto bruto ne raste isto kao neto?",
      respuesta: "Od svakog dodatnog dinara bruta zaposlenom ostaje 70,1 para: 19,9 ide na doprinose, a 10 na porez. Zato sto dinara neto traži oko 142,65 dinara bruto.",
    },
    {
      pregunta: "Šta se menja iznad najviše osnovice?",
      respuesta: "Iznad {{rs.najvisa-osnovica}} mesečno nema novih doprinosa, samo porez, pa od svakog dodatnog dinara ostaje 90 para.",
    },
  ],
  glosario: [
    { termino: "Neto", definicion: "Iznos koji stiže na račun zaposlenog." },
    { termino: "Bruto", definicion: "Zarada sa porezom i doprinosima zaposlenog." },
    { termino: "Bruto 2", definicion: "Bruto zarada sa doprinosima poslodavca, odnosno ukupan trošak firme." },
  ],
});
