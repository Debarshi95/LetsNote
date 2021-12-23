const debounceTextInput = (cb, delay) => {
  let timer;
  // eslint-disable-next-line func-names
  return function (...args) {
    const ctx = this;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => cb.apply(ctx, args), delay);
  };
};

export default debounceTextInput;
