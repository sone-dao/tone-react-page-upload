type AlbumArtProps = {
  type?: string
  image?: string
  index?: number
}

export default function AlbumArt({ image }: AlbumArtProps) {
  if (image) {
    return <img width="400" height="400" src={image} />
  }

  return (
    <div
      className={`h-[400px] w-[400px] border-4 border-dashed border-slate-400 hover:border-slate-600 rounded-xl flex justify-center items-center cursor-pointer text-slate-400 hover:text-slate-600`}
    >
      <p className="font-header text-center">
        album art (cover, back, etc...)
        <br />
        (minimum size 1000px x 1000px)
        <br />
        <i className="fa-fw fa-sharp fa-solid fa-upload text-xl mt-2" />
      </p>
    </div>
  )
}
