const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  });
}, { threshold: 0.1 });
reveals.forEach(el => io.observe(el));

let selected = null;
let step = 1;

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
  selectedOption = value; 
  document.getElementById('btnSend').disabled = false;
}

function sendSelection() {
  if (step === 1) {
    step = 2;
    document.getElementById('modal-options-wrap').style.display = 'none';
    document.getElementById('modalStep2').style.display = 'block';
    document.getElementById('btnSend').textContent = 'Enviar por WhatsApp →';
    document.getElementById('btnSend').disabled = false;
  } else {
    const nameEl    = document.getElementById('clientName');
    const messageEl = document.getElementById('clientMessage');

    // Limpiar errores previos
    [nameEl, messageEl].forEach(el => {
      const prev = el.nextElementSibling;
      if (prev && prev.classList.contains('field-error')) prev.remove();
    });

    let valid = true;

    function showError(el, msg) {
      el.style.borderColor = '#ef4444';
      const err = document.createElement('p');
      err.className = 'field-error';
      err.textContent = msg;
      err.style.cssText = 'color:#ef4444;font-size:.75rem;margin:-4px 0 8px 4px;font-family:var(--mono)';
      el.insertAdjacentElement('afterend', err);
      valid = false;
    }

    if (!nameEl.value.trim())                      showError(nameEl, 'El nombre es requerido');
    if (!messageEl.value.trim())                   showError(messageEl, 'El mensaje es requerido');

    if (!valid) return;

    // Etiquetas legibles para cada opción
    const opcionLabels = {
      'wordpress':        'Desarrollo Web Frontend',
      'frontend-backend': 'Proyectos IoT y Hardware',
      'fullstack':        'Prácticas y Pasantías'
    };

    const opcionElegida = opcionLabels[selectedOption] || 'un proyecto';
    const nombre  = nameEl.value.trim();
    const mensaje = messageEl.value.trim();

    const texto = `Hola Christián, soy ${nombre}. Me interesa colaborar en un proyecto de ${opcionElegida}. Mensaje: ${mensaje}`;
    const url   = `https://wa.me/56964903261?text=${encodeURIComponent(texto)}`;

    const link = document.createElement('a');
    link.href   = url;
    link.target = '_blank';
    link.rel    = 'noopener noreferrer';
    link.click();

    closeModal();
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3200);
  }
}

function openCasinoModal() {
  document.getElementById('casinoOverlay').classList.add('open');
}

function closeCasinoModal(e) {
  if (e && e.target !== document.getElementById('casinoOverlay')) return;
  document.getElementById('casinoOverlay').classList.remove('open');
}


function openCert(src) {
  const isImage = /\.(png|jpg|jpeg|webp)$/i.test(src);
  const frame = document.getElementById('certFrame');
  const img = document.getElementById('certImage');

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
  if (e.target === document.getElementById('certOverlay')) closeCert();
}


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



document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
    closeCert();
    closeDemo();
  }
});
function toggleDark() {
  const isDark = document.body.classList.toggle('dark');
  document.getElementById('darkIcon').textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Recordar preferencia al cargar
(function () {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (saved === 'dark' || (!saved && prefersDark)) {
    document.body.classList.add('dark');
    document.getElementById('darkIcon').textContent = '☀️';
  }
})();