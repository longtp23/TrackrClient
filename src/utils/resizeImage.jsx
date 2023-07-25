export const resize640 = (img) => {
  if (img && img.includes("rawg.io")) {
    return img.replace("/games/", "/resize/640/-/games/");
  }
  return img;
};
export const resize200 = (img) => {
  if (img && img.includes("rawg.io")) {
    return img.replace("/games/", "/resize/200/-/games/");
  }
  return img;
};

export const resize200Detail = (img) => {
  if (img && img.includes("rawg.io")) {
    return img.replace("/media/", "/media/resize/200/-/");
  }
  return img;
};
export const resize640Detail = (img) => {
  if (img && img.includes("rawg.io")) {
    return img.replace("/media/", "/media/resize/640/-/");
  }
  return img;
};
export const resize1280Detail = (img) => {
  if (img && img.includes("rawg.io")) {
    return img.replace("/media/", "/media/resize/1280/-/");
  }
  return img;
};
