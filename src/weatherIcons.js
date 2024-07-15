function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}

importAll(require.context('./icons', true, /\.(png|jpe?g|svg)$/));
