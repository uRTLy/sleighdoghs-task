export default function limitTo(text, characters) {
  if (text.length >= characters) {
    return text.slice(0, characters);
  }
  return text;
}
