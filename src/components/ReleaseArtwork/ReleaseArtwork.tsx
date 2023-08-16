import { FormGroup } from '@sone-dao/tone-react-form-ui'
import { useState } from 'react'
import { IUploadRelease } from '../../UploadPage'
import ArtworkColors from './ArtworkColors'
import ArtworkDisplay from './ArtworkDisplay'
import ArtworkMenuItem from './ArtworkMenuItem'
import styles from './ReleaseArtwork.module.scss'

interface IReleaseArtworkProps {
  release: IUploadRelease
  setRelease: Function
}

export default function ReleaseArtwork({
  release,
  setRelease,
}: IReleaseArtworkProps) {
  const [selected, setSelected] = useState<number>(0)

  return (
    <div className={styles.component}>
      <FormGroup display="Release Artwork">
        <ul className={styles.artworkMenu}>
          <ArtworkMenuItem
            index={0}
            display="Cover"
            selected={selected}
            setSelected={setSelected}
            required
          />
          <ArtworkMenuItem
            index={1}
            display="Back"
            selected={selected}
            setSelected={setSelected}
          />
          <ArtworkMenuItem
            index={2}
            display="Gatefold"
            selected={selected}
            setSelected={setSelected}
          />
          <ArtworkMenuItem
            index={3}
            display="Insert"
            selected={selected}
            setSelected={setSelected}
          />
          <ArtworkMenuItem
            index={4}
            display="Vinyl"
            selected={selected}
            setSelected={setSelected}
          />
          <ArtworkMenuItem
            index={5}
            display="Tape"
            selected={selected}
            setSelected={setSelected}
          />
        </ul>
        <ArtworkDisplay
          selected={selected}
          release={release}
          setRelease={setRelease}
        />
      </FormGroup>
      <FormGroup display="Release Colors" required>
        <ArtworkColors release={release} setRelease={setRelease} />
      </FormGroup>
    </div>
  )
}
