import { Chip, FormGroup, Input } from '@sone-dao/tone-react-core-ui'
import { CSSProperties, useEffect, useState } from 'react'
import ResultItem from './ResultItem'

type ArtistsInputProps = {
  custodialArtists: any[]
  release: any
  setReleaseProperty: Function
}

export default function ArtistsInput({
  custodialArtists,
  release,
  setReleaseProperty,
}: ArtistsInputProps) {
  const [results, setResults] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState<string>('')

  const artists = release.artists || []

  useEffect(() => {
    if (searchTerm) {
      const results = custodialArtists.filter((artist: any) => {
        const display = artist.display || ''

        if (display.toLowerCase().includes(searchTerm.toLowerCase()))
          return artist
      })

      setResults(results)
    }
  }, [searchTerm])

  return (
    <FormGroup label="artist(s)" className="mb-4">
      {custodialArtists.length > 1 && (
        <Input
          value={searchTerm}
          setValue={setSearchTerm}
          placeholder="Search for artist..."
          className="mt-2 w-full"
          variant="solid"
          startContent={
            <i className="fa-fw fa-solid fa-magnifying-glass mr-1" />
          }
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
                    <ResultItem
                      key={i}
                      result={result}
                      onClick={(entity) => addArtistToRelease(entity)}
                    />
                  ))}
                </ul>
              )}
            </>
          }
        />
      )}
      {artists.length ? (
        <>
          <ul className="my-4 flex flex-wrap">
            {artists.map((entity: any, i: number) => {
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
                    onClick={() => removeArtistFromRelease(i)}
                  >
                    {entity.display}
                  </Chip>
                </li>
              )
            })}
          </ul>
          <p className="bg-global-flipped font-content text-global-flipped text-sm p-1 w-full rounded-xl ">
            <i className="fa-fw fa-solid fa-circle-info mx-1" />
            Click/tap on artist to remove them from the list.
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
