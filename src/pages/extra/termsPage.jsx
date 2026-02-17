
export default function TermsPage() {
    return (
        <div className="w-full min-h-screen bg-primary pt-24 pb-12 px-4 sm:px-8">
            <div className="max-w-4xl mx-auto bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-xl shadow-secondary/5 border border-white/50">
                <h1 className="text-3xl font-bold text-secondary mb-8 pb-4 border-b border-secondary/10">Terms of Service</h1>

                <div className="space-y-6 text-secondary/80 leading-relaxed">
                    <p className="text-sm text-secondary/50">Last updated: {new Date().toLocaleDateString()}</p>

                    <section>
                        <h2 className="text-xl font-bold text-secondary mb-3">1. Introduction</h2>
                        <p>
                            Welcome to SoftDreams. By accessing or using our website, you agree to be bound by these Terms of Service
                            and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from
                            using or accessing this site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-secondary mb-3">2. Use License</h2>
                        <p>
                            Permission is granted to temporarily download one copy of the materials (information or software) on
                            SoftDreams' website for personal, non-commercial transitory viewing only.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-secondary mb-3">3. Disclaimer</h2>
                        <p>
                            The materials on SoftDreams' website are provided on an 'as is' basis. SoftDreams makes no warranties,
                            expressed or implied, and hereby disclaims and negates all other warranties including, without limitation,
                            implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement
                            of intellectual property or other violation of rights.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-secondary mb-3">4. Limitations</h2>
                        <p>
                            In no event shall SoftDreams or its suppliers be liable for any damages (including, without limitation,
                            damages for loss of data or profit, or due to business interruption) arising out of the use or inability
                            to use the materials on SoftDreams' website.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
