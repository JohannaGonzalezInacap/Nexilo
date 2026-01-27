const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    const data = JSON.parse(event.body);

    const preference = {
      items: [
        {
          title: data.servicio,
          quantity: 1,
          currency_id: "CLP",
          unit_price: Number(data.monto),
        },
      ],
      back_urls: {
        success: "https://tusitio.netlify.app/exito",
        failure: "https://tusitio.netlify.app/error",
      },
      auto_return: "approved",
    };

    const response = await mercadopago.preferences.create(preference);

    return {
      statusCode: 200,
      body: JSON.stringify({
        init_point: response.body.init_point,
      }),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
