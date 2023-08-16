import { ColorPicker, TextInput } from '@sone-dao/tone-react-form-ui'
import { useState } from 'react'
import { IUploadRelease } from '../../UploadPage'
import styles from './ReleaseArtwork.module.scss'

interface IArtworkColorsProps {
  release: IUploadRelease
  setRelease: Function
}

export default function ArtworkColors({}: IArtworkColorsProps) {
  const [primary, setPrimary] = useState<string>('#000000')
  const [secondary, setSecondary] = useState<string>('#FFFFFF')

  return (
    <div className={styles.artworkColors}>
      <p>
        <i className="fa-sharp fa-solid fa-paintbrush-fine" />
        These colors will represent your release across Tone.
      </p>
      <div className={styles.group}>
        <ColorPicker
          style={{ marginRight: '0.5rem' }}
          defaultColor={primary}
          setHexValue={(hex: string) => setPrimary(hex)}
        />
        <TextInput value={primary} setValue={setPrimary} />
      </div>
      <div className={styles.group}>
        <ColorPicker
          style={{ marginRight: '0.5rem', border: `1px solid ${primary}` }}
          defaultColor={secondary}
          setHexValue={(hex: string) => setSecondary(hex)}
        />
        <TextInput value={secondary} setValue={setSecondary} />
      </div>
    </div>
  )
}
