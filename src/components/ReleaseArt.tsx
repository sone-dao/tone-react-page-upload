import { Chip } from '@sone-dao/tone-react-core-ui'
import { useEffect, useState } from 'react'
import { UploadRelease } from '../types'
import AlbumArt from './AlbumArt'

type ReleaseArtProps = {
  release: UploadRelease
  setReleaseProperty: Function
  artColors: string[]
  setArtColors: Function
}

const artTypes = [
  { type: 'cover', display: 'cover' },
  { type: 'back', display: 'back' },
  { type: 'gatefold', display: 'gatefold' },
  { type: 'insert', display: 'insert' },
  { type: 'jcard', display: 'jcard' },
]

export default function ReleaseArt({
  release,
  setReleaseProperty,
  artColors,
  setArtColors,
}: ReleaseArtProps) {
  const [selected, setSelected] = useState<string>('cover')

  useEffect(() => {
    for (const type in release.art) {
      const colors = release.art[type].colors || []

      setArtColors([...artColors, ...colors])
    }
  }, [release.art])

  const image = release.art[selected]?.dataURL

  return (
    <div className="w-full flex flex-col items-center">
      <AlbumArt image={image} />
      <div className="w-full flex justify-center my-4">
        {artTypes.map((entry, i) => {
          const variant =
            selected == entry.type
              ? 'solid'
              : release.art[entry.type]
              ? 'faded'
              : 'bordered'

          return (
            <Chip
              key={i}
              className="mx-2 cursor-pointer"
              variant={variant}
              onClick={() => setSelected(entry.type)}
            >
              {entry.display}
            </Chip>
          )
        })}
      </div>
    </div>
  )
}
