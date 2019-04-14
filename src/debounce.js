const debounce = (f, time) => {
  let timer = null;
  return function() {
    f = f.bind(this);
    if (timer === null) {
      f(...arguments);
      timer = setTimeout(() => {
        timer = null;
      }, time);
    }
  };
};
export default debounce;
