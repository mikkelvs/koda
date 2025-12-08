# Koda klient til registrering af covernumre

## Forståelse og afgrænsning af opgaven

Min opgaveløsning har taget udgangspunkt i beskrivelsen af den nuværende proces og ønsket om at automatisere dele heraf. Casebeskrivelsen indeholder et par, for mig, uklarheder, hvor jeg i en faktisk situation ville tale med forretningen og få dem afklaret. Min løsning er derfor baseret på nedenstående antagelser og begrænsninger.

### Forretningsmæssige antagelser

- Beskrivelsen af Flow 2 (Betaling til rettighedshavere) er kun med for kontekst, og indgår ikke derudover i oogaven. Jeg har ikke indsigt i NMPs processer, og inkluderer dem derfor ikke i diagram og prototype.
- Det er ikke nærmere beskrevet hvad Kodas kontrol af den registrerede data indebærer. I opgaveløsningen er det derfor antaget, at dette kan fuldautomatiseres uden et manuelt review.

### Tekniske begrænsninger

- Prototypen tager udgangspunkt i step 1-3 fra Flow 1 (Registrering af covernumre).
- Koden er funktionel, men i en pre-PR tilstand, hvor optimeringer og syntaksoprydning udestår.
- Ingen unit tests eller Storybook. Jeg kan redegøre for hensigtsmæssige testscenarier.

## Diagram over løsningen

<img width="732" height="431" alt="Koda drawio" src="https://github.com/user-attachments/assets/89fad302-7a7d-4206-bdf3-0e9725f322a6" />

## Lokal afvikling af løsningen

Hent koden og kør herefter i CWD:

```bash
npm install
npm run build
npm run start
```

Tilgå [http://localhost:3000](http://localhost:3000) i browseren.
