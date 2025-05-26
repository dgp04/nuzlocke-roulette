export default function Gen7Switch({ isGen7Mode, onChange, disabled }){
    
    return (
        <div className="flex items-center justify-start space-x-2">
            <label
                htmlFor="AcceptConditions"
                className="group relative block h-8 w-14 rounded-full bg-gray-300 transition-colors [-webkit-tap-highlight-color:_transparent] has-checked:bg-green-500 hover:cursor-pointer"
            >
                <input type="checkbox" id="AcceptConditions" className="peer sr-only" checked={isGen7Mode} onChange={() => onChange(!isGen7Mode)} disabled={disabled}/>
                <span className="absolute inset-y-0 start-0 m-1 grid size-6 place-content-center rounded-full bg-white text-gray-700 transition-[inset-inline-start] peer-checked:start-6 peer-checked:*:first:hidden *:last:hidden peer-checked:*:last:block">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-4"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                </span>
            </label>
            <label
                htmlFor="AcceptConditions"
                className="text-sm sm:text-base lg:text-lg text-gray-700 whitespace-nowrap hover:cursor-pointer"
            >
                Gen 7 Mode
            </label>
        </div>
    )
}