import { useState } from "react"

const reglasIniciales = [
    {
        titulo: "💀 Doble tragedia",
        descripcion: "Pierdes otro Pokémon al azar",
    },
    {
        titulo: "📦 Boxeo forzoso",
        descripcion: "Un Pokémon al azar al PC durante 3 rutas",
    },
    {
        titulo: "🛑 Sin objetos",
        descripcion: "No puedes usar objetos en el próximo combate importante",
    },
    {
        titulo: "🚫 Captura bloqueada",
        descripcion: "Pierdes el siguiente encuentro de ruta",
    },
    {
        titulo: "😴 Fatiga severa",
        descripcion: "El Pokémon más usado o de más nivel descansa 2 rutas",
    },
    {
        titulo: "🔁 Intercambio obligado",
        descripcion: "Cambia 2 del equipo por 2 del PC",
    },
    {
        titulo: "🐣 Regla del desafío",
        descripcion: "El siguiente Pokémon que captures debe ser de un tipo diferente al último Pokémon que murió",
    },
    {
        titulo: "🤐 Silencio táctico",
        descripcion: "Solo puedes usar 2 movimientos por Pokémon en el próximo combate",
    },
    {
        titulo: "🎲 Locura táctica",
        descripcion: "Solo puedes usar el primer ataque de cada Pokémon en el próximo combate",
    },
    {
        titulo: "🍀 Bendición",
        descripcion: "Recuperas una vida (máximo 10)",
    },
]

const reglasUsuario = localStorage.getItem("reglasUsuario")
    ? JSON.parse(localStorage.getItem("reglasUsuario"))
    : null

const colores = [
    "#ef4444",
    "#3b82f6",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
    "#6366f1",
    "#f97316",
    "#14b8a6",
    "#06b6d4",
]

