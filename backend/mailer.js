const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const nodemailer = require('nodemailer');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/feedback', async (req, res) => {
  try {
    const { fullname, companyName, email, phone, description } = req.body;

    const transporter = nodemailer.createTransport({
      host: 'smtp.mail.ru',
      port: 465,
      secure: true,
      auth: {
        user: 'hrconsulting.krd@mail.ru',
        pass: 'eUmWxn5CdbmG0ZkmRn2v',
      },
      tls: {
        rejectUnauthorized: false
      }
    })

    await transporter.sendMail({
      from: 'hrconsulting.krd@mail.ru',
      to: 'hrconsulting.krd@mail.ru',
      subject: 'Письмо о вакансии',
      text: `
      Почта: ${email}
      Телефон: ${phone}
      Ф.И.О: ${fullname}
      Именование компании: ${companyName}
      Описание: ${description}`,
    })
  } catch (err) {
      return res.status(500).send({
        status: 500,
        message: 'Письмо не было отправлено'
      })
  }

  return res.json();
})

app.listen(port, () => console.log(`Listening on port http://localhost:${port}`))
