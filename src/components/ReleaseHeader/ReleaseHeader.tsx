import { IUploadRelease } from '../../UploadPage'
import styles from './ReleaseHeader.module.scss'

interface IReleaseHeaderProps {
  release: IUploadRelease
  setRelease: Function
}

export default function ReleaseHeader({
  release,
  setRelease,
}: IReleaseHeaderProps) {
  return (
    <div className={styles.component}>
      <div className={styles.group}>
        <h5>Release Title</h5>
        <input
          value={release.display}
          onChange={(e) => setRelease({ ...release, display: e.target.value })}
        />
      </div>
    </div>
  )
}
