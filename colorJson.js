// based on https://github.com/zvakanaka/color-json

// https://stackoverflow.com/a/28938235/104522
const colors = {
  separator: "\x1b[1m",
  string: "\x1b[0;92m",
  number: "\x1b[0m",
  boolean: "\x1b[1m",
  null: "\x1b[1;31m",
  key: "\x1b[34;1m",
};
const RESET = "\x1b[0m";

export default function (jsonObj, spacing = 2) {
  const json = JSON.stringify(jsonObj, undefined, spacing);
  return (
    colors.separator +
    json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      function (match) {
        let colorCode = "number";
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            colorCode = "key";
            match = match.substr(0, match.length - 1);
          } else colorCode = "string";
        } else if (/true|false/.test(match)) colorCode = "boolean";
        else if (/null/.test(match)) colorCode = "null";
        const color = colors[colorCode] || "";
        return `${color}${match}${RESET}${colors.separator}${
          colorCode === "key" ? ":" : ""
        }`;
      }
    ) +
    RESET
  );
}
