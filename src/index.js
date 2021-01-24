const path = require("path");
const fs = require("fs").promises;
const { parse } = require("svg-parser");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

function builder(metadata, properties, content) {
  return [
    metadata,
    `<svg ${Object.entries(properties)
      .map(([key, value]) => `${key}="${value}"`)
      .join(" ")}>`,
    content,
    `</svg>`,
  ].join("\n");
}

(async () => {
  const [inputFile, outputDir] = process.argv.slice(-2);
  console.log("input  file\t:", inputFile);
  console.log("==========================================");

  const svg = await fs.readFile(inputFile, "utf-8");

  const parsed = parse(svg).children[0];
  const dom = new JSDOM(svg);

  const layers = Array.from(
    dom.window.document.querySelector("svg").children
  ).map((g) => ({
    id: g.id,
    content: g.outerHTML,
  }));

  await Promise.all(
    layers.map(({ id, content }, i) => {
      const data = builder(parsed.metadata, parsed.properties, content);
      const outputFilePath = path.resolve(__dirname, outputDir, `${id}.svg`);
      console.log(`output file(${i++})\t:`, outputFilePath);
      return fs.writeFile(outputFilePath, data, "utf-8");
    })
  );
})();
