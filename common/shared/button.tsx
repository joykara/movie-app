'use client'
import { Button } from "@/data/interfaces/components"

export default function CommonButton(props: Readonly<Button>) {
    return (
        <button
            {...props}
            type={props.type}
            className={`${props.bg} w-full min-w-24 px-4 py-2 rounded-md ${props.border} text-black text-sm cursor-pointer ${props.loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            disabled={props.loading}
            onClick={props.onClick}
        >
            {props.loading ? (
                <div className="flex items-center justify-center">
                    <span className="ml-2">Loading...</span>
                </div>
            ) : (
                `${props.title}`
            )}
        </button>
    )
}
