# Area Reset — Come collegare i servizi reali

Questa landing funziona già da sola (i dati restano sul dispositivo di chi la usa).
Per renderla "vera" servono due account gratuiti. Sotto trovi **dove iscriverti** e
**cosa copiare**. Poi passi tutto a Claude Code e lui collega i valori.

Tutto si configura in **un solo punto** del file `Area Reset.dc.html`: l'oggetto
`CONFIG` (cerca la parola `CONFIGURAZIONE`).

---

## 1) EMAIL — Brevo (gratis)

**Dove iscriverti:** https://www.brevo.com  → "Registrati gratis"
- Piano gratuito: contatti illimitati, ~300 email/giorno. Interfaccia in italiano.

**Cosa fare dopo l'iscrizione:**
1. Menu **Contatti → Moduli (Forms) → Crea un modulo**.
2. Aggiungi il campo **Email** (e, se vuoi, un campo `PATTERN`).
3. Salva e apri il codice del modulo: copia l'URL dentro `<form action="...">`
   (è tipo `https://sibforms.com/serve/MUIF...`).
4. Incolla quell'URL in `CONFIG.BREVO_FORM_ACTION`.

> Alternativa altrettanto valida: **MailerLite** (https://www.mailerlite.com) —
> free fino a ~1.000 contatti. Si collega allo stesso modo.

---

## 2) BACKEND / PROFILI — Supabase (gratis)

Serve solo se vuoi che i profili e i progressi seguano la persona **su più
dispositivi** (oggi restano sul singolo telefono/computer).

**Dove iscriverti:** https://supabase.com → "Start your project"
- Piano gratuito: database + login utenti inclusi.

**Cosa copiare:**
1. Crea un nuovo progetto.
2. Vai in **Project Settings → API**.
3. Copia **Project URL** → in `CONFIG.SUPABASE_URL`.
4. Copia la chiave **anon public** → in `CONFIG.SUPABASE_ANON_KEY`.

> Più "no-code" ma a pagamento prima: **Softr** o **Glide** (area riservata sopra
> un foglio Airtable). Ottimi se preferisci zero codice.

---

## 3) CODICI DEL LIBRO

In `CONFIG.VALID_CODES` metti il codice (o i codici) che stamperai nel libro,
in MAIUSCOLO. Esempio: `['RESET28']`.

---

## 3b) LINK AL LIBRO

In `CONFIG.BOOK_URL` incolla l'URL della pagina di vendita (Amazon o store).
- Se **vuoto**, la sezione "Il libro" mostra il badge "Presto su Amazon".
- Se **compilato**, mostra il pulsante "Acquista il libro →" che apre il link.
Esempio: `BOOK_URL: 'https://www.amazon.it/dp/XXXXXXXXXX'`

---

## 3c) AREA AUTRICE (dashboard riservata)

La dashboard delle statistiche è protetta da password: `CONFIG.AUTHOR_PASSWORD`.
Si raggiunge cliccando la riga "© Elettra Valeri…" nel footer (porta discreta,
non un pulsante in vista), poi inserendo la password.

⚠️ **Importante:** è una protezione "da curiosi", non sicurezza vera (la password
sta nel codice della pagina). Per blindarla davvero, chiedi a Claude Code un login
reale (es. Supabase Auth) e di far leggere i numeri veri da Brevo/Supabase al posto
dei dati di esempio.

---

## 4) PRIVACY (obbligatorio prima di pubblicare)

Apri la pagina **Privacy** dal footer e sostituisci i campi tra `[parentesi]`
(nome, email di contatto, fornitore email). Falla validare da un consulente.

---

## Cosa dire a Claude Code

> "Collega la landing Area Reset a Brevo (CONFIG.BREVO_FORM_ACTION) per le email e a
> Supabase (CONFIG.SUPABASE_URL / SUPABASE_ANON_KEY) per profili e salvataggi
> multi-dispositivo. Imposta CONFIG.BOOK_URL col link al libro e CONFIG.VALID_CODES
> coi codici di accesso. Tutti i valori sono nell'oggetto CONFIG (cerca CONFIGURAZIONE)."

Riepilogo iscrizioni:
- Email → **Brevo**: https://www.brevo.com
- Backend → **Supabase**: https://supabase.com
