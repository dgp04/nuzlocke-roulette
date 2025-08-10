const colorSchemes = {
    green: {
        bg: "bg-green-50",
        border: "border-green-200",
        title: "text-green-800",
        counter: "text-green-600",
        button: "bg-green-600 hover:bg-green-700",
        text: "text-green-700",
    },
    purple: {
        bg: "bg-purple-50",
        border: "border-purple-200",
        title: "text-purple-800",
        counter: "text-purple-600",
        button: "bg-purple-600 hover:bg-purple-700",
        text: "text-purple-700",
    },
    blue: {
        bg: "bg-blue-50",
        border: "border-blue-200",
        title: "text-blue-800",
        counter: "text-blue-600",
        button: "bg-blue-600 hover:bg-blue-700",
        text: "text-blue-700",
    },
    red: {
        bg: "bg-red-50",
        border: "border-red-200",
        title: "text-red-800",
        counter: "text-red-600",
        button: "bg-red-600 hover:bg-red-700",
        text: "text-red-700",
    },
    yellow: {
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        title: "text-yellow-800",
        counter: "text-yellow-600",
        button: "bg-yellow-600 hover:bg-yellow-700",
        text: "text-yellow-700",
    },
    orange: {
        bg: "bg-orange-50",
        border: "border-orange-200",
        title: "text-orange-800",
        counter: "text-orange-600",
        button: "bg-orange-600 hover:bg-orange-700",
        text: "text-orange-700",
    },
}

export default function Counter({ title, counter, onIncrement, disabled, text, counterText, limit, color }){
    const colors = colorSchemes[color] || colorSchemes.green

    return (
        <div className={`${colors.bg} border-2 ${colors.border} rounded-xl p-5 sm:p-7 text-center`}>
            <h3 className={`text-lg sm:text-xl lg:text-2xl font-bold ${colors.title} mb-3`}>{title}</h3>
            {title !== "Has perdido todas tus vidas" && (
                <div className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${colors.counter} mb-4`}>
                    {counter}/{limit}
                </div>
            )}
            <button
                className={`px-4 sm:px-6 py-3 ${colors.button} text-white font-bold text-sm sm:text-base lg:text-lg rounded-lg disabled:opacity-50 transition-all duration-200 w-full sm:w-auto hover:cursor-pointer`}
                onClick={onIncrement}
                disabled={disabled}
            >
                {text}
            </button>
            <p className={`text-sm sm:text-base lg:text-lg ${colors.text} mt-3`}>
                {counter >= limit ? "¡Listo para tirar!" : counterText}
            </p>
        </div>
    )
}