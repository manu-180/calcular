// Bengalí (ADR 0002, D14): las cifras visibles van con dígitos bengalíes (০-৯), como en la web de NBR,
// Bangladesh Bank y los bancos del país. Intl de bn-BD ya formatea así montos, porcentajes y fechas;
// esto es para lo que llega como número suelto o como texto con cifras latinas (un año, un contador,
// el argumento de una función de un diccionario). Es idempotente: un texto que ya viene con dígitos
// bengalíes queda igual. Los números con miles van con formatearNumero en bn-BD (১২,৩৪,৫৬৭); esto no
// agrupa, así que sirve para años (২০২৬).
export const cifrasBn = (valor: number | string): string => String(valor).replace(/[0-9]/g, (d) => String.fromCharCode(0x09e6 + Number(d)));

// Para los `rellenar` de plantillas con {marcas} (horas, sueldos, mundo en el navegador): si la
// plantilla está escrita en bengalí, los valores van con dígitos bengalíes, así un contador o un
// número suelto ({n}, {k}, {h}) no queda con cifras latinas. Las demás plantillas quedan igual.
const ESCRITURA_BN = /[\u0980-\u09FF]/;
export const valorPara = (plantilla: string): ((v: string | number) => string) => (ESCRITURA_BN.test(plantilla) ? cifrasBn : String);
