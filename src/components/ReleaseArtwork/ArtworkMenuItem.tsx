import styles from './ReleaseArtwork.module.scss'

interface IArtworkMenuItemProps {
  index: number
  display: string
  selected: number
  setSelected: Function
}

export default function ArtworkMenuItem({
  index,
  display,
  selected,
  setSelected,
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
    </li>
  )
}
