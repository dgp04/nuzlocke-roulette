import { FaHeart } from "react-icons/fa";

export default function VidasDisplay({ vidas }) {
    return (
        <div className="bg-red-100 p-6 rounded-xl shadow-lg border border-red-300 max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-red-700 mb-4 text-center">
            ❤️ Vidas restantes
        </h2>
        {vidas > 10 ? (
            <div className="grid grid-cols-10 gap-x-6 gap-y-8 justify-items-center">
            {Array.from({ length: vidas }).map((_, index) => (
                <FaHeart
                key={index}
                className="text-red-500 drop-shadow-lg"
                size={50}
                />
            ))}
            </div>
        ) : (
            <div className="grid grid-cols-5 gap-x-6 gap-y-8 justify-items-center">
            {Array.from({ length: vidas }).map((_, index) => (
                <FaHeart
                key={index}
                className="text-red-500 drop-shadow-lg"
                size={50}
                />
            ))}
            </div>
        )}
        </div>
    );
}
