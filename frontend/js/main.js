////Llamar al pago desde el frontend//////


fetch("/.netlify/functions/create-payment", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    servicio: "Plan Nexilo",
    monto: 19990,
  }),
})
.then(res => res.json())
.then(data => {
  window.location.href = data.init_point;
});

