import './SeriesItem.css'
import type { SeriesItemProps } from './SeriesItem.types'

/*
 * One selectable event series: checkbox, thumbnail, title.
 *
 * The whole row is a <label>, so clicking anywhere in it - thumbnail and title
 * included - toggles the checkbox. That also means no htmlFor/id wiring is
 * needed, because the input is nested inside its own label.
 */
const SeriesItem = ({
  id,
  title,
  imageUrl,
  checked,
  onToggle,
}: SeriesItemProps) => {
  return (
    <label className="series-item">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => onToggle(id)}
      />


      <img
        className="series-item-icon"
        src={imageUrl}
        width="48"
        height="48"
        loading="lazy"
      />

      <span className="series-item-title">{title}</span>
    </label>
  )
}

export default SeriesItem
