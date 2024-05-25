export interface AlertProps {
  type: "success" | "error" | "info"
  message: string
}

export const Alert: React.FC<AlertProps> = ({ type, message }) => {
  return <div className={`alert alert-${type} my-4`}>{message}</div>
}
