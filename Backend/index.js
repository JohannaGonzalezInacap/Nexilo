// index.js
import express from "express";
import cors from "cors";
import mercadopago from "mercadopago";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

// Crear el endpoint de pago
app.post("/crear-pago", async (req, res) => {
  try {
    const { servicio, precio } = req.body;

    const preference = {
      items: [
        {
          title: servicio,
          unit_price: precio,
          quantity: 1
        }
      ],
      back_urls: {
        success: "https://tusitio.cl/exito",
        failure: "https://tusitio.cl/error",
        pending: "https://tusitio.cl/pendiente"
      },
      auto_return: "approved"
    };

    const response = await mercadopago.preferences.create(preference);
    res.json({ init_point: response.body.init_point });
  } catch (error) {
    res.status(500).json({ error: "Error al crear pago" });
  }
});
