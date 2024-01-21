import { useEffect, useRef, useState } from 'react'
import { getColorsFromImage } from '../utils/art'
import { blobToDataURL } from '../utils/file'

type ReleaseArtInputProps = {
  setReleaseArt?: (releaseArt: Blob | null) => void
}

export default function ReleaseArtInput({
  setReleaseArt = () => {},
}: ReleaseArtInputProps) {
  const [art, setArt] = useState<Blob | null>(null)
  const [dataURL, setDataURL] = useState<string>('')
  const [artColors, setArtColors] = useState<string[]>([])

  const inputElement = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setReleaseArt(art)

    art && blobToDataURL(art).then((dataURL) => setDataURL(dataURL))
  }, [art])

  return (
    <div className="mb-4">
      {dataURL ? (
        <img className="w-full h-auto aspect-square" src={dataURL} />
      ) : (
        <div
          className="flex flex-col items-center justify-center w-full h-auto border-global border-2 border-dashed rounded-xl aspect-square cursor-pointer"
          onClick={() => inputElement.current?.click()}
        >
          <i className="fa-fw fa-sharp fa-solid fa-upload text-5xl" />
          <span className="font-header text-xl mt-2">release art</span>
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
