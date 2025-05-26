import EditRulesButton from "./EditRulesButton"

export default function RuleList({ reglas, colores, editando, girando, setEditando }){
    return (
        <div className="bg-gray-100 p-5 sm:p-7 rounded-lg w-full">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-5 space-y-3 sm:space-y-0">
                <h3 className="font-bold text-xl sm:text-2xl lg:text-3xl mb-5 text-gray-800">
                    📋 Reglas actuales ({reglas.length}):
                </h3>
                <EditRulesButton
                    girando={girando}
                    editando={editando}
                    setEditando={setEditando}
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {reglas.map((regla, index) => (
                <div key={index} className="bg-white p-4 sm:p-5 rounded-lg border border-gray-200">
                    <div className="flex items-start space-x-3">
                    <div
                        className="w-5 h-5 rounded-full flex-shrink-0 mt-1"
                        style={{ backgroundColor: colores[index % colores.length] }}
                    ></div>
                    <div className="min-w-0 flex-1">
                        <div className="font-bold text-base sm:text-lg lg:text-xl text-gray-800 break-words">
                        {regla.titulo}
                        </div>
                        <div className="text-sm sm:text-base lg:text-lg text-gray-600 mt-2 break-words">
                        {regla.descripcion}
                        </div>
                    </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}