export type SeriesItemProps = {
  /* Identifies the series; passed back on toggle. */
  id: string
  title: string
  imageUrl: string
  checked: boolean
  onToggle: (id: string) => void
}
