import { IUploadRelease } from '../../UploadPage'
import styles from './ReleaseMetadata.module.scss'

interface IReleaseMetadataProps {
  release: IUploadRelease
  setRelease: Function
}

export default function ReleaseMetadata({
  release,
  setRelease,
}: IReleaseMetadataProps) {
  return (
    <div className={styles.component}>
      <div className={styles.group}>
        <h5>About the Release</h5>
        <textarea
          value={release.description}
          onChange={(e) =>
            setRelease({ ...release, description: e.target.value })
          }
        />
      </div>
      <div className={styles.group}>
        <h5>Tags</h5>
      </div>
      <div className={styles.group}>
        <h5>Written Credits</h5>
        <textarea
          value={release.credits.written}
          onChange={(e) =>
            setRelease({
              ...release,
              credits: { ...release.credits, written: e.target.value },
            })
          }
        />
      </div>
      <div className={styles.group}>
        <h5>Tagged Credits</h5>
      </div>
      <div className={styles.group}>
        <h5>UPC/EAN</h5>
        <input
          value={release.upc}
          onChange={(e) => setRelease({ ...release, upc: e.target.value })}
        />
      </div>
      <div className={styles.group}>
        <h5>Catalog #</h5>
        <input
          value={release.catalog}
          onChange={(e) => setRelease({ ...release, catalog: e.target.value })}
        />
      </div>
    </div>
  )
}
