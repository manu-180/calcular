import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoPl: ContenidoUniversal = (ctx) => {
  const precio3 = montoEjemplo(ctx, 6);
  const m = (n: number) => formatearMonto(ctx, n);
  const dni = (4 * 12) / 6;
  return {
    h1: "Kalkulator proporcji",
    title: tituloQueEntre(
      `Kalkulator proporcji prostej i odwrotnej | ${ctx.nombrePais}`,
      `Kalkulator proporcji | ${ctx.nombrePais}`,
      "Kalkulator proporcji",
    ),
    description: "Rozwiąż proporcję prostą albo odwrotną w sekundę. Wpisz trzy wartości, a dostaniesz czwartą razem z rachunkiem.",
    intro: [
      "Proporcja działa, gdy dwie wielkości zmieniają się razem, a znasz trzy z czterech wartości.",
      "Wybierz proporcję prostą albo odwrotną, wpisz A, B i C, a kalkulator poda X.",
    ],
    comoSeCalcula: [
      "Proporcja prosta: X = B × C ÷ A. Stosuj ją, gdy obie wielkości rosną razem (więcej kilogramów, wyższa cena).",
      "Proporcja odwrotna: X = A × B ÷ C. Stosuj ją, gdy jedna rośnie, a druga maleje (więcej osób, mniej dni).",
    ],
    ejemplo: [
      `Jeśli 3 kilogramy kosztują ${m(precio3)}, to 5 kilogramów kosztuje ${m((precio3 * 5) / 3)}.`,
      `Jeśli 4 osoby malują dom przez 12 dni, to 6 osób pomaluje go w ${formatearNumero(ctx, dni)} dni.`,
    ],
    faq: [
      {
        pregunta: "Jak rozpoznać, czy proporcja jest prosta, czy odwrotna?",
        respuesta: "Jeśli jedna wielkość rośnie, gdy rośnie druga, proporcja jest prosta. Jeśli jedna maleje, gdy druga rośnie, jest odwrotna.",
      },
      {
        pregunta: "Jak policzyć proporcję prostą na kartce?",
        respuesta: `Pomnóż na krzyż dwie znane wartości i podziel przez trzecią. Jeśli 3 odpowiada 600, to 5 odpowiada 600 × 5 ÷ 3 = ${formatearNumero(ctx, 1000)}.`,
      },
      {
        pregunta: "Czy można jej użyć do procentów?",
        respuesta: "Tak. Jeśli 200 to 100%, to 50 to 25%: to proporcja prosta, w której A = 200, B = 100 i C = 50.",
      },
    ],
    glosario: [
      { termino: "Proporcja prosta", definicion: "Obie wielkości rosną albo maleją razem." },
      { termino: "Proporcja odwrotna", definicion: "Jedna wielkość rośnie, gdy druga maleje." },
    ],
  };
};
