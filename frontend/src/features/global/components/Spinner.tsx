import { useEffect, useState } from "react"

export function Spinner() {
  const waitingTime: number = 5
  const [showSpinner, setShowSpinner] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false)
    }, waitingTime * 1000)

    return () => clearTimeout(timer)
  }, [])

  if (!showSpinner) {
    return (
      <div className="flex justify-center">
        <p className="text-center">No data found</p>
      </div>
    )
  }

  return (
    <div className="flex justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  )
}
