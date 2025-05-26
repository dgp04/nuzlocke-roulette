import { useState, useEffect } from "react"
import Counter from "./Counter"
import Gen7Switch from "./Gen7Switch"
import RouletteComponent from "./RouletteComponent"
import RouletteResult from "./RouletteResult"
import Modal from "./ModalComponent"
import RuleList from "./RuleList"
import EditRuleList from "./EditRuleList"

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

const actualizaciones = [
    {
        version: "v1.1",
        fecha: "26/05/2025",
        titulo: "🌺 Modo Gen 7 (Alola)",
        cambios: [
            "Añadido alternar entre modo clásico y Gen 7 (Recorrido Insular)",
            "Contador híbrido con Pruebas (1 necesaria) y Kahunas (1 necesario)",
            "Colores dinámicos que cambian según el modo seleccionado",
            "Selector interno para alternar entre Pruebas y Kahunas",
            "Guardado de contadores en localStorage para persistencia y mejora de experiencia",
            "Mejoras en la interfaz y animaciones",
            "Añadido contacto para reportar errores o sugerencias al desarrollador mediante enlace a email en esta ventana",
            "Solucionado error que permitía aumentar contadores más allá del límite",
            "Solucionado error al aplicar los colores a algunos contadores",
        ],
    },
    {
        version: "v1.0.1",
        fecha: "25/05/2025",
        titulo: "🎨 Rediseño completo",
        cambios: [
            "Interfaz completamente responsive para móviles y desktop",
            "Editor de reglas en tiempo real",
            "Resultado mostrado encima de la ruleta con botón de cerrar",
            "Textos más grandes y legibles en todos los dispositivos",
            "Animaciones mejoradas y transiciones suaves",
            "Guardado automático de reglas en localStorage para persistencia y mejora de experiencia",
        ],
    },
    {
        version: "v1.0.0",
        fecha: "24/05/2025",
        titulo: "🎯 Lanzamiento inicial",
        cambios: [
            "Ruleta básica con 10 reglas predefinidas con posibilidad de edición",
            "Animación de giro suave y realista",
            "Diseño colorido con segmentos diferenciados",
            "Sistema de contadores para Rutas (3), Gimnasios (1) y Muertes (1)",
            "La ruleta solo se activa al cumplir las condiciones",
            "Reseteo automático de contadores tras usar la ruleta",
            "Indicadores visuales de progreso",
        ],
    },
]

