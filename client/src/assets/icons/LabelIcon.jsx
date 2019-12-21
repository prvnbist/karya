import React from 'react'

const LabelIcon = ({ size = 17, color = '#BAC0CF' }) => (
   <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
   >
      <path
         d="M10.6992 6.95307L6.95829 10.694C6.86138 10.791 6.74629 10.8679 6.61962 10.9205C6.49294 10.973 6.35716 11 6.22003 11C6.0829 11 5.94711 10.973 5.82043 10.9205C5.69376 10.8679 5.57867 10.791 5.48176 10.694L1 6.21742V1H6.21742L10.6992 5.48176C10.8935 5.67727 11.0026 5.94174 11.0026 6.21742C11.0026 6.49309 10.8935 6.75756 10.6992 6.95307V6.95307Z"
         stroke={color}
         strokeLinecap="round"
         strokeLinejoin="round"
      />
      <circle cx="3.86959" cy="3.86959" r="0.782613" fill={color} />
   </svg>
)

export default LabelIcon
