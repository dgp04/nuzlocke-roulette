export default function EditRulesButton({ girando, editando, setEditando }) {
    return (
        <button
            className={`px-4 sm:px-6 py-3 font-bold text-base sm:text-lg lg:text-xl rounded-lg transition-all duration-200 hover:cursor-pointer ${
            editando ? "bg-green-600 text-white hover:bg-green-700" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            onClick={() => setEditando(!editando)}
            disabled={girando}
        >
            {editando ? "✅ Guardar" : "✏️ Editar Reglas"}
        </button>
    )
}