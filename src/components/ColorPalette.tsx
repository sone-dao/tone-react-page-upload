type ColorPaletteProps = {
  artColors: string[]
}

export default function ColorPalette({ artColors }: ColorPaletteProps) {
  return (
    <div className="flex flex-col bg-global-flipped text-global-flipped w-full rounded-xl my-4 p-2">
      <p className="font-content text-sm mb-2">
        We've gathered these colors from the art you've uploaded. Click/tap to
        copy it's hex code.
      </p>
      <p className="font-content text-sm">
        <i className="fa-solid fa-triangle-exclamation mr-1" />
        Some of these colors may fall out of the accessible color boundary for
        Tone and may have to be slightly adjusted using the color picker.
      </p>
      <div className="flex flex-wrap justify-around w-full">
        {artColors.map((color, i) => (
          <div
            key={i}
            className="w-12 h-12 cursor-pointer my-2 rounded-xl border-2 border-global-flipped"
            style={{ backgroundColor: color }}
            onClick={() => navigator.clipboard.writeText(color)}
          />
        ))}
      </div>
    </div>
  )
}
