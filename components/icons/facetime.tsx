// Create inline SVG components for critical icons

export function FaceTime() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" className="w-full h-full">
      <linearGradient
        id="facetime-gradient"
        x1="-137.5424"
        x2="-133.9618"
        y1="785.878"
        y2="197.7213"
        gradientTransform="matrix(1 0 0 -1 435.7924 798.4074)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#5df777" />
        <stop offset="1" stopColor="#0abc28" />
      </linearGradient>
      <path
        fill="url(#facetime-gradient)"
        d="M137.7 0h324.6C538.6 0 600 61.4 600 137.7v324.6c0 76.3-61.4 137.7-137.7 137.7H137.7C61.4 600 0 538.6 0 462.3V137.7C0 61.4 61.4 0 137.7 0z"
      />
      <path
        fill="#fff"
        d="M91.5 227.3v146.1c0 31.9 25.9 57.7 57.7 57.7H325c31.9 0 57.7-25.9 57.7-57.7V227.3c0-31.9-25.9-57.7-57.7-57.7H149.3c-31.9-.1-57.8 25.8-57.8 57.7zm379.3-39.1-66.2 54.6c-5.9 4.9-9.3 12.1-9.3 19.7v75.6c0 7.6 3.3 14.7 9.1 19.6l66.2 55.6c15.1 12.6 38 1.9 38-17.7V206c.1-19.5-22.7-30.3-37.8-17.8z"
      />
    </svg>
  )
}
