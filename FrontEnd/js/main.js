////Conexion con el Backend//////


fetch("https://tubackend.com/crear-pago", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    servicio: "Instalación CCTV",
    precio: 50000
  })
})
.then(res => res.json())
.then(data => {
  window.location.href = data.init_point;
});
