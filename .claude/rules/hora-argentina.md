---
paths:
  - "src/lib/**"
  - "src/data/**"
  - "src/app/**"
---

# Hora argentina: del tzdata, nunca -3 fijo

- La fecha, el día o la medianoche argentinos salen de `src/lib/hora-argentina.ts` (`enHoraAR`, `diaAR`, `medianocheAR`), que usa `America/Argentina/Buenos_Aires`. Nunca `- 3 * 3600 * 1000` ni un `-03:00` escrito a mano.
- Por qué: Argentina tuvo horario de verano en 2007-2009 y cambiar el huso se discute seguido. Con el tzdata el cambio llega solo; con el -3 fijo las ventanas del monotributo y del RIFL y los cortes del panel quedarían una hora corridos sin que nada falle.
- `enHoraAR` devuelve el instante corrido para leerlo con `getUTC*`: así el texto se arma a mano con partes numéricas y no depende del ICU (el motivo original del -3 en `panel/formato.ts`: «sept.» contra «sep» rompía la hidratación).
- Cada borde de un rango lleva su propia `medianocheAR`: no se arrastra el offset de hoy a otra fecha.
- Quedan a propósito: `fechaRss` de `novedades.ts` (mediodía con -03:00: cualquier huso de ±12 h da el mismo día) y los datos falsos de `panel/fixture.ts`.
- Medido el 02/11/2026: el resultado nuevo es idéntico al viejo en cada media hora de 2026 y 2027, y en 2008 da -02 como corresponde.
