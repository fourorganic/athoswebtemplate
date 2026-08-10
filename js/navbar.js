// Shared navbar component, injected into #site-navbar on every page.
(function () {
  var PRODUCTS = [
    { slug: 'acido-hipocloroso', label: 'Bruma Facial HOCl' },
    { slug: 'extracto-curcuma', label: 'Extracto de Cúrcuma' },
    { slug: 'desodorante-cardamomo', label: 'Desodorante de Cardamomo' },
    { slug: 'protector-solar-tonka', label: 'Protector Solar de Tonka' },
    { slug: 'champu-moringa', label: 'Champú de Moringa' },
    { slug: 'jabon-achiote', label: 'Jabón de Achiote' },
    { slug: 'mascarilla-aguacate', label: 'Mascarilla de Aguacate' },
    { slug: 'manteca-cerdo-achiotada', label: 'Manteca de Cerdo Achiotada' },
  ];

  var path = window.location.pathname;
  var isProductPage = /\/productos\//.test(path);
  var isProductosList = !isProductPage && /\/productos\.html$/.test(path);
  var isIndex = !isProductPage && !isProductosList;
  var currentSlug = isProductPage
    ? path.replace(/^.*\//, '').replace(/\.html$/, '')
    : null;

  var prefix = isProductPage ? '../' : '';
  var home = isIndex ? '#top' : prefix + 'index.html#top';
  var contacto = isIndex ? '#cta-final' : prefix + 'index.html#cta-final';
  var productos = prefix + 'productos.html';
  var logo = prefix + 'assets/4midable-logo-white.png';
  var productHref = function (slug) {
    return isProductPage ? slug + '.html' : 'productos/' + slug + '.html';
  };

  var dropdownActive = isProductPage || isProductosList ? ' active' : '';
  var verTodosActive = isProductosList ? ' active' : '';

  var items = PRODUCTS.map(function (p) {
    var active = currentSlug === p.slug ? ' active' : '';
    return (
      '<li><a class="dropdown-item' +
      active +
      '" href="' +
      productHref(p.slug) +
      '">' +
      p.label +
      '</a></li>'
    );
  }).join('');

  var html =
    '' +
    '<div class="container container-narrow py-2">' +
    '<a class="navbar-brand" href="' +
    home +
    '"><img src="' +
    logo +
    '" alt="Fourmidable" class="navbar-logo"></a>' +
    '<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">' +
    '<span class="navbar-toggler-icon"></span>' +
    '</button>' +
    '<div id="nav" class="collapse navbar-collapse">' +
    '<ul class="navbar-nav ms-auto align-items-lg-center gap-lg-2">' +
    '<li class="nav-item dropdown">' +
    '<a class="nav-link dropdown-toggle' +
    dropdownActive +
    '" href="' +
    productos +
    '" id="productosDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Productos</a>' +
    '<ul class="dropdown-menu dropdown-menu-end shadow-sm" aria-labelledby="productosDropdown">' +
    items +
    '<li><hr class="dropdown-divider"></li>' +
    '<li><a class="dropdown-item fw-semibold' +
    verTodosActive +
    '" href="' +
    productos +
    '">Ver todos los productos</a></li>' +
    '</ul>' +
    '</li>' +
    '<li class="nav-item"><a class="nav-link" href="https://www.arckia.com" target="_blank" rel="noopener">Nutracéuticos</a></li>' +
    '<li class="nav-item"><a class="nav-link" href="' +
    contacto +
    '">Contacto</a></li>' +
    '<li class="nav-item ms-lg-2">' +
    '<a class="btn btn-accent btn-sm px-3" href="https://wa.me/573158927862" target="_blank" rel="noopener"><i class="bi bi-whatsapp me-1"></i>Escríbenos</a>' +
    '</li>' +
    '</ul>' +
    '</div>' +
    '</div>';

  function mount() {
    var target = document.getElementById('site-navbar');
    if (!target) return;
    target.innerHTML = html;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
