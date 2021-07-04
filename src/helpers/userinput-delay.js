const debounceTextInput = (cb, delay) => {
  let timer;

  return function (...args) {
    const ctx = this;
    if (timer) {
      clearTimeout(timer);
      
    }

    timer = setTimeout(() => cb.apply(ctx, [...args]), delay);
  };
};

export { debounceTextInput };
