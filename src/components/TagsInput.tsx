import { Chip, FormGroup, Input } from '@sone-dao/tone-react-core-ui'
import { CSSProperties, useEffect, useState } from 'react'
import ResultItem from './ResultItem'

type TagsInputProps = {
  release: any
  setReleaseProperty: Function
}

export default function TagsInput({
  release,
  setReleaseProperty,
}: TagsInputProps) {
  const [results, setResults] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  const tags = release.tags || []

  useEffect(() => {
    if (searchTerm) {
    }

    setResults(results)
  }, [searchTerm])

  return (
    <FormGroup label="tags" className="mb-4">
      <Input
        value={searchTerm}
        setValue={setSearchTerm}
        placeholder="Search for artist..."
        className="my-2 w-full"
        variant="solid"
        startContent={<i className="fa-fw fa-solid fa-magnifying-glass mr-1" />}
        results={
          <>
            {searchTerm && (
              <ul
                className="flex flex-col overflow-y-scroll scrollbar-none"
                style={{
                  maxHeight: '33vh',
                }}
              >
                {results.map((result, i) => (
                  <ResultItem key={i} result={result} onClick={() => {}} />
                ))}
              </ul>
            )}
          </>
        }
      />
      <p className="bg-global-flipped text-global-flipped text-sm font-content p-1 rounded-xl w-full">
        <i className="fa-fw fa-solid fa-tag mx-1" />A little blurb on the
        importance of tags here.
      </p>
      {tags.length ? (
        <>
          <ul className="my-4 flex flex-wrap">
            {tags.map((entity: any, i: number) => {
              const style = {
                '--global-lighter': entity?.colors[0],
                '--global-darker': entity?.colors[1],
              } as CSSProperties

              return (
                <li>
                  <Chip
                    key={i}
                    style={style}
                    className="mr-2 cursor-pointer"
                    onClick={() => {}}
                  >
                    {entity.display}
                  </Chip>
                </li>
              )
            })}
          </ul>
          <p className="bg-global-flipped font-content text-global-flipped text-sm p-1 w-full rounded-xl ">
            <i className="fa-fw fa-solid fa-circle-info mx-1" />
            Click/tap on tag to remove it from the list.
          </p>
        </>
      ) : (
        <></>
      )}
    </FormGroup>
  )

  function addArtistToRelease(entity: any) {
    if (entity && !release.artists.includes(entity)) {
      setReleaseProperty('artists', [...release.artists, entity])

      setSearchTerm('')
    }
  }

  function removeArtistFromRelease(index: number) {
    const updatedArtists = release.artists.filter((artist: any, i: number) => {
      if (i !== index) return artist
    })

    setReleaseProperty('artists', updatedArtists)
  }
}
