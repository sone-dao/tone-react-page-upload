import { Chip } from '@sone-dao/tone-react-core-ui'

type SearchTagProps = {}

export default function SearchTag({}: SearchTagProps) {
  return (
    <Chip variant="faded">
      <input className="border-none outline-none bg-transparent" />
    </Chip>
  )
}
