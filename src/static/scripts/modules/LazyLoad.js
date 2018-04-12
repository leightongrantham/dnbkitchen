class LazyLoad {
  constructor({ root, rootMargin, threshold }) {
    this.root = root;
    this.options = {
      rootMargin,
      threshold
    };
  }

  fadeIn(entries) {
    entries.forEach((entry) => {
      const ratio = entry.intersectionRatio;
      const img = entry.target;
      if (ratio === 1) {
        img.setAttribute('src', img.getAttribute('data-src'));
        img.onload = () => {
          img.style.opacity = 1;
        };
      }
    });
  }

  render() {
    if (!this.root.length > 0) {
      return;
    }

    const observer = new IntersectionObserver(this.fadeIn, this.options);
    this.root.forEach(target => observer.observe(target));
  }
}

export default LazyLoad;
