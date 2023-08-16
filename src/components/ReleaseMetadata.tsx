import { FormGroup, TextInput, Textarea } from '@sone-dao/tone-react-form-ui'
import { IUploadRelease } from '../UploadPage'
import styles from '../UploadPage.module.scss'

interface IReleaseMetadataProps {
  release: IUploadRelease
  setRelease: Function
}

export default function ReleaseMetadata({
  release,
  setRelease,
}: IReleaseMetadataProps) {
  return (
    <div className={styles.section}>
      <FormGroup display="Tags" />
      <FormGroup display="About the release">
        <Textarea
          style={{ height: '25vh' }}
          value={release.description}
          setValue={(v: string) => setRelease({ ...release, description: v })}
        />
      </FormGroup>
      <FormGroup display="Written Credits">
        <Textarea
          style={{ height: '15vh' }}
          value={release.credits.written}
          setValue={(v: string) =>
            setRelease({
              ...release,
              credits: { ...release.credits, written: v },
            })
          }
        />
      </FormGroup>
      {/*<FormGroup display="Tagged credits" />*/}
      <FormGroup display="UPC/EAN">
        <TextInput
          value={release.upc}
          setValue={(v: string) => setRelease({ ...release, upc: v })}
        />
      </FormGroup>
      <FormGroup display="Catalog #">
        <TextInput
          value={release.catalog}
          setValue={(v: string) => setRelease({ ...release, catalog: v })}
        />
      </FormGroup>
    </div>
  )
}
