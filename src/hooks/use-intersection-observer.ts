import { useEffect, useRef, useState } from 'react'

type State = {
  entry?: IntersectionObserverEntry
  isIntersecting: boolean
}

type UseIntersectionObserverOptions = {
  onChange?: (isIntersecting: boolean, entry: IntersectionObserverEntry) => void
  root?: Element | null
  initialIsIntersecting?: boolean
  threshold?: number | number[]
  freezeOnceVisible?: boolean
  rootMargin?: string
}

type IntersectionReturn = [
  (node?: Element | null) => void, boolean, IntersectionObserverEntry | undefined] & {
    ref: (node?: Element | null) => void
    entry?: IntersectionObserverEntry
    isIntersecting: boolean
  }

const useIntersectionObserver = ({
  initialIsIntersecting = false,
  freezeOnceVisible = false,
  rootMargin = '0%',
  threshold = 0,
  root = null,
  onChange,
}: UseIntersectionObserverOptions = {}): IntersectionReturn => {
  const [ref, setRef] = useState<Element | null>(null)

  const [state, setState] = useState<State>(() => ({
    isIntersecting: initialIsIntersecting,
    entry: undefined,
  }))

  const callbackRef = useRef<UseIntersectionObserverOptions['onChange']>()

  callbackRef.current = onChange

  const frozen = state.entry?.isIntersecting && freezeOnceVisible

  useEffect(() => {
    if (!ref) return undefined
    if (!('IntersectionObserver' in window)) return undefined

    if (frozen) return undefined
    let unobserve: (() => void) | undefined

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]): void => {
        const thresholds = Array.isArray(observer.thresholds)
          ? observer.thresholds
          : [observer.thresholds]

        entries.forEach(entry => {
          const isIntersecting =
            entry.isIntersecting &&
            thresholds.some(threshold => entry.intersectionRatio >= threshold)

          setState({ isIntersecting, entry })

          if (callbackRef.current) {
            callbackRef.current(isIntersecting, entry)
          }

          if (isIntersecting && freezeOnceVisible && unobserve) {
            unobserve()
            unobserve = undefined
          }
        })
      },
      { threshold, root, rootMargin },
    )

    observer.observe(ref)

    return () => {
      observer.disconnect()
    }

  }, [
    ref,
    freezeOnceVisible,
    rootMargin,
    threshold,
    frozen,
    root,
  ])

  const prevRef = useRef<Element | null>(null)

  useEffect(() => {
    if (
      !ref &&
      state.entry?.target &&
      !freezeOnceVisible &&
      !frozen &&
      prevRef.current !== state.entry.target
    ) {
      prevRef.current = state.entry.target
      setState({ isIntersecting: initialIsIntersecting, entry: undefined })
    }
  }, [ref, state.entry, freezeOnceVisible, frozen, initialIsIntersecting])

  const result = [
    setRef,
    !!state.isIntersecting,
    state.entry,
  ] as IntersectionReturn

  result.ref = result[0]
  result.isIntersecting = result[1]
  result.entry = result[2]

  return result
}

export default useIntersectionObserver