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

  const menuOptions = ['Cover*', 'Back', 'Gatefold', 'Vinyl', 'Insert', 'Tape']

  return (
    <div className={styles.component}>
      <ul className={styles.artworkMenu}>
        {menuOptions.map((option: string, i: number) => (
          <ArtworkMenuItem
            key={i}
            index={i}
            display={option}
            selected={selected}
            setSelected={setSelected}
          />
        ))}
      </ul>
      <ArtworkDisplay
        selected={selected}
        release={release}
        setRelease={setRelease}
      />
      <hr />
      <ArtworkColors release={release} setRelease={setRelease} />
    </div>
  )
}
