import { useEffect, useState } from 'react'
import { IUploadRelease } from '../../UploadPage'
import styles from './ReleaseArtwork.module.scss'

interface IArtworkColorsProps {
  release: IUploadRelease
  setRelease: Function
}

export default function ArtworkColors({}: IArtworkColorsProps) {
  const [primary, setPrimary] = useState<string>('#000000')
  const [secondary, setSecondary] = useState<string>('#FFFFFF')

  useEffect(() => {
    const primaryRgb = hexToRgb(primary)
    const secondaryRgb = hexToRgb(secondary)

    document.documentElement.style.setProperty('--global-primary', primaryRgb)

    document.documentElement.style.setProperty(
      '--global-secondary',
      secondaryRgb
    )
  }, [primary, secondary])

  return (
    <div className={styles.artworkColors}>
      <div className={styles.group}>
        <div
          className={styles.colorPicker}
          style={{ backgroundColor: primary }}
        >
          <input
            type="color"
            value={primary}
            onChange={(e) => setPrimary(e.target.value)}
          />
        </div>
        <input value={primary} onChange={(e) => setPrimary(e.target.value)} />
      </div>
      <div className={styles.group}>
        <div
          className={styles.colorPicker}
          style={{
            backgroundColor: secondary,
          }}
        >
          <input
            type="color"
            value={secondary}
            onChange={(e) => setSecondary(e.target.value)}
          />
        </div>
        <input
          value={secondary}
          onChange={(e) => setSecondary(e.target.value)}
        />
      </div>
      <p>
        <i className="fa-sharp fa-solid fa-paintbrush-fine" />
        These colors will represent your release across Tone.
      </p>
    </div>
  )

  function hexToRgb(hex: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result
      ? parseInt(result[1], 16) +
          ',' +
          parseInt(result[2], 16) +
          ',' +
          parseInt(result[3], 16)
      : null
  }
}
