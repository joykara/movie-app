import { toast } from "react-toastify"

export const showToast = (
  type: "success" | "error" | "warn" | "info",
  message: string
) => {
  switch (type) {
    case "success":
      toast.success(message)
      break
    case "error":
      toast.error(message)
      break
    case "warn":
      toast.warn(message)
      break
    case "info":
        toast.info(message)
  }
}
