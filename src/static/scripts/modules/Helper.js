const Helper = {
  grid: document.querySelector('[data-helper="grid"]'),

  init() {
    this.render();
  },

  toggleGridLayout() {
    if (!Helper.grid.classList.contains('dn')) {
      Helper.grid.classList.add('dn');
    } else {
      Helper.grid.classList.remove('dn');
    }
  },

  render() {
    if (!this.grid) {
      return;
    }

    document.addEventListener('keyup', (event) => {
      if (event.key === 'g') {
        Helper.toggleGridLayout();
      }
    });
  }
};

export default Helper;
