'use client'
import { Button } from "@/data/interfaces/components"

export default function CommonButton(props: Readonly<Button>) {
    return (
        <button
            {...props}
            type={props.type}
            className={`${props.bg} w-full mt-10 h-14 md:h-16 rounded-md ${props.border} text-white text-xl cursor-pointer ${props.isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            disabled={props.isLoading}
            onClick={props.onClick}
        >
            {props.isLoading ? (
                <div className="flex items-center justify-center">
                    <span className="ml-2">Loading...</span>
                </div>
            ) : (
                `${props.title}`
            )}
        </button>
    )
}
