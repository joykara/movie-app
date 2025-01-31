'use client'
import { Button } from "@/data/interfaces/components"
import Loader from "./loader"

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
                <div className="flex items-center justify-center h-10">
                    <Loader loading={true} size={40} color="white" />
                </div>
            ) : (
                `${props.title}`
            )}
        </button>
    )
}
