const jsonToUrlEncoded = (jsonData) => {
  urlEncoded = [];

  for (key in jsonData) {
    let value = jsonData[key];
    urlEncoded.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
  }

  return urlEncoded.join("&");
};

module.exports = { jsonToUrlEncoded };
