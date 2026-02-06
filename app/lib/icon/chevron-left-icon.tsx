import * as React from "react"

export interface ChevronLeftIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number
  height?: number
  color?: string
}

/** Same path as right chevron, mirrored so the point faces left */
const RIGHT_CHEVRON_PATH =
  "M.29 10.246a1 1 0 0 1 0-1.41l3.54-3.59-3.54-3.54A1 1 0 1 1 1.71.296l4.24 4.24a1 1 0 0 1 0 1.42l-4.24 4.29a1 1 0 0 1-1.42 0Z"

function ChevronLeftIcon(iconProps: ChevronLeftIconProps) {
  const { width = 7, height = 11, color = "#fff", fill, ...svgProps } = iconProps
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill={fill ?? "none"}
      {...svgProps}
    >
      <path
        fill={color}
        d={RIGHT_CHEVRON_PATH}
        transform="scale(-1, 1)"
        style={{ transformOrigin: "3px 5.5px" }}
      />
    </svg>
  )
}

export default ChevronLeftIcon
