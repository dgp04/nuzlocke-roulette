export default function Counter({ title, counter, onIncrement, disabled, text, counterText, limit, color }){
    return(
        <div className={`bg-${color}-50 border-2 border-${color}-200 rounded-xl p-5 sm:p-7 text-center`}>
            <h3 className={`text-lg sm:text-xl lg:text-2xl font-bold text-${color}-800 mb-3`}>{title}</h3>
            <div className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-${color}-600 mb-4`}>{counter}/{limit}</div>
            <button
                className={`px-4 sm:px-6 py-3 bg-${color}-600 text-white font-bold text-sm sm:text-base lg:text-lg rounded-lg hover:bg-${color}-700 disabled:opacity-50 transition-all duration-200 w-full sm:w-auto hover:cursor-pointer`}
                onClick={onIncrement}
                disabled={disabled}
            >
                {text}
            </button>
            <p className={`text-sm sm:text-base lg:text-lg text-${color}-700 mt-3`}>
                {counter >= 3 ? "¡Listo para tirar!" : `${counterText}`}
            </p>
        </div>
    )
}