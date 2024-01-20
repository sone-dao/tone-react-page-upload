type ColorPaletteProps = {
  artColors: string[]
}

export default function ColorPalette({ artColors }: ColorPaletteProps) {
  return (
    <div className="flex flex-wrap justify-around w-full">
      {artColors.map((color, i) => (
        <div
          key={i}
          className="w-[3rem] h-[3rem] cursor-pointer my-2"
          style={{ backgroundColor: color }}
          onClick={() => navigator.clipboard.writeText(color)}
        />
      ))}
    </div>
  )
}
