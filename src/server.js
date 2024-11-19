// import cors from 'cors';
// import express from 'express';
// import pino from 'pino-http';
// import 'dotenv/config';
// import { getAllContacts, getContactById } from './services/contacts.js';

// const logger = pino({
//     pino-pretty: { colorize: true, translateTime: 'SYS:standard' }, // Для кращого форматування в консолі
// });

// const app = express();

// app.use(cors());
    
// app.use(express.json());

// app.use(logger);


// app.use((req, res, next) => {
//     res.status(404).send({ status: 404, message: "Not found" });
// });

// app.use((error, req, res, next) => {
//     console.error(error);
//     res.status(500).send({ status: 500, message: "Internal server error " });
// });

// app.get('/', (req, res) => {
//   res.send('Not found');
// });

// app.get('/contacts', async (req, res) => {
//   try {
//     const contacts = await getAllContacts();
//     res.status(200).json({
//       status: 200,
//       message: 'Successfully found contacts!',
//       data: contacts,
//     });
//   } catch (error) {
//         logger.error(error);
//   }
// });

// app.get('/contacts/:contactId', async (req, res) => {
//   try {
//     const contact = await getContactById(req.params.contactId);
//     if (contact) {
//       res.status(200).json({
//         status: 200,
//         message: `Successfully found contact with id ${req.params.contactId}!`,
//         data: contact,
//       });
//     } else {
//       res.status(404).json({ message: 'Contact not found' });
//     }
//   } catch (error) {
//     logger.error(error);
//   }
// });

// export function setupServer() {
//         try {
//             const PORT = process.env.PORT || 3000;
//             app.listen(PORT, () => {
//             console.log(`Server is running on port ${PORT}`);
//         });
//     } catch (error) {
//         console.error(error);
//     }
// }

import cors from 'cors';
import express from 'express';
import pino from 'pino';
import pinoHttp from 'pino-http';
import 'dotenv/config';
import { getAllContacts, getContactById } from './services/contacts.js';

// Налаштування логування через pino
const logger = pino({
  transport: {
    target: 'pino-pretty', // Вказуємо pino-pretty для форматування логів
    options: {
      colorize: true,        // Кольорове виділення
      translateTime: 'SYS:standard', // Формат часу
      ignore: 'pid,hostname', // Ігноруємо pid і hostname
    },
  },
});

const app = express();

// Використовуємо pino-http для логування запитів
app.use(pinoHttp({ logger }));

app.use(cors());
app.use(express.json());

// Маршрут за замовчуванням
app.get('/', (req, res) => {
  res.send('Not found');
});

// Отримання всіх контактів
app.get('/contacts', async (req, res) => {
  try {
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    logger.error(error); // Логування помилок
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
});

// Отримання контакту за ID
app.get('/contacts/:contactId', async (req, res) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (contact) {
      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${req.params.contactId}!`,
        data: contact,
      });
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    logger.error(error); // Логування помилок
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
});

// Функція для налаштування сервера
export function setupServer() {
  try {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}
