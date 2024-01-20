type ZipDropzoneProps = {
  className?: string
  handleFile: Function
}

export default function ZipDropzone({
  className,
  handleFile,
}: ZipDropzoneProps) {
  return (
    <input
      type="file"
      onChange={(e) => e.target.files?.length && handleFile(e.target.files[0])}
      className={className}
      style={{ all: 'unset' }}
    />
  )
}
