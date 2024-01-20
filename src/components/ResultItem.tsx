type ResultItemProps = {
  result: any
  onClick?: (entity: any) => void
}

export default function ResultItem({
  result,
  onClick = () => {},
}: ResultItemProps) {
  return (
    <li
      className="inline-block text-global-flipped rounded-xl p-2 font-content text-lg cursor-pointer"
      onClick={() => onClick(result)}
    >
      {result.display}
    </li>
  )
}