export default function Roulette() {
    const [girando, setGirando] = useState(false)
    const [angulo, setAngulo] = useState(0)
    const [resultado, setResultado] = useState(null)
    const [modalAbierto, setModalAbierto] = useState(false)
    const [modalCerrando, setModalCerrando] = useState(false)

    // Contadores
    const [isGen7Mode, setIsGen7Mode] = useState(false)
    const [contadorRutas, setContadorRutas] = useState(localStorage.getItem("routeCounter") ? parseInt(localStorage.getItem("routeCounter")) : 0)
    const [contadorGimnasios, setContadorGimnasios] = useState(localStorage.getItem("gymCounter") ? parseInt(localStorage.getItem("gymCounter")) : 0)
    const [contadorMuertes, setContadorMuertes] = useState(localStorage.getItem("deathCounter") ? parseInt(localStorage.getItem("deathCounter")) : 0)
    const [contadorPruebas, setContadorPruebas] = useState(localStorage.getItem("questCounter") ? parseInt(localStorage.getItem("questCounter")) : 0)
    const [contadorKahunas, setContadorKahunas] = useState(localStorage.getItem("kahunaCounter") ? parseInt(localStorage.getItem("kahunaCounter")) : 0)
    const [modoKahuna, setModoKahuna] = useState(false)

    // Reglas editables
    const [reglas, setReglas] = useState(reglasUsuario || reglasIniciales)
    const [editando, setEditando] = useState(false)

    useEffect(() => {
        localStorage.setItem("routeCounter", contadorRutas)
        localStorage.setItem("gymCounter", contadorGimnasios)
        localStorage.setItem("deathCounter", contadorMuertes)
        localStorage.setItem("questCounter", contadorPruebas)
        localStorage.setItem("kahunaCounter", contadorKahunas)
    }, [contadorRutas, contadorGimnasios, contadorMuertes, contadorPruebas, contadorKahunas])

    // Verificar si se puede tirar
    const puedeGirar =
        contadorRutas >= 3 ||
        (!isGen7Mode ? contadorGimnasios >= 1 : modoKahuna ? contadorKahunas >= 1 : contadorPruebas >= 1) ||
        contadorMuertes >= 1
    
    const getHybridColors = () => {
        if (!isGen7Mode) {
        return {
            bg: "bg-blue-50",
            border: "border-blue-200",
            title: "text-blue-800",
            counter: "text-blue-600",
            button: "bg-blue-600 hover:bg-blue-700",
            text: "text-blue-700",
        }
        }

        if (modoKahuna) {
        return {
            bg: "bg-yellow-50",
            border: "border-yellow-200",
            title: "text-yellow-800",
            counter: "text-yellow-600",
            button: "bg-yellow-600 hover:bg-yellow-700",
            text: "text-yellow-700",
        }
        } else {
        return {
            bg: "bg-orange-50",
            border: "border-orange-200",
            title: "text-orange-800",
            counter: "text-orange-600",
            button: "bg-orange-600 hover:bg-orange-700",
            text: "text-orange-700",
        }
        }
    }

    const hybridColors = getHybridColors()

    const incrementarContador = (tipo) => {
        if (girando) return

        switch (tipo) {
        case "rutas":
            contadorRutas < 3 ? setContadorRutas((prev) => prev + 1) : setContadorRutas(contadorRutas)
            break
        case "gimnasios":
            contadorGimnasios < 1 ? setContadorGimnasios((prev) => prev + 1) : setContadorGimnasios(contadorGimnasios)
            break
        case "muertes":
            contadorMuertes < 1 ? setContadorMuertes((prev) => prev + 1) : setContadorMuertes(contadorMuertes)
            break
        case "pruebas":
            contadorPruebas < 1 ? setContadorPruebas((prev) => prev + 1) : setContadorPruebas(contadorPruebas)
            break
        case "kahunas":
            contadorKahunas < 1 ? setContadorKahunas((prev) => prev + 1) : setContadorKahunas(contadorKahunas)
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
        if (contadorPruebas >= 1) {
            setContadorPruebas(0)
        }
        if (contadorKahunas >= 1) {
            setContadorKahunas(0)
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

    const cerrarModal = () => {
        setModalCerrando(true)
        setTimeout(() => {
        setModalAbierto(false)
        setModalCerrando(false)
        }, 300)
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
                <div className="flex items-center justify-center sm:justify-start space-x-3">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800">🎮 Ruleta Nuzlocke</h1>
                    <button
                    onClick={() => setModalAbierto(true)}
                    className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full flex items-center justify-center font-bold text-lg sm:text-xl lg:text-2xl transition-all duration-200 shadow-md hover:shadow-lg hover:cursor-pointer"
                    title="Ver actualizaciones"
                    >
                    ?
                    </button>
                </div>
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
                <RouletteResult
                    cerrarResultado={cerrarResultado}
                    resultado={resultado}
                />
            )}

            {/* Contenedor de la ruleta */}
            <RouletteComponent
                reglas={reglas}
                angulo={angulo}
                crearSegmento={crearSegmento}
            />

            <div className="w-full grid grid-cols-3 items-center gap-4">
                {/* Columna izquierda vacía para balance */}
                <div></div>

                {/* Botón centrado en la columna del medio */}
                <div className="flex justify-center">
                    <button
                        className={`px-8 sm:px-12 py-4 sm:py-5 font-bold text-xl sm:text-2xl lg:text-3xl rounded-xl transition-all duration-200 shadow-lg hover:cursor-pointer ${
                        puedeGirar && !girando
                            ? "bg-red-600 text-white hover:bg-red-700 hover:shadow-xl transform hover:scale-105"
                            : "bg-gray-400 text-gray-200 cursor-not-allowed"
                        }`}
                        onClick={girar}
                        disabled={girando || !puedeGirar || editando}
                    >
                        {girando ? "🎲 Girando..." : puedeGirar ? "🎯 Tirar Ruleta" : "🔒 Ruleta Bloqueada"}
                    </button>
                </div>

                {/* Switch en la columna derecha */}
                <Gen7Switch
                    isGen7Mode={isGen7Mode}
                    onChange={setIsGen7Mode}
                    disabled={girando || editando}
                />
            </div>

            {/* Contadores con texto más grande */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full max-w-5xl">
                {/* Contador de Rutas */}
                <Counter
                    title={"🗺️ Rutas"}
                    counter={contadorRutas}
                    onIncrement={() => incrementarContador("rutas")}
                    disabled={girando || editando}
                    text={"+ Ruta Completada"}
                    counterText={`Faltan ${3 - contadorRutas} rutas`}
                    limit={3}
                    color={"green"}
                />

                {/* Contador de Gimnasios/Pruebas/Kahunas (Híbrido) */}
                <div
                className={`${hybridColors.bg} border-2 ${hybridColors.border} rounded-xl p-5 sm:p-7 text-center transition-all duration-300`}
                >
                <h3 className={`text-lg sm:text-xl lg:text-2xl font-bold ${hybridColors.title} mb-3`}>
                    {!isGen7Mode ? "🏟️ Gimnasios" : modoKahuna ? "👑 Kahunas" : "🌺 Pruebas"}
                </h3>

                <div className={`text-3xl sm:text-4xl lg:text-5xl font-bold ${hybridColors.counter} mb-4`}>
                    {!isGen7Mode ? `${contadorGimnasios}/1` : modoKahuna ? `${contadorKahunas}/1` : `${contadorPruebas}/1`}
                </div>

                <button
                    className={`px-4 sm:px-6 py-3 ${hybridColors.button} text-white font-bold text-sm sm:text-base lg:text-lg rounded-lg disabled:opacity-50 transition-all duration-200 w-full sm:w-auto mb-3 hover:cursor-pointer`}
                    onClick={() => incrementarContador(!isGen7Mode ? "gimnasios" : modoKahuna ? "kahunas" : "pruebas")}
                    disabled={girando || editando}
                >
                    {!isGen7Mode ? "+ Gimnasio Vencido" : modoKahuna ? "+ Kahuna Vencido" : "+ Prueba Completada"}
                </button>

                <p className={`text-sm sm:text-base lg:text-lg ${hybridColors.text} mb-3`}>
                    {!isGen7Mode
                    ? contadorGimnasios >= 1
                        ? "¡Listo para tirar!"
                        : "Derrota un líder"
                    : modoKahuna
                        ? contadorKahunas >= 1
                        ? "¡Listo para tirar!"
                        : "Derrota un Kahuna"
                        : contadorPruebas >= 1
                        ? "¡Listo para tirar!"
                        : `Supera una prueba`}
                </p>

                {/* Selector movido abajo */}
                {isGen7Mode && (
                    <div className="flex justify-center">
                        <div className="bg-white rounded-lg p-1 border border-gray-300 shadow-sm">
                            <div className="flex">
                            <button
                                className={`px-3 py-1 text-xs sm:text-sm font-bold rounded transition-all duration-200 hover:cursor-pointer ${
                                !modoKahuna
                                    ? "bg-orange-500 text-white shadow-sm"
                                    : "bg-transparent text-gray-600 hover:bg-gray-300"
                                }`}
                                onClick={() => setModoKahuna(false)}
                                disabled={girando || editando}
                            >
                                🌺 Pruebas
                            </button>
                            <button
                                className={`px-3 py-1 text-xs sm:text-sm font-bold rounded transition-all duration-200 hover:cursor-pointer ${
                                modoKahuna
                                    ? "bg-yellow-500 text-white shadow-sm"
                                    : "bg-transparent text-gray-600 hover:bg-gray-300"
                                }`}
                                onClick={() => setModoKahuna(true)}
                                disabled={girando || editando}
                            >
                                👑 Kahunas
                            </button>
                            </div>
                        </div>
                    </div>
                )}
                </div>

                {/* Contador de Muertes */}
                <Counter
                    title={"💀 Muertes"}
                    counter={contadorMuertes}
                    onIncrement={() => incrementarContador("muertes")}
                    disabled={girando || editando}
                    text={"+ Pokémon Muerto"}
                    counterText={"Sin muertes"}
                    limit={1}
                    color={"purple"}
                />
            </div>

            {/* Editor de reglas con texto más grande */}
            {editando && (
                <EditRuleList
                    agregarRegla={agregarRegla}
                    reglas={reglas}
                    editarRegla={editarRegla}
                    eliminarRegla={eliminarRegla}
                    restaurarReglas={restaurarReglas}
                    colores={colores}
                />
            )}

            {/* Lista de reglas con texto más grande */}
            {!editando && (
                <RuleList
                    reglas={reglas}
                    colores={colores}
                />
            )}
            </div>
        </div>
        {/* Modal de actualizaciones */}
        {modalAbierto && (
            <Modal
                modalCerrando={modalCerrando}
                cerrarModal={cerrarModal}
                actualizaciones={actualizaciones}
            />
        )}
        </div>
    )
}
