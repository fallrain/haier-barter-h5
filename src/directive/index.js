export default {
  resetInput: {
    // 当被绑定的元素插入到 DOM 中时
    inserted(el) {
      let inputEls;
      if (!['INPUT'].includes(el.nodeName)) {
        inputEls = el.getElementsByTagName('input');
      } else {
        inputEls = [el];
      }
      if (!inputEls.length) {
        return;
      }
      const isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1; // android终端
      if (isAndroid) {
        return;
      }
      inputEls[0].addEventListener('blur', () => {
        let input = document.getElementById('reset-input');
        if (!input) {
          input = document.createElement('INPUT');
          input.type = 'text';
          input.style.height = '0px';
          input.style.width = '0px';
          input.style.position = 'absolute';
          input.id = 'reset-input';
          document.body.prepend(input);
        }

        input.focus();
        input.blur();
        window.scrollTo(0, 0);
      });
    }
  },
  noSpace: {
    bind(el) {
      let typing = false;
      let trigger = false;
      el.addEventListener('input', (e) => {
        if (trigger) {
          trigger = false;
          return;
        }
        // const dom = e.currentTarget;
        // const tag = dom.getAttribute('data-hb-filter-no-space-tag');
        if (!typing) {
          const val = e.currentTarget.value;
          e.currentTarget.value = val.trim();
          trigger = true;
          const event = new Event('input');
          e.currentTarget.dispatchEvent(event);
        }
      });
      el.addEventListener('compositionstart', () => {
        typing = true;
      });
      el.addEventListener('compositionend', () => {
        typing = false;
      });
    }
  }
};
