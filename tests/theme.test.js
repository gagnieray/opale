// Run with npm test; no browser or test dependencies required.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const source = fs.readFileSync(require('node:path').join(__dirname, '../javascripts/theme.js'), 'utf8');

function page(saved, blocked = false, readyState = 'loading', lang = 'zh-TW', hasHeader = true) {
  const elements = [];
  let ready;
  const root = {
    lang,
    setAttribute(key, value) { this[key] = value; },
    getAttribute(key) { return this[key]; }
  };
  const host = {
    appendChild(button) { elements.push(button); }
  };
  const storage = {
    getItem(key) {
      assert.equal(key, 'opale-color-mode');
      if (blocked) throw Error('blocked');
      return saved;
    },
    setItem(key, value) {
      assert.equal(key, 'opale-color-mode');
      if (blocked) throw Error('blocked');
      saved = value;
    }
  };
  const context = vm.createContext({
    localStorage: storage,
    document: {
      documentElement: root,
      body: host,
      readyState,
      getElementById(id) {
        if (id === 'header') return hasHeader ? host : null;
        return elements.find(button => button.id === id);
      },
      createElement(tag) {
        assert.equal(tag, 'button');
        return {
          setAttribute: root.setAttribute,
          addEventListener(event, action) { this[event] = action; }
        };
      },
      addEventListener(event, action) {
        assert.equal(event, 'DOMContentLoaded');
        ready = action;
      }
    }
  });
  vm.runInContext(source, context);
  assert.equal(root['data-opale-color-mode'], !blocked && saved === 'dark' ? 'dark' : 'light');
  if (readyState === 'loading') {
    assert.equal(elements.length, 0);
    ready();
    ready(); // Mounting twice must not duplicate the button.
  }
  assert.equal(elements.length, 1);
  assert.equal(elements[0].type, 'button');
  return { root, button: elements[0], saved: () => saved };
}

const first = page(null);
assert.equal(first.button['aria-pressed'], 'false');
assert.equal(first.button['aria-label'], '暗色模式');
first.button.click();
assert.equal(first.root['data-opale-color-mode'], 'dark');
assert.equal(first.button['aria-pressed'], 'true');
assert.match(first.button.textContent, /亮色模式/);
assert.equal(first.saved(), 'dark');

const reload = page(first.saved(), false, 'complete');
assert.equal(reload.button['aria-pressed'], 'true');
reload.button.click();
assert.equal(reload.root['data-opale-color-mode'], 'light');
assert.equal(reload.saved(), 'light');
assert.equal(page(reload.saved()).button['aria-pressed'], 'false');
assert.equal(page('invalid').root['data-opale-color-mode'], 'light');

const unavailable = page('dark', true);
unavailable.button.click();
assert.equal(unavailable.root['data-opale-color-mode'], 'dark');
unavailable.button.click();
assert.equal(unavailable.root['data-opale-color-mode'], 'light');

const english = page(null, false, 'complete', 'en', false);
assert.equal(english.button['aria-label'], 'Dark mode');
assert.match(english.button.textContent, /Dark mode/);
english.button.click();
assert.match(english.button.textContent, /Light mode/);
console.log('PASS: restoration, toggle, persistence, blocked storage, DOM readiness, header fallback, localization, accessibility state.');
