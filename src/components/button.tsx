interface ButtonProp extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  bgColor?: "orange" | "gray" | "red"
  size?: "sm" | "md" | "lg" | "icon"
}

export const Button = ({
  children,
  bgColor = "orange",
  size = "md",
  ...rest
}: ButtonProp) => {
  const btnColor = {
    gray: `bg-gray-900`,
    orange: "bg-orange-500",
    red: "bg-red-500",
  }
  const btnSize = {
    sm: "py-1 px-2 text-sm",
    md: "py-1 px-4 text-base",
    lg: "py-2 px-6 text-lg",
    icon: "py-2.5 px-2.5 text-base",
  }

  return (
    <button
      className={`${btnColor[bgColor]} ${btnSize[size]} text-white font-semibold ml-2 text-base hover:bg-amber-400 rounded`}
      {...rest}
    >
      {children}
    </button>
  )
}
