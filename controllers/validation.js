const isValidMew = mew => {
  return (
    mew.name &&
    mew.name.toString().trim() !== "" &&
    mew.content &&
    mew.content.toString().trim() !== ""
  );
};

module.exports = {
  isValidMew: isValidMew
};
