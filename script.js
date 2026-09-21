// ============================================================
// ⚠️  DATOS DE CONTACTO - CAMBIA ESTOS DOS VALORES
// ============================================================

// Número de WhatsApp (código de país + número, SIN espacios, SIN el signo +)

const WHATSAPP_NUMBER = '50237931301';

// Correo electrónico donde quieres recibir las solicitudes
const EMAIL_DESTINO = 'cristofer.andredeleon@gmail.com';

// ============================================================
//  No es necesario modificar nada debajo de esta línea
// ============================================================


// Toggle menú móvil
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('active');
}

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('active');
  });
});

// Establecer fecha mínima = hoy
const fechaInput = document.getElementById('fecha');
if (fechaInput) {
  fechaInput.min = new Date().toISOString().split('T')[0];
}

// ========== SCROLL REVEAL ==========
const observerOptions = {
  root: null,
  rootMargin: '0px 0px -80px 0px',
  threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      // Cuando sale de la pantalla (al subir), se oculta de nuevo
      entry.target.classList.remove('visible');
    }
  });
}, observerOptions);

// Observar todos los elementos con clase .reveal
document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});

// ========== FORMULARIO ==========
function getFormData() {
  return {
    nombre: document.getElementById('nombre').value.trim(),
    telefono: document.getElementById('telefono').value.trim(),
    email: document.getElementById('email').value.trim(),
    servicio: document.getElementById('servicio').value,
    fecha: document.getElementById('fecha').value,
    hora: document.getElementById('hora').value,
    notas: document.getElementById('notas').value.trim()
  };
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const [y, m, d] = dateStr.split('-');
  return `${d}/${m}/${y}`;
}

function buildMessage(data) {
  let msg = `Hola, me gustaría agendar una cita de belleza a domicilio.\n\n`;
  msg += `*Nombre:* ${data.nombre}\n`;
  msg += `*Teléfono:* ${data.telefono}\n`;
  msg += `*Correo:* ${data.email}\n`;
  msg += `*Servicio:* ${data.servicio}\n`;
  msg += `*Fecha preferida:* ${formatDate(data.fecha)}\n`;
  msg += `*Hora preferida:* ${data.hora}\n`;
  if (data.notas) msg += `*Notas:* ${data.notas}\n`;
  return msg;
}

// Enviar por WhatsApp
function handleSubmit(e) {
  e.preventDefault();
  const data = getFormData();
  
  if (!data.nombre || !data.telefono || !data.email || !data.servicio || !data.fecha || !data.hora) {
    alert('Por favor completa todos los campos obligatorios.');
    return false;
  }

  const message = encodeURIComponent(buildMessage(data));
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  window.open(url, '_blank');
  return false;
}

// Enviar por correo (mailto)
function sendByEmail() {
  const data = getFormData();
  
  if (!data.nombre || !data.telefono || !data.email || !data.servicio || !data.fecha || !data.hora) {
    alert('Por favor completa todos los campos obligatorios.');
    return;
  }

  const subject = encodeURIComponent(`Nueva solicitud de cita - ${data.nombre}`);
  let body = `Nueva solicitud de cita de belleza a domicilio:\n\n`;
  body += `Nombre: ${data.nombre}\n`;
  body += `Teléfono: ${data.telefono}\n`;
  body += `Correo: ${data.email}\n`;
  body += `Servicio: ${data.servicio}\n`;
  body += `Fecha preferida: ${formatDate(data.fecha)}\n`;
  body += `Hora preferida: ${data.hora}\n`;
  if (data.notas) body += `Notas: ${data.notas}\n`;

  const mailto = `mailto:${EMAIL_DESTINO}?subject=${subject}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
}