export default function Roulette() {
    const [girando, setGirando] = useState(false)
    const [angulo, setAngulo] = useState(0)
    const [resultado, setResultado] = useState(null)

    // Contadores
    const [contadorRutas, setContadorRutas] = useState(0)
    const [contadorGimnasios, setContadorGimnasios] = useState(0)
    const [contadorMuertes, setContadorMuertes] = useState(0)

    // Reglas editables
    const [reglas, setReglas] = useState(reglasUsuario || reglasIniciales)
    const [editando, setEditando] = useState(false)

    // Verificar si se puede tirar
    const puedeGirar = contadorRutas >= 3 || contadorGimnasios >= 1 || contadorMuertes >= 1

    const incrementarContador = (tipo) => {
        if (girando) return

        switch (tipo) {
        case "rutas":
            setContadorRutas((prev) => prev + 1)
            break
        case "gimnasios":
            setContadorGimnasios((prev) => prev + 1)
            break
        case "muertes":
            setContadorMuertes((prev) => prev + 1)
            break
        }
    }

    const resetearContadores = () => {
        if (contadorRutas >= 3) {
        setContadorRutas(0)
        }
        if (contadorGimnasios >= 1) {
        setContadorGimnasios(0)
        }
        if (contadorMuertes >= 1) {
        setContadorMuertes(0)
        }
    }

    const cerrarResultado = () => {
        setResultado(null)
    }

    const girar = () => {
        if (girando || !puedeGirar) return

        const segmentos = reglas.length
        const anguloPorSegmento = 360 / segmentos
        const seleccion = Math.floor(Math.random() * segmentos)

        const anguloObjetivo = 90 - (seleccion * anguloPorSegmento + anguloPorSegmento / 2)
        const rotacionFinal = 360 * 5 + anguloObjetivo

        setResultado(null)
        setGirando(true)
        setAngulo((prev) => prev + rotacionFinal)

        setTimeout(() => {
        setResultado(reglas[seleccion])
        setGirando(false)
        resetearContadores()
        }, 3000)
    }

    const editarRegla = (index, campo, valor) => {
        const nuevasReglas = [...reglas]
        nuevasReglas[index] = { ...nuevasReglas[index], [campo]: valor }
        setReglas(nuevasReglas)
        localStorage.setItem("reglasUsuario", JSON.stringify(nuevasReglas))
    }

    const agregarRegla = () => {
        if (reglas.length < 12) {
            setReglas([...reglas, { titulo: "✨ Nueva regla", descripcion: "Describe aquí el efecto de la regla" }])
            localStorage.setItem("reglasUsuario", JSON.stringify([...reglas, { titulo: "✨ Nueva regla", descripcion: "Describe aquí el efecto de la regla" }]))
        }
    }

    const eliminarRegla = (index) => {
        if (reglas.length > 3) {
        const nuevasReglas = reglas.filter((_, i) => i !== index)
        setReglas(nuevasReglas)
        localStorage.setItem("reglasUsuario", JSON.stringify(nuevasReglas))
        }
    }

    const restaurarReglas = () => {
        setReglas(reglasIniciales)
    }

    const crearSegmento = (index) => {
        const anguloPorSegmento = 360 / reglas.length
        const anguloInicio = index * anguloPorSegmento
        const anguloFin = (index + 1) * anguloPorSegmento

        const radianes1 = (anguloInicio * Math.PI) / 180
        const radianes2 = (anguloFin * Math.PI) / 180

        const radio = 280
        const radioInterno = 40

        const x1 = 300 + radio * Math.cos(radianes1)
        const y1 = 300 + radio * Math.sin(radianes1)
        const x2 = 300 + radio * Math.cos(radianes2)
        const y2 = 300 + radio * Math.sin(radianes2)

        const x1Interno = 300 + radioInterno * Math.cos(radianes1)
        const y1Interno = 300 + radioInterno * Math.sin(radianes1)
        const x2Interno = 300 + radioInterno * Math.cos(radianes2)
        const y2Interno = 300 + radioInterno * Math.sin(radianes2)

        const largeArcFlag = anguloPorSegmento > 180 ? 1 : 0
        const pathData = [
        `M ${x1Interno} ${y1Interno}`,
        `L ${x1} ${y1}`,
        `A ${radio} ${radio} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        `L ${x2Interno} ${y2Interno}`,
        `A ${radioInterno} ${radioInterno} 0 ${largeArcFlag} 0 ${x1Interno} ${y1Interno}`,
        "Z",
        ].join(" ")

        const anguloMedio = (anguloInicio + anguloFin) / 2
        const radioTexto = 180
        const xTexto = 300 + radioTexto * Math.cos((anguloMedio * Math.PI) / 180)
        const yTexto = 300 + radioTexto * Math.sin((anguloMedio * Math.PI) / 180)

        // Tamaños de fuente más grandes y adaptativos
        const fontSize = reglas.length > 10 ? 16 : reglas.length > 8 ? 18 : reglas.length > 6 ? 20 : 22

        return (
        <g key={index}>
            <path d={pathData} fill={colores[index % colores.length]} stroke="#ffffff" strokeWidth="2" />
            <text
            x={xTexto}
            y={yTexto}
            fill="white"
            fontSize={fontSize}
            fontWeight="bold"
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(${anguloMedio}, ${xTexto}, ${yTexto})`}
            >
            {reglas[index].titulo}
            </text>
        </g>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex flex-col items-center justify-center p-2 sm:p-4">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 w-full max-w-7xl">
            {/* Header con texto más grande */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 space-y-2 sm:space-y-0">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 text-center sm:text-left">
                🎮 Ruleta Nuzlocke
            </h1>
            <button
                className={`px-4 sm:px-6 py-3 font-bold text-base sm:text-lg lg:text-xl rounded-lg transition-all duration-200 hover:cursor-pointer ${
                editando ? "bg-green-600 text-white hover:bg-green-700" : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                onClick={() => setEditando(!editando)}
                disabled={girando}
            >
                {editando ? "✅ Guardar" : "✏️ Editar Reglas"}
            </button>
            </div>

            <p className="text-center text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg lg:text-xl">
            La ruleta se activa al cumplir cualquiera de las condiciones
            </p>

            <div className="flex flex-col items-center space-y-6 sm:space-y-8">
            {/* Resultado encima de la ruleta con botón de cerrar */}
            {resultado && (
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
            )}

            {/* Contenedor de la ruleta */}
            <div className="relative w-full flex justify-center">
                {/* Ruleta SVG */}
                <div className="relative">
                <svg
                    width="350"
                    height="350"
                    viewBox="0 0 600 600"
                    className="w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] lg:w-[650px] lg:h-[650px] drop-shadow-2xl transition-transform duration-[3000ms] ease-out"
                    style={{
                    transform: `rotate(${angulo}deg)`,
                    }}
                >
                    {/* Borde exterior */}
                    <circle cx="300" cy="300" r="290" fill="none" stroke="#1f2937" strokeWidth="20" />

                    {/* Segmentos */}
                    {reglas.map((_, index) => crearSegmento(index))}

                    {/* Centro */}
                    <circle cx="300" cy="300" r="40" fill="#1f2937" stroke="#ffffff" strokeWidth="4" />

                    {/* Logo central más grande */}
                    <text
                    x="300"
                    y="310"
                    fill="white"
                    fontSize="28"
                    fontWeight="bold"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    >
                    </text>
                </svg>
                </div>
            </div>

            {/* Botón de girar más grande */}
            <button
                className={`px-8 sm:px-12 py-4 sm:py-5 font-bold text-xl sm:text-2xl lg:text-3xl rounded-xl transition-all duration-200 shadow-lg w-full sm:w-auto hover:cursor-pointer ${
                puedeGirar && !girando
                    ? "bg-red-600 text-white hover:bg-red-700 hover:shadow-xl transform hover:scale-105"
                    : "bg-gray-400 text-gray-200 cursor-not-allowed"
                }`}
                onClick={girar}
                disabled={girando || !puedeGirar || editando}
            >
                {girando ? "🎲 Girando..." : puedeGirar ? "🎯 Tirar Ruleta" : "🔒 Ruleta Bloqueada"}
            </button>

            {/* Contadores con texto más grande */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-5xl">
                {/* Contador de Rutas */}
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5 sm:p-7 text-center">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-green-800 mb-3">🗺️ Rutas</h3>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-600 mb-4">{contadorRutas}/3</div>
                <button
                    className="px-4 sm:px-6 py-3 bg-green-600 text-white font-bold text-sm sm:text-base lg:text-lg rounded-lg hover:bg-green-700 disabled:opacity-50 transition-all duration-200 w-full sm:w-auto hover:cursor-pointer"
                    onClick={() => incrementarContador("rutas")}
                    disabled={girando || editando}
                >
                    + Ruta Completada
                </button>
                <p className="text-sm sm:text-base lg:text-lg text-green-700 mt-3">
                    {contadorRutas >= 3 ? "¡Listo para tirar!" : `Faltan ${3 - contadorRutas} rutas`}
                </p>
                </div>

                {/* Contador de Gimnasios */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-5 sm:p-7 text-center">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-800 mb-3">🏟️ Gimnasios</h3>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-blue-600 mb-4">{contadorGimnasios}/1</div>
                <button
                    className="px-4 sm:px-6 py-3 bg-blue-600 text-white font-bold text-sm sm:text-base lg:text-lg rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-all duration-200 w-full sm:w-auto hover:cursor-pointer"
                    onClick={() => incrementarContador("gimnasios")}
                    disabled={girando || editando}
                >
                    + Gimnasio Vencido
                </button>
                <p className="text-sm sm:text-base lg:text-lg text-blue-700 mt-3">
                    {contadorGimnasios >= 1 ? "¡Listo para tirar!" : "Derrota un líder"}
                </p>
                </div>

                {/* Contador de Muertes */}
                <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-5 sm:p-7 text-center">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-800 mb-3">💀 Muertes</h3>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-purple-600 mb-4">{contadorMuertes}/1</div>
                <button
                    className="px-4 sm:px-6 py-3 bg-purple-600 text-white font-bold text-sm sm:text-base lg:text-lg rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-all duration-200 w-full sm:w-auto hover:cursor-pointer"
                    onClick={() => incrementarContador("muertes")}
                    disabled={girando || editando}
                >
                    + Pokémon Muerto
                </button>
                <p className="text-sm sm:text-base lg:text-lg text-purple-700 mt-3">
                    {contadorMuertes >= 1 ? "¡Listo para tirar!" : "Sin muertes aún"}
                </p>
                </div>
            </div>

            {/* Editor de reglas con texto más grande */}
            {editando && (
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
            )}

            {/* Lista de reglas con texto más grande */}
            {!editando && (
                <div className="bg-gray-100 p-5 sm:p-7 rounded-lg w-full">
                <h3 className="font-bold text-xl sm:text-2xl lg:text-3xl mb-5 text-gray-800">
                    📋 Reglas actuales ({reglas.length}):
                </h3>
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
            )}
            </div>
        </div>
        </div>
    )
}
