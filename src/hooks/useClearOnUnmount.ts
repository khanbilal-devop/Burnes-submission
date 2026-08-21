import { useEffect, useRef } from 'react'

/**
 * Calls `clear(name)` once, when the component unmounts.
 *
 * A field uses this to tell its parent "drop the value you were holding for
 * me". That keeps the cleanup with the field itself, instead of the parent
 * having to know which fields disappear when.
 */
export const useClearOnUnmount = (
  name: string,
  clear?: (name: string) => void,
) => {
  const clearRef = useRef(clear)

  /* Keep the ref pointing at the latest callback. */
  useEffect(() => {
    clearRef.current = clear
  }, [clear])

  /* Runs only on unmount, because `name` is the sole dependency. */
  useEffect(() => {
    return () => clearRef.current?.(name)
  }, [name])
}
