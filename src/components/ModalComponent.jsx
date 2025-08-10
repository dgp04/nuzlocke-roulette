export default function Modal({ modalCerrando, cerrarModal, actualizaciones, tipo, vidas, setVidas }){
    
    return (
        <div
        className={`fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-all duration-300 ${
            modalCerrando ? "opacity-0" : "opacity-100"
        }`}
        >
            <div
                className={`bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden transform transition-all duration-300 ${
                modalCerrando ? "scale-95 translate-y-4 opacity-0" : "scale-100 translate-y-0 opacity-100"
                }`}
            >
                {/* Header del modal */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                    <div className="flex justify-between items-center">
                        { tipo === "actualuzaciones" && (
                            <h2 className="text-2xl sm:text-3xl font-bold">📋 Historial de Actualizaciones</h2>
                        )}
                        { tipo === "configuracion" && (
                            <h2 className="text-2xl sm:text-3xl font-bold">⚙️ Configuración</h2>
                        )}
                        <button
                        onClick={() => cerrarModal()}
                        className="w-8 h-8 bg-transparent bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white font-bold text-xl transition-all duration-200 hover:cursor-pointer"
                        >
                        ✕
                        </button>
                    </div>
                </div>
                {/* Contenido del modal */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                    { tipo === "actualizaciones" && (
                        <>
                            <div className="space-y-6">
                            {actualizaciones.map((update, index) => (
                            <div key={index} className="border-l-4 border-blue-500 pl-6 pb-6">
                                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800">{update.titulo}</h3>
                                    <div className="flex flex-col sm:items-end mt-2 sm:mt-0">
                                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
                                        {update.version}
                                        </span>
                                        <span className="text-gray-500 text-sm mt-1">{update.fecha}</span>
                                    </div>
                                </div>
                                <ul className="space-y-2">
                                {update.cambios.map((cambio, cambioIndex) => (
                                    <li key={cambioIndex} className="flex items-start space-x-2">
                                        <span className="text-green-500 font-bold mt-1">•</span>
                                        <span className="text-gray-700">{cambio}</span>
                                    </li>
                                ))}
                                </ul>
                            </div>
                            ))}
                        </div>
                        {/* Footer del modal */}
                        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                            <p className="text-gray-600">
                            ¿Tienes sugerencias o encontraste algún error?{" "}
                            <span className="text-blue-600 font-bold"><a href="mailto:davidgomezperez04@gmail.com?subject=Bug%20or%20Suggest%20Report">¡Déjanos saber!</a></span>
                            </p>
                        </div>
                    </>
                    )}

                    {tipo === "configuracion" && (
                        <div className="space-y-6">
                            <label className="block text-lg font-semibold text-gray-700">
                                Número de vidas iniciales:
                            </label>
                            <input
                                type="number"
                                min={1}
                                max={50}
                                value={vidas}
                                onChange={(e) => {
                                    let val = Number(e.target.value);
                                    if (val > 50) val = 50;    // Limitar máximo
                                    if (val < 1) val = 1;      // Limitar mínimo (opcional)
                                    setVidas(val);
                                }}
                                className="w-24 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                            />
                            <p className="text-gray-500 text-sm">
                                Este valor determinará cuántas vidas tendrás al iniciar el Nuzlocke.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}