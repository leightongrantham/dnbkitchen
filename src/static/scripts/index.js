import Prism from 'prismjs';

// import Fetch from './containers/Fetch';
import Helper from './modules/Helper';
import LazyLoad from './modules/LazyLoad';
import Menu from './modules/Menu';
import Tabs from './modules/Tabs';

class App {
  constructor() {
    this.hostname = 'example.com';
    this.gaId = 'UA-123456-78';
    this.modules = [
      Helper, Menu, Tabs
    ];

    document.documentElement.className = 'js';

    // init all necessary modules
    this.modules.forEach((module) => {
      module.init();
    });

    const lazyLoad = new LazyLoad({
      root: document.querySelectorAll('[data-src]'),
      rootMargin: '0px 0px -50px 0px',
      threshold: 1
    });
    lazyLoad.render();

    this.loadAnalytics();

    // highlight code
    Prism.highlightAll();

    // WebFont.load({
    //   custom: {
    //     families: ['']
    //   }
    // });
  }

  loadAnalytics() {
    if (!this.gaId) {
      throw new Error('App missing gaId');
    }

    /* eslint-disable */
    if (window.location.hostname === this.hostname || window.location.hostname === `www.${this.hostname}`) {
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', this.gaId, 'auto');
      ga('send', 'pageview');
    }
    /* eslint-enable */
  }
}

window.addEventListener('load', () => new App());
