// Shared footer component, injected into #site-footer on every page.
(function () {
  var path = window.location.pathname;
  var isProductPage = /\/productos\//.test(path);
  var isIndex = !isProductPage && /(^|\/)(index\.html)?$/.test(path);

  var home = isIndex
    ? '#top'
    : isProductPage
      ? '../index.html#top'
      : 'index.html#top';
  var contacto = isIndex
    ? '#cta-final'
    : isProductPage
      ? '../index.html#cta-final'
      : 'index.html#cta-final';
  var productos = isProductPage ? '../productos.html' : 'productos.html';
  var prod = isProductPage ? '' : 'productos/';
  var logo = isProductPage ? '../assets/4midable-logo-white.png' : 'assets/4midable-logo-white.png';

  var html =
    '' +
    '<div class="container container-narrow">' +
    '<div class="row gy-4">' +
    '<div class="col-lg-4">' +
    '<a class="footer-brand d-inline-block mb-3" href="' +
    home +
    '"><img src="' +
    logo +
    '" alt="Fourmidable" class="footer-logo"></a>' +
    '<p class="footer-tagline mb-3">Cuidado orgánico. Máximo 4 ingredientes.<br>Sin ultraprocesados.</p>' +
    '<div class="d-flex gap-3 footer-social">' +
    '<a href="https://wa.me/573158927862" target="_blank" rel="noopener" aria-label="WhatsApp"><i class="bi bi-whatsapp"></i></a>' +
    '<a href="https://instagram.com/fourmidable.co" target="_blank" rel="noopener" aria-label="Instagram"><i class="bi bi-instagram"></i></a>' +
    '<a href="mailto:hola@fourmidable.co" aria-label="Correo"><i class="bi bi-envelope"></i></a>' +
    '</div>' +
    '</div>' +
    '<div class="col-6 col-lg-2">' +
    '<h6 class="footer-heading">Explorar</h6>' +
    '<ul class="list-unstyled footer-links">' +
    '<li><a href="' +
    home +
    '">Inicio</a></li>' +
    '<li><a href="' +
    productos +
    '">Productos</a></li>' +
    '<li><a href="' +
    contacto +
    '">Contacto</a></li>' +
    '</ul>' +
    '</div>' +
    '<div class="col-6 col-lg-3">' +
    '<h6 class="footer-heading">Productos destacados</h6>' +
    '<ul class="list-unstyled footer-links">' +
    '<li><a href="' +
    prod +
    'acido-hipocloroso.html">Bruma Facial HOCl</a></li>' +
    '<li><a href="' +
    prod +
    'extracto-curcuma.html">Extracto de Cúrcuma</a></li>' +
    '<li><a href="' +
    prod +
    'protector-solar-tonka.html">Protector Solar de Tonka</a></li>' +
    '</ul>' +
    '</div>' +
    '<div class="col-lg-3">' +
    '<h6 class="footer-heading">Contacto</h6>' +
    '<ul class="list-unstyled footer-links">' +
    '<li><i class="bi bi-whatsapp me-2"></i><a href="https://wa.me/573158927862" target="_blank" rel="noopener">+57 315 892 7862</a></li>' +
    '<li><i class="bi bi-envelope me-2"></i><a href="mailto:info@fourmidable.co">info@fourmidable.co</a></li>' +
    '<li><i class="bi bi-geo-alt me-2"></i>Colombia</li>' +
    '</ul>' +
    '</div>' +
    '</div>' +
    '<hr class="footer-divider">' +
    '<div class="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2">' +
    '<p class="mb-0 footer-copy">&copy; <span id="year"></span> Fourmidable. Todos los derechos reservados.</p>' +
    '<p class="mb-0 footer-copy">Hecho con ingredientes orgánicos.</p>' +
    '</div>' +
    '</div>';

  function mount() {
    var target = document.getElementById('site-footer');
    if (!target) return;
    target.innerHTML = html;
    document.getElementById('year').textContent = new Date().getFullYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
