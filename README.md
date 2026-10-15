# Blessing Basil — Portfolio

Persoonlijke portfoliowebsite van Blessing Basil, mobiele surveillant uit Lelystad.

Een statische website: alleen HTML en CSS, geen build-stap nodig.

## Bestanden

```
index.html          De website
styles.css          Alle stijlen; kleuren staan als variabelen bovenaan (o.a. --accent)
script.js           Fade-in bij scrollen, actieve menu-link en de terug-naar-boven-knop (mobiel)
assets/portrait.jpg Profielfoto
assets/favicon.svg  Icoon in het browsertabblad
.nojekyll           Zorgt dat GitHub Pages de bestanden ongewijzigd serveert
```

## Online zetten met GitHub Pages

1. Maak een nieuwe repository op GitHub, bijvoorbeeld `portfolio`.
2. Klik op **Add file › Upload files** en sleep alle bestanden uit deze map erin
   (dus `index.html` moet in de hoofdmap van de repository staan, niet in een submap).
3. Klik op **Commit changes**.
4. Ga naar **Settings › Pages**. Kies bij *Source* **Deploy from a branch**,
   selecteer de branch `main` en de map `/ (root)`, en klik **Save**.
5. Na een minuut staat de site op `https://<jouw-gebruikersnaam>.github.io/portfolio/`.

Tip: noem de repository `<jouw-gebruikersnaam>.github.io` om de site direct op dat adres te krijgen.

## Aanpassen

- **Accentkleur:** verander `--accent` bovenaan `styles.css`.
- **Werkgever invullen:** zoek in `index.html` naar `[Werkgever]` en vervang het door de juiste naam.
- **Foto vervangen:** zet een nieuwe foto in `assets/` met dezelfde naam `portrait.jpg`.
- **Lokaal bekijken:** open `index.html` gewoon in je browser.
