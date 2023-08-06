import { useState } from 'react'
import styles from './ReleaseArtwork.module.scss'

interface IColorBarProps {
  colors: string[]
}

export default function ColorBar({ colors }: IColorBarProps) {
  const [copiedColor, setCopiedColor] = useState<string>('')

  const bucketColor = copiedColor ? copiedColor : 'rgba(0,0,0,0.75)'

  return (
    <div className={styles.colorBar}>
      <i
        className="fa-fw fa-sharp fa-regular fa-fill-drip"
        style={{ color: bucketColor }}
      />
      {colors.map((color: string, i: number) => (
        <span
          key={i}
          style={{ backgroundColor: color }}
          onClick={() => copyColorToClipboard(color)}
        />
      ))}
    </div>
  )

  async function copyColorToClipboard(color: string) {
    navigator.clipboard.writeText(color)
    setCopiedColor(color)
  }
}
