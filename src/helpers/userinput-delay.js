const debounceTextInput = (cb, delay) => {
  let timer;

  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => cb.apply(this, ...args), delay);
  };
};

export { debounceTextInput };
