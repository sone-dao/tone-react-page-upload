import Vibrant from 'node-vibrant'
import { useEffect, useState } from 'react'
import { IUploadRelease } from '../../UploadPage'
import ColorBar from './ColorBar'
import styles from './ReleaseArtwork.module.scss'

interface IArtworkDisplayProps {
  selected: number
  release: IUploadRelease
  setRelease: Function
}

export default function ArtworkDisplay({
  selected,
  release,
  setRelease,
}: IArtworkDisplayProps) {
  const [imageURL, setImageURL] = useState<string>('')
  const [colors, setColors] = useState<string[]>([])

  const types = ['cover', 'back', 'gatefold', 'vinyl', 'insert', 'tape']

  const type = types[selected]

  const i = type as keyof typeof release.artwork

  const artwork = release.artwork[i]

  useEffect(() => {
    if (artwork) {
      const array = new Uint8Array(artwork)

      const blob = new Blob([array])

      const blobURL = URL.createObjectURL(blob)

      setImageURL(blobURL)
    } else {
      setImageURL('')
    }
  }, [artwork])

  useEffect(() => {
    imageURL ? getColorsFromArt() : setColors([])
  }, [imageURL])

  useEffect(() => {
    console.log({ colors })
  }, [colors])

  return (
    <div className={styles.artworkDisplay}>
      {imageURL && <img src={imageURL} width="250" height="250" />}
      <ColorBar colors={colors} />
    </div>
  )

  async function getColorsFromArt() {
    const palette = await Vibrant.from(imageURL).getPalette()

    const colors = Object.keys(palette).map((key: string) => palette[key]?.hex)

    setColors(colors as string[])
  }
}
