import { FormGroup, Pill, TextInput } from '@sone-dao/tone-react-form-ui'
import { IUploadRelease } from '../UploadPage'
import styles from '../UploadPage.module.scss'

interface IReleaseHeaderProps {
  release: IUploadRelease
  setRelease: Function
}

export default function ReleaseHeader({
  release,
  setRelease,
}: IReleaseHeaderProps) {
  const artists = release.artists
  const labels = release.labels

  return (
    <div className={styles.section}>
      <FormGroup display="Release Title" required>
        <TextInput value={release.display} setValue={setRelease} />
      </FormGroup>
      <FormGroup display="Artist(s)" required>
        <ul className={styles.pillContainer}>
          {artists.map((artist, i) => (
            <li key={i}>
              <Pill
                value={artist.display}
                colors={{
                  primary: artist.colors.primary,
                  secondary: artist.colors.secondary,
                }}
                perma
              />
            </li>
          ))}
        </ul>
      </FormGroup>
      <FormGroup display="Label(s)">
        <ul className={styles.pillContainer}>
          {labels.map((label, i) => (
            <li key={i}>
              <Pill
                value={label.display}
                colors={{
                  primary: label.colors.primary,
                  secondary: label.colors.secondary,
                }}
                perma
              />
            </li>
          ))}
        </ul>
      </FormGroup>
    </div>
  )
}
