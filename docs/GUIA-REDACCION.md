# Guía de redacción de calcular

Vale para todo texto que lee una persona: páginas, FAQs, botones, mensajes de error, metadata,
mails y la versión de cada país. Pedido de Manuel (6/10/2026): «no ser tan robot, no usar
guiones, narrativas para las personas, lo más fácil de entender posible, claro y breve».

## Reglas duras

1. **Sin rayas.** Ni «—» ni «–» ni « - » como pausa. Nosotros no escribimos así.
   La aclaración va entre paréntesis, o se parte la oración en dos.
2. **Una idea por oración.** Si pasa de 25 palabras, se corta.
3. **Primero la respuesta, después el porqué.** La persona vino con una pregunta concreta.
4. **Palabras de todos los días.** El término legal aparece una vez, explicado, y después se usa
   la palabra común. «El aguinaldo (en la ley se llama SAC)», no «el Sueldo Anual Complementario».
5. **Hablarle a una persona.** Segunda persona, voz activa, verbos concretos.
6. **Breve.** Si un párrafo se puede decir en la mitad de palabras sin perder nada, se dice en la mitad.
7. **Los datos no se tocan.** Números, porcentajes, leyes, fechas y fuentes quedan idénticos.
   Se reescribe cómo se dice, nunca qué se dice. Si un dato parece mal, se avisa, no se corrige al pasar.
8. **Sin emojis, sin signos de exclamación de vendedor, sin mayúsculas para gritar.**
9. **Sin muletillas de robot:** «cabe destacar», «es importante mencionar», «en este sentido»,
   «a continuación», «asimismo», «no obstante», «en resumen», «sin lugar a dudas», «te contamos».

## Ejemplos reales

| Antes | Después |
|---|---|
| El aguinaldo —formalmente, Sueldo Anual Complementario (SAC)— se paga | El aguinaldo (en la ley se llama SAC) se paga |
| 11% de jubilación, 3% de PAMI y 3% de obra social — un 17% en total. | 11% de jubilación, 3% de PAMI y 3% de obra social. En total, 17%. |
| cobrás el proporcional a los días trabajados — incluso con un solo mes de antigüedad. | cobrás la parte proporcional a los días que trabajaste. Aunque tengas un solo mes de antigüedad. |
| Si no trabajaste el semestre completo —porque entraste después o porque el contrato terminó antes— cobrás | Si no trabajaste el semestre completo (porque entraste después o porque te fuiste antes), cobrás |

## Tono por país

| País | Trato | Notas |
|---|---|---|
| Argentina | vos («calculá», «cobrás») | rioplatense, cercano |
| Uruguay | vos en la web, sin exagerar el lunfardo | «liquidación», «BPS», «aguinaldo» |
| Paraguay | vos o usted según research | confirmar en docs/research/paises/py.md |
| Resto de LATAM | tú (o usted donde el research lo indique: Colombia formal) | sin voseo, sin argentinismos («laburo», «re», «posta») |

Cada país usa sus palabras: gratificación (Perú, Chile), prima de servicios (Colombia), finiquito
(México, Chile), utilidades (Venezuela). La tabla de vocabulario sale del research de cada país,
nunca de la traducción del texto argentino.

## Antes de dar un texto por terminado

- Leelo en voz alta. Si suena a formulario, reescribilo.
- Contá las rayas: tienen que ser cero en texto visible (el gate `scripts/check_guiones.ts` lo verifica).
- ¿Lo entiende alguien que nunca leyó una ley? Si no, simplificá.
