import * as React from "react"

const Arrow = (props) => (
  <svg
    id="Layer_1"
    data-name="Layer 1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 26.07 14.07"
    {...props}
  >
    <defs>
      <style>
        {
          "\n      .cls-1 {\n        fill: #fff;\n      }\n\n      .cls-1, .cls-3 {\n        fill-rule: evenodd;\n      }\n\n      .cls-2 {\n        mask: url(#mask);\n      }\n\n      .cls-3 {\n        fill: currentColor;\n      }\n\n      .cls-4 {\n        mask: url(#mask-2-2);\n      }\n    "
        }
      </style>
      <mask
        id="mask"
        x={0.07}
        y={0}
        width={26}
        height={14.07}
        maskUnits="userSpaceOnUse"
      >
        <g transform="translate(0.07 0)">
          <g id="mask-2">
            <polygon
              id="path-1"
              className="cls-1"
              points="0 0 26 0 26 14 0 14 0 0"
            />
          </g>
        </g>
      </mask>
      <mask
        id="mask-2-2"
        x={0}
        y={0}
        width={26.07}
        height={14}
        maskUnits="userSpaceOnUse"
      >
        <g transform="translate(0.07 0)">
          <g id="mask-2-3" data-name="mask-2">
            <polygon
              id="path-1-2"
              data-name="path-1"
              className="cls-1"
              points="0 0 26 0 26 14 0 14 0 0"
            />
          </g>
        </g>
      </mask>
    </defs>
    <g id="Symbols">
      <g id="button-solid-darkbg">
        <g id="arrow-icon-1">
          <g className="cls-2">
            <polyline
              id="Fill-1"
              className="cls-3"
              points="16.96 0 16.96 1.71 23.87 7.06 16.96 12.4 16.96 14.07 26.07 7.06 16.96 0"
            />
          </g>
          <g className="cls-4">
            <polygon
              id="Fill-3"
              className="cls-3"
              points="20.55 7.71 21.24 7.12 13.19 0.89 13.19 2.6 18.12 6.41 0 6.41 0 7.71 19.81 7.71 20.55 7.71"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
)

export default Arrow
