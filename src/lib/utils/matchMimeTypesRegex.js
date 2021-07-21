function matchMimeTypesRegex(fileType) {
  return /^(?<type>(application|audio|image|video))\/(?<ext>(.+))$/gi.exec(fileType)?.groups;
}

export default matchMimeTypesRegex;
