const truncate = (str, length) => {
  if (str.length > length) {
    if (length <= 3) {
      return `${str.slice(0, length - 3)} ...`;
    } else {
      return `${str.slice(0, length)} ...`;
    }
  } else {
    return str;
  }
};

export default truncate;
