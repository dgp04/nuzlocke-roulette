import { useState, useEffect, useRef } from "react"
import Counter from "./Counter"
import Gen7Switch from "./Gen7Switch"
import RouletteComponent from "./RouletteComponent"
import RouletteResult from "./RouletteResult"
import Modal from "./ModalComponent"
import RuleList from "./RuleList"
import EditRuleList from "./EditRuleList"
import VidasDisplay from "./VidasComponent"
import { AnimatePresence } from "framer-motion"

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
        version: "v1.2.1",
        fecha: "19/09/2025",
        titulo: "🎲 Mejora en el sistema de castigos",
        cambios: [
            "Ahora puedes tener múltiples castigos abiertos simultáneamente",
            "Al tirar la ruleta con un castigo activo este no se borra permitiendo acumular varios castigos",
            "Cada castigo solo se elimina al pulsar el botón de Cumplido (✅) en su tarjeta correspondiente",
            "Mejora del diseño de los resultados con una animación de entrada y salida",
            "Solucionado error de resultados duplicados al tirar de la ruleta",
        ]
    },
    {
        version: "v1.2",
        fecha: "10/08/2025",
        titulo: "❤️ Contador de vidas personalizable",
        cambios: [
            "Añadido botón de configuración para personalizar el número de vidas iniciales",
            "El contador de vidas se actualiza automáticamente al iniciar un nuevo Nuzlocke",
            "Las vidas se almacenan para nunca perder la cuenta de ellas",
            "Al morir un Pokémon y sumarlo al contador, la vida se resta automáticamente",
            "Capacidad de añadir entre 1 y 50 vidas a tu Locke",
            "Añaddido un contenedor donde se muestran las vidas restantes"
        ]
    },
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
            "Botón de editar reglas desplazado a la parte superior de la lista de reglas para un diseño más accesible y lógico",
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
    const [resultados, setResultados] = useState([])
    const [tipoModal, setTipoModal] = useState("")
    const [modalAbierto, setModalAbierto] = useState(false)
    const [modalCerrando, setModalCerrando] = useState(false)
    const [vidas, setVidas] = useState(localStorage.getItem("nuzlocke_vidas"))
    const [vidasRestantes, setVidasRestantes] = useState()
    const audioRef = useRef(null);

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
    
    // Leer las vidas de localStorage al montar el componente
    useEffect(() => {
        const vidasGuardadas = localStorage.getItem("nuzlocke_vidas");
        if (vidasGuardadas) {
            setVidas(Number(vidasGuardadas));
        }
    }, []);

    // Guardar vidas en localStorage cada vez que cambien
    useEffect(() => {
        localStorage.setItem("nuzlocke_vidas", vidas);
    }, [vidas]);

    // Al cambiar configuración (vidasTotales), reseteamos vidasRestantes
    useEffect(() => {
        setVidasRestantes(vidas);
    }, [vidas]);

    const reproducirAudio = () => {
        if (audioRef.current) {
        audioRef.current.currentTime = 0; // Reiniciar para poder reproducir rápido varias veces
        audioRef.current.play();
        }
    };

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
            if (contadorMuertes < 1) {
                setContadorMuertes(prev => prev + 1);
                reproducirAudio()
                setVidasRestantes(prev => {
                const nuevasVidas = Math.max(prev - 1, 0);
                localStorage.setItem("nuzlocke_vidas", nuevasVidas);
                return nuevasVidas;
                });
            }
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

    const cerrarResultado = (id) => {
        // Después de la duración de la animación, lo eliminamos
        setTimeout(() => {
            setResultados((prev) => prev.filter((r) => r.id !== id));
        }, 400); // 400ms = duración de exit
    };


    const girar = () => {
        if (girando || !puedeGirar) return

        const segmentos = reglas.length
        const anguloPorSegmento = 360 / segmentos
        const seleccion = Math.floor(Math.random() * segmentos)

        const anguloObjetivo = 90 - (seleccion * anguloPorSegmento + anguloPorSegmento / 2)
        const rotacionFinal = 360 * 5 + anguloObjetivo

        setGirando(true)
        setAngulo((prev) => prev + rotacionFinal)

        setTimeout(() => {
            const nuevoResultado = {
                id: Date.now(), // importante invocar
                titulo: reglas[seleccion].titulo,
                descripcion: reglas[seleccion].descripcion
            };

            setResultados((prev) => {
                // Evitar añadir la misma regla exacta
                if (prev.some(r => r.titulo === reglas[seleccion].titulo)) {
                    return prev;
                }
                return [...prev, nuevoResultado];
            });
            setGirando(false)
            resetearContadores()
        }, 3000)
        console.log(resultados)
    }


    const editarRegla = (index, campo, valor) => {
        const nuevasReglas = [...reglas]
        nuevasReglas[index] = { ...nuevasReglas[index], [campo]: valor }
        setReglas(nuevasReglas)
        localStorage.setItem("reglasUsuario", JSON.stringify(nuevasReglas))
    }

    const agregarRegla = () => {
        if (reglas.length < 12) {
            setReglas([...reglas, { titulo: "", descripcion: "" }])
            localStorage.setItem("reglasUsuario", JSON.stringify([...reglas, { titulo: "", descripcion: "" }]))
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

    function handleReiniciar() {
        setVidasRestantes(vidas);
        setContadorMuertes(0);
    }

    let disableButton = contadorMuertes > 0 && true || false

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
                    {/* Botón actualizaciones */}
                    <button
                    onClick={() => { setTipoModal("actualizaciones"); setModalAbierto(true); }}
                    className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full flex items-center justify-center font-bold text-lg sm:text-xl lg:text-2xl transition-all duration-200 shadow-md hover:shadow-lg hover:cursor-pointer"
                    title="Ver actualizaciones"
                    >
                    ?
                    </button>

                    {/* Botón configuración */}
                    <button
                    onClick={() => { setTipoModal("configuracion"); setModalAbierto(true); }}
                    className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full flex items-center justify-center text-lg sm:text-xl lg:text-2xl transition-all duration-200 shadow-md hover:shadow-lg hover:cursor-pointer"
                    title="Configuración"
                    >
                    ⚙️
                    </button>
                    <a
                        href="https://github.com/dgp04/nuzlocke-roulette"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-all duration-200 shadow-md hover:shadow-lg hover:cursor-pointer"
                        title="Ver en GitHub"
                    >
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                        </svg>
                    </a>
                </div>
                
            </div>

            <p className="text-center text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg lg:text-xl">
                La ruleta se activa al cumplir cualquiera de las condiciones
            </p>

            <div className="flex flex-col items-center space-y-6 sm:space-y-8">
                {resultados.length > 0 && (
                    <div className="flex flex-col items-center space-y-6 sm:space-y-8 w-full">
                        <AnimatePresence>
                        {resultados.map((resultado) => (
                            <RouletteResult
                            key={resultado.id}
                            cerrarResultado={() => cerrarResultado(resultado.id)}
                            resultado={resultado}
                            />
                        ))}
                        </AnimatePresence>
                    </div>
                )}


                {/* Contenedor de la ruleta */}
                <RouletteComponent
                    reglas={reglas}
                    angulo={angulo}
                    crearSegmento={crearSegmento}
                />

            <div className="w-full flex flex-col items-center gap-4 sm:grid sm:grid-cols-3 sm:items-center sm:gap-6">
                {/* Columna izquierda vacía para balance en desktop */}
                <div className="hidden sm:block"></div>

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
                <div className="flex justify-center sm:justify-start">
                    <Gen7Switch isGen7Mode={isGen7Mode} onChange={setIsGen7Mode} disabled={girando || editando} />
                </div>
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

                { vidasRestantes > 0 ? (
                    <>
                        {/* Contador de Muertes */}
                        <audio ref={audioRef} src="/sounds/yarrr.mp3" preload="auto" />
                        <Counter
                            title={"💀 Muertes"}
                            counter={contadorMuertes}
                            onIncrement={() => incrementarContador("muertes")}
                            disabled={girando || editando || disableButton}
                            text={"+ Pokémon Muerto"}
                            counterText={"Sin muertes"}
                            limit={1}
                            color={"purple"}
                        />
                    </>
                ) : (
                    <>
                        {/* Contador de Reinicio */}
                        <Counter
                            title={"Has perdido todas tus vidas"}
                            onIncrement={() => handleReiniciar()}
                            disabled={girando || editando || disableButton}
                            text={"Reiniciar Locke"}
                            counterText={"Fin del Locke"}
                            color={"purple"}
                        />
                    </>
                )}
            </div>

            {/*Contenedor de vidas*/}
            <div className="mt-6 sm:mt-8">
                <VidasDisplay vidas={vidasRestantes} setVidas={setVidas} />
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
                    editando={editando}
                    girando={girando}
                    setEditando={setEditando}
                />
            )}

            {/* Lista de reglas con texto más grande */}
            {!editando && (
                <RuleList
                    reglas={reglas}
                    colores={colores}
                    editando={editando}
                    girando={girando}
                    setEditando={setEditando}
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
                tipo={tipoModal}
                vidas={vidas}
                setVidas={setVidas}
            />
        )}
        </div>
    )
}
