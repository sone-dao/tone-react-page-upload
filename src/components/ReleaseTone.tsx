import { ColorPicker } from '@sone-dao/tone-react-core-ui'
import { UploadRelease } from '../types'
import ColorPalette from './ColorPalette'

type ReleaseThemeProps = {
  artColors: string[]
  release: UploadRelease
  setReleaseProperty: Function
}

export default function ReleaseTone({
  artColors,
  release,
  setReleaseProperty,
}: ReleaseThemeProps) {
  return (
    <div>
      <h3 className="font-header text-2xl mb-2">Tone</h3>
      <p className="text-global text-sm font-content">
        These colors will represent this release on the platform, and will
        effect the sites visual appearance when interacting with pages relating
        to it (ie. search colors, release page, etc). You can change these
        colors at anytime in the release's settings.
      </p>
      <p className="text-global text-sm font-content my-2">
        <i className="fa-fw fa-solid fa-circle-info mr-1" />
        Clicking the colored circle next to the hex code will bring up a color
        picker.
      </p>
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
      <ColorPicker
        value={release.colors.primary}
        setValue={(value: string) =>
          setReleaseProperty('colors', { ...release.colors, primary: value })
        }
        className="my-2"
      />
      <ColorPicker
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
