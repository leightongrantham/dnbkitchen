const Tabs = {
  elem: document.querySelector('#js-tabs'),
  item: document.querySelectorAll('[data-tab-item]'),
  btn: document.querySelectorAll('[data-tab-target]'),

  init() {
    this.render();
  },

  handleClickEvent() {
    const target = this.getAttribute('data-tab-target');
    const active = document.querySelector(`[data-tab-item="${target}"]`);

    Tabs.removeActiveClass(Tabs.btn);
    Tabs.updateCurrentTab(active);

    this.classList.add('is-active');
  },

  updateCurrentTab(item) {
    Tabs.removeActiveClass(Tabs.item);

    item.classList.add('is-active');
  },

  removeActiveClass(elem) {
    for (let i = 0; i < elem.length; i += 1) {
      if (elem[i].classList.contains('is-active')) {
        elem[i].classList.remove('is-active');
      }
    }
  },

  render() {
    if (!this.elem) {
      return;
    }

    for (let i = 0; i < this.btn.length; i += 1) {
      this.btn[i].addEventListener('click', this.handleClickEvent, false);
    }
  }
};

export default Tabs;
