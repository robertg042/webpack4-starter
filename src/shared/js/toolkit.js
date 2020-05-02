export const sayHi = function(name, page) {
  const greeting = `Hi, ${name}! Page '${page}' is working!`
  console.log(`%c ${greeting}`,"background-color: #000000; color: #ffffff; padding: 3px 8px 3px 8px;")
  const greetingElement = document.querySelector('.greeting');
  if (greetingElement) {
    greetingElement.textContent = greeting;
  }

  if (module.hot) {
    module.hot.accept();
  }
};

export const id = id => document.getElementById(id);
export const qs = sel => document.querySelector(sel);
export const qsa = sel => [].slice.call(document.querySelectorAll(sel));
