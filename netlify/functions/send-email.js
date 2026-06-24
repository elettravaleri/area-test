const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let payload;
  try { payload = JSON.parse(event.body); } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { email, profile, frase, desc, trigger, primoPasso, nome, appUrl, tint } = payload;
  if (!email || !profile) return { statusCode: 400, body: 'Missing params' };

  const saluto = nome ? `Ciao ${nome},` : 'Ciao,';
  const accentColor = tint || '#C06B45';

  const htmlContent = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F4ECE1;font-family:'Helvetica Neue',Arial,sans-serif">
<div style="max-width:600px;margin:0 auto;padding:32px 16px">
  <div style="text-align:center;margin-bottom:28px">
    <span style="font-size:11px;letter-spacing:0.18em;color:#A65535;font-weight:700">ABITUDINI INFELICI · AREA RESET</span>
  </div>
  <div style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 8px 32px rgba(74,47,59,0.12)">
    <div style="background:#4A2F3B;padding:32px;text-align:center">
      <div style="font-size:11px;letter-spacing:0.14em;color:#E8C8B8;font-weight:700;margin-bottom:10px">IL TUO RISULTATO</div>
      <div style="font-size:30px;line-height:1.15;color:#F4E6DC;font-style:italic;font-family:Georgia,serif">${profile}</div>
    </div>
    <div style="padding:32px">
      <p style="font-size:16px;line-height:1.65;color:#2C201B;margin:0 0 16px">${saluto}</p>
      <p style="font-size:16px;line-height:1.65;color:#4a3a32;margin:0 0 20px">grazie per aver fatto il test. Il loop mentale che si attiva più spesso in te è quello di <strong>${profile}</strong>. Non è un'etichetta: è un circuito che, una volta visto, puoi cambiare.</p>
      <div style="background:#F7E8DF;border-radius:12px;padding:20px;margin:0 0 20px">
        <div style="font-size:10px;letter-spacing:0.14em;color:#A65535;font-weight:700;margin-bottom:8px">IL TUO PENSIERO RICORRENTE</div>
        <div style="font-size:18px;line-height:1.4;color:#2C201B;font-style:italic;font-family:Georgia,serif">«${frase}»</div>
      </div>
      <p style="font-size:15px;line-height:1.65;color:#4a3a32;margin:0 0 20px">${desc}</p>
      <div style="background:#F4ECE1;border-radius:12px;padding:20px;margin:0 0 24px">
        <div style="margin-bottom:14px">
          <div style="font-size:10px;letter-spacing:0.12em;color:#8E9C7C;font-weight:700;margin-bottom:5px">TRIGGER PIÙ PROBABILE</div>
          <div style="font-size:15px;color:#3a2c25;line-height:1.55">${trigger}</div>
        </div>
        <div>
          <div style="font-size:10px;letter-spacing:0.12em;color:#8E9C7C;font-weight:700;margin-bottom:5px">LA TUA PRIMA MICRO-AZIONE</div>
          <div style="font-size:15px;color:#3a2c25;line-height:1.55">${primoPasso}</div>
        </div>
      </div>
      <div style="text-align:center;margin-bottom:8px">
        <a href="${appUrl || 'https://area-reset.netlify.app'}" style="display:inline-block;background:${accentColor};color:#FBF6EF;font-weight:700;font-size:15px;padding:15px 32px;border-radius:100px;text-decoration:none">Accedi all'Area Reset →</a>
      </div>
    </div>
    <div style="padding:18px 32px;border-top:1px solid #EEE7DC">
      <p style="font-size:12px;color:#b9ab9d;line-height:1.6;margin:0">Ricevi questa email perché hai fatto il test su Abitudini Infelici. Puoi disiscriverti rispondendo a questa email.</p>
    </div>
  </div>
  <p style="text-align:center;font-size:12px;color:#a89a8b;margin:20px 0 0">Elettra Valeri · Abitudini Infelici</p>
</div>
</body></html>`;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `"Elettra Valeri · Abitudini Infelici" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Il tuo risultato: sei ${profile}`,
      html: htmlContent,
    });

    console.log('Gmail sent:', info.messageId, 'to:', email);
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true, messageId: info.messageId }),
    };
  } catch (err) {
    console.error('Gmail error:', err.message);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
