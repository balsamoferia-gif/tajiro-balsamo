/* ═══════════════════════════════════════════════════════════════════════════════
   TAJIRO — JS mínimo, sin dependencias.
   Todo lo de acá es mejora progresiva: sin JS la página funciona completa
   (la primera diapositiva se ve, el despiece aparece ya dibujado, los formularios
   usan la validación nativa del navegador).
   ═══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var menosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ── Año del pie ──────────────────────────────────────────────────────────── */
  var anio = document.querySelector('[data-anio]');
  if (anio) anio.textContent = String(new Date().getFullYear());

  /* ── Menú mobile ──────────────────────────────────────────────────────────── */
  var botonMenu = document.querySelector('.hamburguesa');
  var nav = document.getElementById('nav-principal');

  if (botonMenu && nav) {
    botonMenu.addEventListener('click', function () {
      var abierto = nav.classList.toggle('is-abierta');
      botonMenu.setAttribute('aria-expanded', String(abierto));
      botonMenu.querySelector('.visually-hidden').textContent = abierto ? 'Cerrar menú' : 'Abrir menú';
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('is-abierta');
        botonMenu.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-abierta')) {
        nav.classList.remove('is-abierta');
        botonMenu.setAttribute('aria-expanded', 'false');
        botonMenu.focus();
      }
    });
  }

  /* ── Buscador de aplicación ───────────────────────────────────────────────── */
  /* TODO: cuando se defina el acceso a InfoBal (DESIGN.md §7.7), reemplazar este
     scroll por la búsqueda real. Hasta entonces lleva a la sección de salida. */
  var buscador = document.querySelector('[data-buscador]');
  if (buscador) {
    buscador.addEventListener('submit', function (e) {
      e.preventDefault();
      var destino = document.getElementById('aplicacion');
      if (destino) {
        destino.scrollIntoView({ behavior: menosMovimiento.matches ? 'auto' : 'smooth' });
        var primerCampo = document.getElementById('f-vehiculo');
        if (primerCampo) window.setTimeout(function () { primerCampo.focus(); }, 600);
      }
    });
  }

  /* ── Carrusel del hero ────────────────────────────────────────────────────── */
  var pista = document.querySelector('[data-slider]');
  var contenedorPuntos = document.querySelector('[data-puntos]');

  if (pista && contenedorPuntos) {
    var diapos = Array.prototype.slice.call(pista.querySelectorAll('[data-diapo]'));

    if (diapos.length > 1) {
      var actual = 0;
      var reloj = null;
      var INTERVALO = 7000;

      var puntos = diapos.map(function (_, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('role', 'tab');
        b.setAttribute('aria-label', 'Diapositiva ' + (i + 1) + ' de ' + diapos.length);
        b.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
        b.addEventListener('click', function () { ir(i); reiniciar(); });
        contenedorPuntos.appendChild(b);
        return b;
      });

      function ir(i) {
        actual = (i + diapos.length) % diapos.length;
        diapos.forEach(function (d, n) {
          var activa = n === actual;
          d.classList.toggle('is-activa', activa);
          if (activa) { d.removeAttribute('hidden'); } else { d.setAttribute('hidden', ''); }
        });
        puntos.forEach(function (p, n) { p.setAttribute('aria-selected', String(n === actual)); });
      }

      function arrancar() {
        if (menosMovimiento.matches) return;
        reloj = window.setInterval(function () { ir(actual + 1); }, INTERVALO);
      }
      function frenar() { if (reloj) { window.clearInterval(reloj); reloj = null; } }
      function reiniciar() { frenar(); arrancar(); }

      // pausa al pasar el mouse, al enfocar con teclado y al cambiar de pestaña
      var hero = pista.closest('.hero') || pista;
      hero.addEventListener('mouseenter', frenar);
      hero.addEventListener('mouseleave', arrancar);
      hero.addEventListener('focusin', frenar);
      hero.addEventListener('focusout', function (e) {
        if (!hero.contains(e.relatedTarget)) arrancar();
      });
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) { frenar(); } else { arrancar(); }
      });

      contenedorPuntos.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
        e.preventDefault();
        var siguiente = (actual + (e.key === 'ArrowRight' ? 1 : -1) + diapos.length) % diapos.length;
        ir(siguiente);
        puntos[siguiente].focus();
        reiniciar();
      });

      ir(0);
      arrancar();
    } else {
      contenedorPuntos.remove();
    }
  }

  /* ── Despiece: se traza una sola vez al entrar en pantalla ────────────────── */
  var despiece = document.querySelector('[data-despiece]');

  if (despiece && 'IntersectionObserver' in window) {
    // sólo el contorno de las piezas se traza; el eje y las cotas quedan fijas
    var trazos = Array.prototype.slice.call(despiece.querySelectorAll('.pieza .trazo'));

    // Longitud real de cada trazo, para que el dibujo avance parejo.
    trazos.forEach(function (t) {
      var largo = 1200;
      if (typeof t.getTotalLength === 'function') {
        try { largo = Math.ceil(t.getTotalLength()) || 1200; } catch (err) { /* usa el default */ }
      }
      t.style.setProperty('--largo', largo);
    });

    document.documentElement.classList.add('js-despiece');

    var vigia = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        despiece.classList.add('is-dibujando');
        vigia.disconnect();
      });
    }, { threshold: 0.35 });

    vigia.observe(despiece);
  }

  /* ── Formularios ──────────────────────────────────────────────────────────── */
  /* TODO: conectar los endpoints reales antes de publicar. Por ahora validan en
     el cliente y confirman en la interfaz, sin enviar nada a ningún lado. */
  var MENSAJES = {
    vacio:  'Completá este campo para que el asesor pueda responderte.',
    email:  'Revisá el correo: falta el @ o el dominio.',
    check:  'Marcá la casilla para poder mandarte las novedades.'
  };

  function limpiarError(campo) {
    var aviso = campo.parentElement.querySelector('.campo__error');
    campo.removeAttribute('aria-invalid');
    if (aviso) { aviso.textContent = ''; aviso.hidden = true; }
  }

  function marcarError(campo, texto) {
    var aviso = campo.parentElement.querySelector('.campo__error');
    campo.setAttribute('aria-invalid', 'true');
    if (aviso) {
      aviso.textContent = texto;
      aviso.hidden = false;
      if (!aviso.id) aviso.id = 'err-' + (campo.id || Math.random().toString(36).slice(2));
      campo.setAttribute('aria-describedby', aviso.id);
    }
  }

  function validar(campo) {
    var valor = (campo.value || '').trim();
    if (campo.required && !valor) { marcarError(campo, MENSAJES.vacio); return false; }
    if (campo.type === 'email' && valor && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor)) {
      marcarError(campo, MENSAJES.email); return false;
    }
    limpiarError(campo);
    return true;
  }

  var formConsulta = document.querySelector('[data-form]');
  if (formConsulta) {
    var campos = Array.prototype.slice.call(formConsulta.querySelectorAll('input, textarea'));

    campos.forEach(function (campo) {
      campo.addEventListener('blur', function () { if (campo.value.trim()) validar(campo); });
      campo.addEventListener('input', function () { if (campo.getAttribute('aria-invalid')) validar(campo); });
    });

    formConsulta.addEventListener('submit', function (e) {
      e.preventDefault();
      var estado = formConsulta.querySelector('[data-estado]');
      var fallados = campos.filter(function (c) { return !validar(c); });

      if (fallados.length) {
        if (estado) estado.textContent = 'Faltan datos: revisá los campos marcados.';
        fallados[0].focus();
        return;
      }

      if (estado) estado.textContent = 'Listo. Un asesor te responde por email con la referencia que corresponde a tu Nissan.';
      formConsulta.reset();
      campos.forEach(limpiarError);
    });
  }

  var formNews = document.querySelector('[data-news]');
  if (formNews) {
    formNews.addEventListener('submit', function (e) {
      e.preventDefault();
      var estado = formNews.querySelector('[data-estado]');
      var email = formNews.querySelector('input[type="email"]');
      var check = formNews.querySelector('input[type="checkbox"]');
      var valor = (email.value || '').trim();

      if (!valor || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor)) {
        if (estado) estado.textContent = MENSAJES.email;
        email.setAttribute('aria-invalid', 'true');
        email.focus();
        return;
      }
      if (check && !check.checked) {
        if (estado) estado.textContent = MENSAJES.check;
        check.focus();
        return;
      }

      email.removeAttribute('aria-invalid');
      if (estado) estado.textContent = 'Anotado. Te vamos a escribir cuando haya novedades de la línea.';
      formNews.reset();
    });
  }
})();
