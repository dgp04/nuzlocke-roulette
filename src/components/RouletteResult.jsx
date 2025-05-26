export default function RouletteResult({ cerrarResultado, resultado }){
    return (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-5 sm:p-7 rounded-xl shadow-lg border-4 border-yellow-300 w-full max-w-3xl relative">
            {/* Botón de cerrar */}
            <button
                onClick={cerrarResultado}
                className="absolute top-2 right-2 sm:top-3 sm:right-3 w-8 h-8 sm:w-10 sm:h-10 bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white rounded-full flex items-center justify-center font-bold text-lg sm:text-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                title="Cerrar resultado"
            >
                ✕
            </button>

            <div className="text-center pr-8 sm:pr-12">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
                🎯 Resultado:{" "}
                <span className="text-3xl sm:text-4xl lg:text-5xl block sm:inline mt-2 sm:mt-0">
                    {resultado.titulo}
                </span>
                </p>
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 bg-white bg-opacity-50 rounded-lg p-4">
                📝 {resultado.descripcion}
                </p>
            </div>
        </div>
    )
}