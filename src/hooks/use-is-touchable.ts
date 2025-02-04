import { useEffect, useState } from "react"

const useIsTouchable = () => {
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    const checkTouchDevice = () => {
      if ('ontouchstart' in window || navigator?.maxTouchPoints > 0) {
        setIsTouchDevice(true)
      } else {
        setIsTouchDevice(false)
      }
    }

    checkTouchDevice()
  }, [])

  return isTouchDevice
}

export default useIsTouchable
