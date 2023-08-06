import styles from './ReleaseImporter.module.scss'

interface IDropboxImportProps {}

export default function DropboxImport({}: IDropboxImportProps) {
  return (
    <div className={styles.driveInput}>
      <i className="fa-fw fa-brands fa-dropbox" />
    </div>
  )
}
