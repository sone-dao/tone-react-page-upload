import { Input } from '@sone-dao/tone-react-core-ui'
import { UploadRelease } from '../types'
import ColorPalette from './ColorPalette'

type ReleaseThemeProps = {
  artColors: string[]
  release: UploadRelease
  setReleaseProperty: Function
}

export default function ReleaseTheme({
  artColors,
  release,
  setReleaseProperty,
}: ReleaseThemeProps) {
  return (
    <div>
      <h3 className="font-header text-2xl">Theme</h3>
      {artColors.length ? (
        <div className="w-full">
          <ColorPalette artColors={artColors} />
          <p className="bg-zinc-500 font-content text-sm text-white p-2 rounded-xl">
            <i className="fa-sharp fa-solid fa-circle-info mr-1" />
            We've gathered these colors from the art you've uploaded. Click to
            copy it's hex code.
          </p>
        </div>
      ) : (
        <></>
      )}
      <Input
        additionalClasses="mt-4 mb-2"
        label="primary color"
        placeholder="#000000"
        value={release.colors.primary}
        setValue={(value: string) =>
          setReleaseProperty('colors', { ...release.colors, primary: value })
        }
      />
      <Input
        additionalClasses="mt-4 mb-2"
        label="secondary color"
        placeholder="#FFFFFF"
        value={release.colors.secondary}
        setValue={(value: string) =>
          setReleaseProperty('colors', { ...release.colors, secondary: value })
        }
      />
    </div>
  )
}

/*
document
      .querySelector('html')
      ?.style.setProperty('--global-primary', rgbString.primary)

    document
      .querySelector('html')
      ?.style.setProperty('--global-secondary', rgbString.secondary)
*/
