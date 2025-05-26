export default function EditRuleList({ agregarRegla, reglas, editarRegla, eliminarRegla, restaurarReglas, colores }){
    return (
        <div className="bg-gray-50 p-5 sm:p-7 rounded-lg w-full border-2 border-gray-200">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-5 space-y-3 sm:space-y-0">
                <h3 className="font-bold text-xl sm:text-2xl lg:text-3xl text-gray-800">✏️ Editar Reglas</h3>
                <div className="flex gap-3">
                    <button
                        className="px-4 py-2 bg-green-600 text-white text-sm sm:text-base lg:text-lg font-bold rounded hover:bg-green-700 disabled:opacity-50 hover:cursor-pointer"
                        onClick={agregarRegla}
                        disabled={reglas.length >= 12}
                    >
                        + Añadir
                    </button>
                    <button
                        className="px-4 py-2 bg-gray-600 text-white text-sm sm:text-base lg:text-lg font-bold rounded hover:bg-gray-700 hover:cursor-pointer"
                        onClick={restaurarReglas}
                    >
                        🔄 Restaurar
                    </button>
                </div>
            </div>

            <div className="space-y-5">
                {reglas.map((regla, index) => (
                <div key={index} className="bg-white p-4 sm:p-5 rounded-lg border border-gray-200">
                    <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                        <div
                            className="w-7 h-7 rounded-full flex-shrink-0 mx-auto sm:mx-0 sm:mt-1"
                            style={{ backgroundColor: colores[index % colores.length] }}
                        ></div>
                        <div className="flex-1 space-y-3">
                            <input
                            type="text"
                            value={regla.titulo}
                            onChange={(e) => editarRegla(index, "titulo", e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded font-bold text-lg sm:text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Título de la regla"
                            maxLength={30}
                            />
                            <textarea
                            value={regla.descripcion}
                            onChange={(e) => editarRegla(index, "descripcion", e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            placeholder="Descripción del efecto"
                            rows="3"
                            maxLength={150}
                            />
                        </div>
                        <button
                        className="px-4 py-3 bg-red-500 text-white text-sm sm:text-base lg:text-lg rounded hover:bg-red-600 disabled:opacity-50 flex-shrink-0 w-full sm:w-auto hover:cursor-pointer"
                            onClick={() => eliminarRegla(index)}
                            disabled={reglas.length <= 3}
                        >
                            ✕ Eliminar
                        </button>
                    </div>
                </div>
                ))}
            </div>
            <p className="text-base sm:text-lg text-gray-600 mt-5">
                💡 Puedes tener entre 3 y 12 reglas. Los cambios se reflejan inmediatamente en la ruleta.
            </p>
        </div>
    )
}