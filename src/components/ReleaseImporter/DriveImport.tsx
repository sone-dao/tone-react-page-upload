import styles from './ReleaseImporter.module.scss'

interface IDriveImportProps {}

export default function DriveImport({}: IDriveImportProps) {
  return (
    <div className={styles.driveInput}>
      <i className="fa-fw fa-brands fa-google-drive" />
    </div>
  )
}
