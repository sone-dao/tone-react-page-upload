import styles from './ReleaseImporter.module.scss'

interface ILocalImportProps {}

export default function LocalImport({}: ILocalImportProps) {
  return (
    <div className={styles.localInput}>
      <i className="fa-fw fa-sharp fa-regular fa-folder-open" />
    </div>
  )
}
