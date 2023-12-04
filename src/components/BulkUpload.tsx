import ImportZip from '../utils/importZip'
import ZipDropzone from './ZipDropzone'

type BulkUploadProps = {
  setReleaseProperty: Function
  setSongs: Function
}

export default function BulkUpload({
  setReleaseProperty,
  setSongs,
}: BulkUploadProps) {
  return (
    <div className="my-4">
      <h3 className="font-header text-2xl">Bulk Upload</h3>
      <ZipDropzone handleFile={handleZip} />
    </div>
  )

  async function handleZip(file: File) {
    if (file) {
      const importZip = new ImportZip(file)

      importZip.getFiles().then(() =>
        importZip
          .getArtFromFiles()
          .then((art) => setReleaseProperty('art', art))
          .then(() =>
            importZip.getSongsFromFiles().then((songs) => setSongs(songs))
          )
      )
    }
  }
}
