const Loader = ({ fullPage = false }) => {
    return (
        <div className={`flex flex-col items-center justify-center ${fullPage ? 'fixed inset-0 bg-white/80 z-[9999]' : 'py-24 w-full'}`}>
            <div className="relative w-16 h-16">
                {[...Array(12)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-full h-full"
                        style={{ transform: `rotate(${i * 30}deg)` }}
                    >
                        <div
                            className="w-2 h-2 bg-[#14A396] rounded-full mx-auto animate-fading-circle shadow-sm"
                            style={{
                                animationDelay: `${i * 0.1}s`,
                            }}
                        ></div>
                    </div>
                ))}
            </div>
            {!fullPage && <p className="mt-8 text-[#14A396] font-bold text-xs animate-pulse tracking-[0.3em] uppercase opacity-60">Caring starts here...</p>}
        </div>
    );
};

export default Loader;
