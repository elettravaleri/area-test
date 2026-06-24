# Handoff per Claude Code — Landing "Abitudini Infelici" / Area Reset

Ciao Claude. Questo progetto è una landing page già funzionante (prototipo ad alta
fedeltà) per il libro **"Abitudini Infelici"** di **Elettra Valeri**. Va trasformata
in un sito reale e messa online. Sotto trovi lo stato attuale, le decisioni già prese
e cosa fare.

---

## Cos'è il progetto

- **File principale:** `Area Reset.dc.html` — è un Design Component (single-file).
  Contiene TUTTO: landing, test/quiz (21 domande, 7 "pattern" risultato), area sblocco
  col codice del libro, percorso 28 giorni "Area Reset", pagina privacy, materiali
  stampabili, anteprima email e una dashboard "Area autrice".
- **`ISTRUZIONI - Collegare i servizi.md`** — guida ai servizi (Brevo + Supabase).
- **`assets/cover.jpg`** — copertina del libro.
- Tutta la configurazione è nell'oggetto **`CONFIG`** dentro la classe `Component`
  (cerca "CONFIGURAZIONE" / "CONFIG"). Cambia i valori lì, non sparsi nel codice.

Il prototipo è scritto come .dc.html (runtime custom con `support.js`). In fase di
codifica puoi mantenerlo così oppure portarlo allo stack che preferisci (es. React/Vite
o astatico) — **purché tu preservi 1:1 testi, layout, palette, font e i flussi**. Niente
redesign: l'aspetto è approvato.

---

## Stato dei servizi (già configurati nel CONFIG)

- **Brevo** (email marketing): `BREVO_FORM_ACTION` e `BREVO_EMAIL_FIELD` compilati.
  → Verifica che il form action sia valido e che le iscrizioni arrivino in lista.
- **Supabase** (profili / salvataggi multi-dispositivo): `SUPABASE_URL`,
  `SUPABASE_ANON_KEY`, `SUPABASE_TABLE: 'profili'` compilati.
  → ⚠️ Da verificare lato server: che la **tabella `profili` esista** con le colonne
    usate dal codice e che le **RLS policy** siano corrette (insert pubblico controllato,
    nessuna lettura aperta dei dati altrui). La chiave presente è la *anon key* (ok che
    sia pubblica). NON aggiungere mai la service_role key nel frontend.

---

## DA FARE — bloccanti prima del deploy

1. **Privacy policy — quasi pronta.** Il testo dell'informativa è stato riscritto ed è
   reale e specifico per questo sito (email via Brevo, profili via Supabase, localStorage,
   diritti GDPR, cookie/archiviazione locale, Garante). **Restano solo 3 campi da
   compilare**, segnati con `[ ]` nella pagina Privacy: identità completa del titolare,
   email di contatto e data di "ultimo aggiornamento". Inseriti quelli, è pubblicabile.
   (Consigliata comunque una rilettura da un consulente, come per ogni informativa.)
2. **Link al libro.** `CONFIG.BOOK_URL` è vuoto → la sezione "Il libro" mostra
   "Presto su Amazon". Quando Elettra dà l'URL Amazon, incollalo lì: comparirà
   automaticamente il pulsante "Acquista il libro →".
3. **Verifica Supabase** (vedi sopra: tabella + RLS).

## DA DECIDERE CON ELETTRA — chiedere prima di procedere

4. **Dashboard "Area autrice" → dati reali.** Oggi i numeri sono mock (statici).
   Vanno cablati a Supabase/Brevo: test completati, % completamento, iscrizioni email,
   codici libro attivati, distribuzione dei 7 pattern. Chiedere se serve subito o dopo.
5. **Sicurezza Area autrice.** Oggi è protetta solo da una password nel codice
   (`CONFIG.AUTHOR_PASSWORD`) — barriera "da curiosi", non sicura. Se Elettra vuole
   protezione vera, implementare login reale (es. Supabase Auth) e gating server-side
   della dashboard.
6. **Hosting + dominio.** Decidere dove pubblicare (Netlify/Vercel o altro) e su quale
   dominio. Configurare HTTPS.

## NICE-TO-HAVE (opzionali)

7. Anti-spam sui form (honeypot / rate limit) per evitare iscrizioni-bot.
8. Meta tag Open Graph (titolo, descrizione, immagine di anteprima social) + favicon.
9. Email di benvenuto automatica su Brevo dopo l'iscrizione.
10. Analytics rispettoso privacy (es. Plausible) se desiderato.

---

## Note di prodotto (per non rompere la logica)

- Il **codice del libro** (`CONFIG.VALID_CODES`) sblocca l'Area Reset: chi compra il
  libro entra col codice stampato all'interno e prosegue il percorso anche dopo la
  lettura. Mantieni questo flusso.
- I dati utente (mail, risultato del test, avanzamento) oggi restano sul dispositivo se
  Supabase non risponde — è il fallback locale. Va mantenuto come degrado morbido.
- 21 domande, 7 pattern: NON modificare contenuti del test senza conferma dell'autrice.
- Autrice ufficiale: **Elettra Valeri**. Titolo: **Abitudini Infelici**.
