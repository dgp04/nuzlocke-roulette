export default function RouletteComponent({ reglas, angulo, crearSegmento }){
    return (
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
    )
}