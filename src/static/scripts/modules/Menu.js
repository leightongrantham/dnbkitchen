import MoveTo from 'moveto';

const Menu = {
  elem: document.querySelectorAll('[data-nav-target]'),

  init() {
    this.render();
  },

  handleClick() {
    const target = this.getAttribute('data-nav-target');
    const section = document.querySelector(`[data-nav-section="${target}"]`);
    const moveTo = new MoveTo();
    moveTo.move(section);
    event.preventDefault();
  },

  render() {
    if (!this.elem.length) {
      return;
    }

    for (let i = 0; i < this.elem.length; i += 1) {
      this.elem[i].addEventListener('click', this.handleClick, false);
    }
  }
};

export default Menu;
