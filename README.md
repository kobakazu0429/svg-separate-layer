# svg-separate-layer

## What

this cli is separated a svg file to files of each layers.

in this case) layer is treat of <g> in directory below of <svg>.

And, filename is id (e.g. <g id="foo"> => foo.svg)

```xml
<svg>
  <g id="foo">   // ← Layer is true
    <path>...</path>
  </g>
  <g id="bar">   // ← Layer is true
    <g id="foo"> // ← Layer is false
      <path>...</path>
    </g>
  </g>
</svg>
```

## Usage

```bash
% npx github:kobakazu0429/svg-separate-layer svg-separate-layer /path/to/input.svg path/to/output_dir/
```
