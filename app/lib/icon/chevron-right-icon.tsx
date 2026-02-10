import * as React from "react"

export interface ChevronRightIconProps extends React.SVGProps<SVGSVGElement> {
  width?: number
  height?: number
  color?: string
}

function ChevronRightIcon(iconProps: ChevronRightIconProps) {
  const { width = 7, height = 11, color = "#fff", ...svgProps } = iconProps
  return (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    {...svgProps}
  >
    <path
      fill={color}
      d="M.29 10.246a1 1 0 0 1 0-1.41l3.54-3.59-3.54-3.54A1 1 0 1 1 1.71.296l4.24 4.24a1 1 0 0 1 0 1.42l-4.24 4.29a1 1 0 0 1-1.42 0Z"
    />
  </svg>
  )
}

export default ChevronRightIcon
