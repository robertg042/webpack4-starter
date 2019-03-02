export const sayHello = caller => {
  console.log(
    `%c Hello from ${caller}`,
    'background-color: #002BFF; color: #ffffff; padding: 3px 8px 3px 8px;'
  );
};

export const add = (a, b) => {
  return a + b;
};
