
import { HiSparkles, HiSun, HiOutlineInformationCircle } from "react-icons/hi";
import { FaTemperatureLow } from "react-icons/fa";

export default function CareGuidePage() {
    return (
        <div className="w-full min-h-screen bg-primary pt-24 pb-12 px-4 sm:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold text-secondary mb-2 text-center">Care Guide</h1>
                <p className="text-secondary/60 text-center mb-12">How to keep your SoftDreams bedding feeling luxurious for years.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-2xl border border-secondary/10 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center text-xl mb-6">
                            <FaTemperatureLow />
                        </div>
                        <h3 className="text-xl font-bold text-secondary mb-3">Washing</h3>
                        <ul className="space-y-2 text-secondary/70 list-disc list-inside">
                            <li>Machine wash cold on a gentle cycle.</li>
                            <li>Wash with like colors to prevent dye transfer.</li>
                            <li>Use a mild, liquid detergent.</li>
                            <li>Avoid bleach and fabric softeners.</li>
                        </ul>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-secondary/10 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center text-xl mb-6">
                            <HiSun />
                        </div>
                        <h3 className="text-xl font-bold text-secondary mb-3">Drying</h3>
                        <ul className="space-y-2 text-secondary/70 list-disc list-inside">
                            <li>Tumble dry on low heat.</li>
                            <li>Remove promptly to reduce wrinkles.</li>
                            <li>Wool dryer balls are recommended.</li>
                            <li>Avoid over-drying to prevent fiber damage.</li>
                        </ul>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-secondary/10 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-full flex items-center justify-center text-xl mb-6">
                            <HiSparkles />
                        </div>
                        <h3 className="text-xl font-bold text-secondary mb-3">Ironing & Storage</h3>
                        <ul className="space-y-2 text-secondary/70 list-disc list-inside">
                            <li>Iron on low heat if desired.</li>
                            <li>Store in a cool, dry place.</li>
                            <li>Use our cotton storage bag for breathability.</li>
                            <li>Avoid plastic bags for long-term storage.</li>
                        </ul>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-secondary/10 hover:shadow-lg transition-shadow">
                        <div className="w-12 h-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center text-xl mb-6">
                            <HiOutlineInformationCircle />
                        </div>
                        <h3 className="text-xl font-bold text-secondary mb-3">Pro Tips</h3>
                        <ul className="space-y-2 text-secondary/70 list-disc list-inside">
                            <li>Wash new sheets before first use.</li>
                            <li>Rotate sheets weekly for even wear.</li>
                            <li>Spot clean pillows and inserts.</li>
                            <li>Refresh comforters in the sun occasionally.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
