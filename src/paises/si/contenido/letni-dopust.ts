import { definirContenido } from "@/motor/calculo";

export default definirContenido({
  calculadora: "si.letni-dopust",
  h1: "Letni dopust {{anio}}: izračun dni po ZDR-1",
  title: "Letni dopust {{anio}}: koliko dni vam pripada",
  description: "Najmanj štirje tedni dopusta in dodatni dnevi za otroke ter starejše delavce. Izračunajte število dni in sorazmerni del po ZDR-1.",
  intro: [
    "Letni dopust po 159. členu ZDR-1 ne sme biti krajši od štirih tednov. Število dni je odvisno od tega, koliko dni na teden delate. Pri petih dneh je to najmanj 20 dni.",
    "Dodatne dneve zakon daje starejšim delavcem, invalidom, delavcem s telesno okvaro, staršem otrok s posebnimi potrebami in za vsakega otroka, mlajšega od 15 let.",
  ],
  comoSeCalcula: [
    "Osnovni dopust = delovni dnevi v tednu × število tednov: {{si.dopust[tedni]}}.",
    "Starejši delavec, invalid, delavec z najmanj 60-odstotno telesno okvaro ali delavec, ki neguje otroka s posebnimi potrebami, ima dodatne dni, število: {{si.dopust[dodatni]}}.",
    "Za vsakega otroka, ki še ni dopolnil 15 let, se doda dni: {{si.dopust[na-otroka]}}. Pri krajši zaposlitvi v letu pripada 1/12 dopusta za vsak mesec (161. člen ZDR-1).",
  ],
  ejemplo: [
    "Delavec dela pet dni na teden in ima dva otroka do 15 let: 20 dni in 2 dneva da 22 dni. Če je zaposlen le šest mesecev, mu pripada polovica, 11 dni.",
  ],
  faq: [
    {
      pregunta: "Kdo je starejši delavec?",
      respuesta: "Po 197. členu ZDR-1 je to delavec, starejši od 55 let. Tak delavec ima pravico do najmanj treh dodatnih dni dopusta.",
    },
    {
      pregunta: "Do kdaj moram izrabiti dopust?",
      respuesta: "Vsaj dva tedna v tekočem letu, preostanek pa v dogovoru z delodajalcem do 30. junija naslednjega leta (162. člen ZDR-1).",
    },
    {
      pregunta: "Ali lahko kolektivna pogodba določi več dni?",
      respuesta: "Da. Daljši dopust lahko določi kolektivna pogodba ali pogodba o zaposlitvi (160. člen ZDR-1). Kalkulator računa zakonski minimum.",
    },
  ],
  glosario: [
    { termino: "Sorazmerni del dopusta", definicion: "Ena dvanajstina letnega dopusta za vsak mesec zaposlitve." },
    { termino: "ZDR-1", definicion: "Zakon o delovnih razmerjih." },
  ],
});
