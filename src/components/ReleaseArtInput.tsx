import { useEffect, useRef, useState } from 'react'
import { getColorsFromImage } from '../utils/art'
import { blobToDataURL } from '../utils/file'

type ReleaseArtInputProps = {
  art: Blob | null
  setArt: (releaseArt: Blob | null) => void
  artColors: string[]
  setArtColors: (artColors: string[]) => void
}

export default function ReleaseArtInput({
  art,
  setArt = () => {},
  artColors,
  setArtColors = () => {},
}: ReleaseArtInputProps) {
  const [dataURL, setDataURL] = useState<string>('')

  const inputElement = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setArt(art)

    art
      ? blobToDataURL(art).then((dataURL) => setDataURL(dataURL))
      : setDataURL('')
  }, [art])

  useEffect(() => {
    setArtColors(artColors)
  }, [artColors])

  return (
    <div className="mb-4">
      {dataURL ? (
        <>
          <img
            className="w-full h-auto aspect-square rounded-xl cursor-pointer"
            src={dataURL}
            onClick={() => setArt(null)}
          />
          <p className="bg-global-flipped font-content text-global-flipped text-sm p-1 w-full rounded-xl mt-2">
            <i className="fa-fw fa-solid fa-circle-info mx-1" />
            Click/tap on art to remove it from the release.
          </p>
        </>
      ) : (
        <div
          className="flex flex-col items-center justify-center w-full h-auto border-global border-2 border-dashed rounded-xl aspect-square cursor-pointer"
          onClick={() => inputElement.current?.click()}
        >
          <i className="fa-fw fa-sharp fa-solid fa-file-image text-5xl" />
          <span className="font-content mt-2">
            Click/tap to select an image for release art
          </span>
          <span className="font-content text-sm">
            (1000px x 1000px minimum)
          </span>
          <input
            className="hidden"
            type="file"
            ref={inputElement}
            onChange={(e) => onFileChange(e.target.files)}
          />
        </div>
      )}
    </div>
  )

  async function onFileChange(files: FileList | null) {
    if (!files) return

    const file = files[0]

    const validFileTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif']

    if (!validFileTypes.includes(file.type)) return

    const imageColors = await getColorsFromImage(file)

    const updatedArtColors = imageColors.filter((color) => {
      if (!artColors.includes(color)) return color
    })

    setArtColors(updatedArtColors)

    setArt(file)
  }
}
