(function () {
      const root = document.querySelector('.pp-portfolio');
      if (!root) return;

      const viewport = root.querySelector('.pp-portfolio__viewport');
      const track = root.querySelector('.pp-portfolio__track');
      const slides = Array.from(root.querySelectorAll('.pp-portfolio__slide'));
      const prev = root.querySelector('.pp-portfolio__nav--prev');
      const next = root.querySelector('.pp-portfolio__nav--next');
      const pager = root.querySelector('.pp-portfolio__pager');

      // Build dots
      const dots = slides.map((_, i) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'pp-portfolio__dot';
        b.setAttribute('aria-label', `Go to slide ${i + 1}`);
        b.addEventListener('click', () => scrollToIndex(i));
        pager.appendChild(b);
        return b;
      });

      function stepSize() {
        if (slides.length < 2) return track.clientWidth;
        return Math.round(slides[1].offsetLeft - slides[0].offsetLeft);
      }

      function closestIndex() {
        const x = track.scrollLeft;
        let best = 0, bestDist = Infinity;
        for (let i = 0; i < slides.length; i++) {
          const d = Math.abs(slides[i].offsetLeft - x);
          if (d < bestDist) { bestDist = d; best = i; }
        }
        return best;
      }

      function setUI() {
        const idx = closestIndex();
        dots.forEach((d, i) => d.setAttribute('aria-current', i === idx ? 'true' : 'false'));

        const tol = 2;
        const max = track.scrollWidth - track.clientWidth;
        prev.disabled = track.scrollLeft <= tol;
        next.disabled = track.scrollLeft >= (max - tol);
      }

      function scrollToIndex(i) {
        track.scrollTo({ left: slides[i].offsetLeft, behavior: 'smooth' });
      }

      function scrollDir(dir) {
        const step = stepSize();
        track.scrollBy({ left: dir === 'next' ? step : -step, behavior: 'smooth' });
      }

      prev.addEventListener('click', () => scrollDir('prev'));
      next.addEventListener('click', () => scrollDir('next'));

      // Keyboard support
      viewport.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') scrollDir('prev');
        if (e.key === 'ArrowRight') scrollDir('next');
      });

      // Update on scroll/resize
      let raf = null;
      track.addEventListener('scroll', () => {
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(setUI);
      });
      window.addEventListener('resize', setUI);

      setUI();
    })();