import { motion } from "framer-motion";

export default function RouletteResult({ resultado, cerrarResultado }) {
    return (
        <motion.div
        key={resultado.id}  // importante para que AnimatePresence funcione
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 200 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-r from-yellow-400 to-orange-500 p-5 rounded-xl shadow-lg border-4 border-yellow-300 relative max-w-3xl mx-auto"
        >
        <button
            onClick={cerrarResultado}
            className="absolute top-2 right-2 w-8 h-8 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center font-bold"
        >
            ✅
        </button>

        <div className="text-center">
            <p className="text-2xl font-bold mb-2">🎯 {resultado.titulo}</p>
            <p className="text-lg text-gray-700 bg-white bg-opacity-50 rounded-lg p-4">
            📝 {resultado.descripcion}
            </p>
        </div>
        </motion.div>
    );
}
