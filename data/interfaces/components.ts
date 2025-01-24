export interface Button {
    title: string
    bg: string
    border: string
    onClick?: () => void
    disabled?: boolean
    loading?: boolean
    isValid?: boolean
    type: "submit" | "reset" | "button"
}