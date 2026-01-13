"use client";

import { motion } from "framer-motion";

export function EntourageSection() {
    const principalSponsors = [
        { male: "Engr. Rodnel O. Tamayo", female: "Mrs. Marietta Cariaga" },
        { male: "Engr. Isidro D. Millo", female: "Mrs. Mary Anne G. Austria" },
        { male: "Engr. Danilo Jasmin", female: "Mrs. Margarita C. Paule" },
        { male: "Mr. Gerardo L. Soriano", female: "Mrs. Alona R. Tresvalles" },
        { male: "Dr. Enrique R. Ostrea", female: "Mrs. Elvin F. Lingad" },
        { male: "Mr. Virgilio C. Macaraeg", female: "Mrs. Adheleen N. Lafferty" },
        { male: "Mr. Rolando Casillan", female: "Mrs. Gina L. Lingad" },
        { male: "Mr. Joel S. Navarro", female: "Mrs. Noemi L. Larracas" },
        { male: "Engr. Jaime Jasmin", female: "Mrs. Concepcion Urrutia-Coching" },
        { male: "Ret. Major Domingo J. Diaz", female: "Dr. Araceli F. Morales" },
        { male: "Mr. Noly L. Dabu", female: "Ms. Corazon D.G. Macam" },
        { male: "Mr. Nito G. Lopez", female: "Mrs. Lani Caranto-Chua" },
        { male: "Engr. Joselito G. Caranto", female: "Ms. Sandra D.C. Lopez" },
        { male: "Dr. Efren Leal Jr.", female: "Mrs. Lorena Leal" },
    ];

    return (
        <section id="entourage" className="bg-wedding-blush">
            <div className="max-w-6xl mx-auto px-6 py-16 md:py-24 lg:py-32">
                {/* Header */}
                <motion.div
                    className="text-center mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <p
                        className="text-wedding-red text-xs tracking-[0.3em] mb-4"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        OUR ENTOURAGE
                    </p>
                    <h2
                        id="entourage-title"
                        className="text-wedding-charcoal text-4xl md:text-5xl lg:text-6xl mb-8"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Those Who Stand With Us
                    </h2>
                    <div className="w-16 h-[1px] bg-wedding-red mx-auto" />
                </motion.div>

                {/* Parents */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Bride's Parents */}
                        <div className="text-center bg-wedding-ivory/50 rounded-xl p-6">
                            <p
                                className="text-wedding-red text-xs tracking-[0.2em] uppercase mb-4"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                Bride&apos;s Parents
                            </p>
                            <p
                                className="text-wedding-charcoal text-base md:text-lg"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Mr. Rolando E. Lopez
                            </p>
                            <p
                                className="text-wedding-slate text-sm"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                &
                            </p>
                            <p
                                className="text-wedding-charcoal text-base md:text-lg"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Mrs. Elenita Lingad-Lopez
                            </p>
                        </div>
                        {/* Groom's Parents */}
                        <div className="text-center bg-wedding-ivory/50 rounded-xl p-6">
                            <p
                                className="text-wedding-red text-xs tracking-[0.2em] uppercase mb-4"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                Groom&apos;s Parents
                            </p>
                            <p
                                className="text-wedding-charcoal text-base md:text-lg"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Engr. Godofredo M. Nardo
                            </p>
                            <p
                                className="text-wedding-slate text-sm"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                &
                            </p>
                            <p
                                className="text-wedding-charcoal text-base md:text-lg"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Mrs. Thelma Jasmin-Nardo
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Principal Sponsors */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                >
                    <h3
                        className="text-wedding-charcoal text-2xl md:text-3xl text-center mb-8"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Principal Sponsors
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                        {principalSponsors.map((pair, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-center gap-3 text-center py-2"
                            >
                                <p
                                    className="text-wedding-slate text-sm md:text-base"
                                    style={{ fontFamily: "var(--font-body)" }}
                                >
                                    {pair.male}
                                </p>
                                <span className="text-wedding-red">&</span>
                                <p
                                    className="text-wedding-slate text-sm md:text-base"
                                    style={{ fontFamily: "var(--font-body)" }}
                                >
                                    {pair.female}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Best Man & Maid of Honor */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
                        <div className="text-center">
                            <p
                                className="text-wedding-red text-xs tracking-[0.2em] uppercase mb-3"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                Best Man
                            </p>
                            <p
                                className="text-wedding-charcoal text-lg"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Glen D. Espeña
                            </p>
                        </div>
                        <div className="text-center">
                            <p
                                className="text-wedding-red text-xs tracking-[0.2em] uppercase mb-3"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                Maid of Honor
                            </p>
                            <p
                                className="text-wedding-charcoal text-lg"
                                style={{ fontFamily: "var(--font-heading)" }}
                            >
                                Alyssa Faye L. Garcia
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Secondary Sponsors - Candle, Veil, Cord */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                >
                    <h3
                        className="text-wedding-charcoal text-xl md:text-2xl text-center mb-2"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        Secondary Sponsors
                    </h3>
                    <p
                        className="text-wedding-dove text-sm italic text-center mb-8"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        Candle, Veil & Cord
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <div className="text-center">
                            <p
                                className="text-wedding-red text-xs tracking-[0.2em] uppercase mb-3"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                Candle
                            </p>
                            <p
                                className="text-wedding-slate text-sm"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                Ivan Timothy J. Folloso
                            </p>
                            <p
                                className="text-wedding-slate text-sm"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                Donet L. Ronquillo
                            </p>
                        </div>
                        <div className="text-center">
                            <p
                                className="text-wedding-red text-xs tracking-[0.2em] uppercase mb-3"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                Veil
                            </p>
                            <p
                                className="text-wedding-slate text-sm"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                Renz Michael L. Lopez
                            </p>
                            <p
                                className="text-wedding-slate text-sm"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                Celina Anne R. Quitlong
                            </p>
                        </div>
                        <div className="text-center">
                            <p
                                className="text-wedding-red text-xs tracking-[0.2em] uppercase mb-3"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                Cord
                            </p>
                            <p
                                className="text-wedding-slate text-sm"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                Paulo N. Aniceto
                            </p>
                            <p
                                className="text-wedding-slate text-sm"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                May Anne E. Lingad
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* Bridesmaids & Groomsmen */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                        <div className="text-center">
                            <p
                                className="text-wedding-red text-xs tracking-[0.2em] uppercase mb-4"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                Bridesmaids
                            </p>
                            <div className="space-y-2">
                                <p className="text-wedding-slate text-sm" style={{ fontFamily: "var(--font-body)" }}>Chyna Mourie N. Valencia</p>
                                <p className="text-wedding-slate text-sm" style={{ fontFamily: "var(--font-body)" }}>Blessie Mae L. Marcella</p>
                                <p className="text-wedding-slate text-sm" style={{ fontFamily: "var(--font-body)" }}>Fatima V. Soriano</p>
                            </div>
                        </div>
                        <div className="text-center">
                            <p
                                className="text-wedding-red text-xs tracking-[0.2em] uppercase mb-4"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                Groomsmen
                            </p>
                            <div className="space-y-2">
                                <p className="text-wedding-slate text-sm" style={{ fontFamily: "var(--font-body)" }}>Kumi Jay N. Leal</p>
                                <p className="text-wedding-slate text-sm" style={{ fontFamily: "var(--font-body)" }}>Ryan Joshua L. Lopez</p>
                                <p className="text-wedding-slate text-sm" style={{ fontFamily: "var(--font-body)" }}>Elljay P. Mutuc</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Flower Girls & Bearers */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                        {/* Flower Girls */}
                        <div className="text-center">
                            <p
                                className="text-wedding-red text-xs tracking-[0.2em] uppercase mb-4"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                Flower Girls
                            </p>
                            <div className="space-y-2">
                                <p className="text-wedding-slate text-sm" style={{ fontFamily: "var(--font-body)" }}>Amanda Chelsea D. Lopez</p>
                                <p className="text-wedding-slate text-sm" style={{ fontFamily: "var(--font-body)" }}>Ma. Paula Joy L. Ronquillo</p>
                                <p className="text-wedding-slate text-sm" style={{ fontFamily: "var(--font-body)" }}>Myiesha Adele S. Macaraeg</p>
                            </div>
                        </div>
                        {/* Bearers */}
                        <div className="text-center">
                            <p
                                className="text-wedding-red text-xs tracking-[0.2em] uppercase mb-4"
                                style={{ fontFamily: "var(--font-body)" }}
                            >
                                Bearers
                            </p>
                            <div className="space-y-2">
                                <p className="text-wedding-slate text-sm" style={{ fontFamily: "var(--font-body)" }}>
                                    <span className="text-wedding-dove">Ring:</span> Cayden Ellino L. Lopez
                                </p>
                                <p className="text-wedding-slate text-sm" style={{ fontFamily: "var(--font-body)" }}>
                                    <span className="text-wedding-dove">Bible:</span> Claud Mason Y. Nardo
                                </p>
                                <p className="text-wedding-slate text-sm" style={{ fontFamily: "var(--font-body)" }}>
                                    <span className="text-wedding-dove">Coin:</span> Varackael Dtres N. Leal
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
