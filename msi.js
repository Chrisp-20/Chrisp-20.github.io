// ── Reveal scroll ──────────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  });
}, { threshold: 0.1 });
reveals.forEach(el => io.observe(el));

// ── Estado modal colaborar ─────────────────────────────────
let selected = null;
let step = 1;

const labels = {
  wordpress:          "Proyecto con WordPress",
  "frontend-backend": "Frontend o Backend",
  fullstack:          "Fullstack"
};

// ── Modal colaborar ────────────────────────────────────────
function openModal() {
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
  resetModal();
}

function resetModal() {
  document.querySelectorAll('.modal-option').forEach(o => o.classList.remove('selected'));
  selected = null;
  step = 1;
  document.getElementById('btnSend').disabled = true;
  document.getElementById('btnSend').textContent = 'Continuar →';
  document.getElementById('modalStep2').style.display = 'none';
  document.getElementById('modal-options-wrap').style.display = 'flex';
  document.getElementById('clientName').value = '';
  document.getElementById('clientEmail').value = '';
  document.getElementById('clientMessage').value = '';
}

function handleOverlayClick(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
}

function selectOption(el, value) {
  document.querySelectorAll('.modal-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  selected = value;
  document.getElementById('btnSend').disabled = false;
}

function sendSelection() {
  if (step === 1) {
    step = 2;
    document.getElementById('modal-options-wrap').style.display = 'none';
    document.getElementById('modalStep2').style.display = 'block';
    document.getElementById('btnSend').textContent = 'Enviar mensaje →';
    document.getElementById('btnSend').disabled = false;
  } else {
    const name    = document.getElementById('clientName').value.trim();
    const email   = document.getElementById('clientEmail').value.trim();
    const message = document.getElementById('clientMessage').value.trim();

    if (!name || !email || !message) {
      alert('Por favor completa todos los campos.');
      return;
    }

    // Por ahora simula el envío — cuando tengas EmailJS reemplaza esto
    closeModal();
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
  }
}

// ── Certificados ───────────────────────────────────────────

function openCert(src) {
  const isImage = /\.(png|jpg|jpeg|webp)$/i.test(src);
  const frame = document.getElementById('certFrame');
  const img   = document.getElementById('certImage');

  if (isImage) {
    frame.style.display = 'none';
    img.src = src;
    img.style.display = 'block';
  } else {
    img.style.display = 'none';
    frame.src = src;
    frame.style.display = 'block';
  }

  document.getElementById('certOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCert() {
  document.getElementById('certOverlay').classList.remove('open');
  document.getElementById('certFrame').src = '';
  document.getElementById('certImage').src = '';
  document.body.style.overflow = '';
}

function closeCertOverlay(e) {
  // Cierra solo si el clic fue en el fondo oscuro, no dentro del cert-box
  if (e.target === document.getElementById('certOverlay')) closeCert();
}

// ── Demo proyectos ─────────────────────────────────────────
function openDemo(url, title) {
  document.getElementById('demoFrame').src = url;
  document.getElementById('demoTitle').textContent = title;
  document.getElementById('demoOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDemo() {
  document.getElementById('demoOverlay').classList.remove('open');
  document.getElementById('demoFrame').src = '';
  document.body.style.overflow = '';
}

// ── Teclado ────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
    closeCert();
    closeDemo();
  }
});