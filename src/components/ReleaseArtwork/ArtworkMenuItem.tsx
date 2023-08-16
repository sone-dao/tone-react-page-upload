import styles from './ReleaseArtwork.module.scss'

interface IArtworkMenuItemProps {
  index: number
  display: string
  selected: number
  setSelected: Function
  required?: boolean
}

export default function ArtworkMenuItem({
  index,
  display,
  selected,
  setSelected,
  required = false,
}: IArtworkMenuItemProps) {
  return (
    <li
      className={styles.artworkMenuItem}
      style={{
        borderBottom:
          selected == index ? '1px solid rgb(var(--global-primary))' : '',
      }}
      onClick={() => setSelected(index)}
    >
      {display}
      {required && (
        <i
          className="fa-sharp fa-solid fa-music"
          style={{
            fontSize: '0.55rem',
            position: 'relative',
            left: '2px',
            bottom: '5px',
          }}
        />
      )}
    </li>
  )
}
