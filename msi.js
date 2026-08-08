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
  document.getElementById('btnSend').textContent = t('modal.continue');
  document.getElementById('modalStep2').style.display = 'none';
  document.getElementById('modal-options-wrap').style.display = 'flex';
  document.getElementById('clientName').value = '';
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
    document.getElementById('btnSend').textContent = t('modal.sendwhatsapp');
    document.getElementById('btnSend').disabled = false;
  } else {
    const nameEl    = document.getElementById('clientName');
    const messageEl = document.getElementById('clientMessage');

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

    if (!nameEl.value.trim())    showError(nameEl, t('modal.error.name'));
    if (!messageEl.value.trim()) showError(messageEl, t('modal.error.message'));

    if (!valid) return;

    const opcionLabels = {
      'wordpress':        t('modal.opt1.title'),
      'frontend-backend': t('modal.opt2.title'),
      'fullstack':        t('modal.opt3.title')
    };

    const opcionElegida = opcionLabels[selectedOption] || t('modal.opt.fallback');
    const nombre  = nameEl.value.trim();
    const mensaje = messageEl.value.trim();

    const texto = t('modal.whatsapp.template')
      .replace('{nombre}', nombre)
      .replace('{opcion}', opcionElegida)
      .replace('{mensaje}', mensaje);
    const url   = `https://wa.me/56964903261?text=${encodeURIComponent(texto)}`;

    const link = document.createElement('a');
    link.href   = url;
    link.target = '_blank';
    link.rel    = 'noopener noreferrer';
    link.click();

    closeModal();
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
  const download = document.getElementById('certDownload');

  if (isImage) {
    frame.style.display = 'none';
    img.src = src;
    img.style.display = 'block';
  } else {
    img.style.display = 'none';
    frame.src = src;
    frame.style.display = 'block';
  }

  if (download) {
    download.href = src;
    download.setAttribute('download', src.split('/').pop());
    download.style.display = isImage ? 'flex' : 'none';
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

function toggleExtra(area, btn) {
  const extra = document.getElementById('extra-' + area);
  const isOpen = extra.classList.contains('open');
  extra.classList.toggle('open');
  btn.classList.toggle('open');
  const label = btn.querySelector('span:first-child');
  const keys = {
    'web':       'proyectos.web.vertodos',
    'iot':       'proyectos.iot.vertodos',
  };
  label.textContent = isOpen ? t(keys[area]) : t('proyectos.ocultar');
}