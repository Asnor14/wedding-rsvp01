"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, Send, Loader2 } from "lucide-react";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { submitRSVP, getInvitationData } from "@/app/actions";
import { ConfirmationModal } from "./ConfirmationModal";

export function RSVPSection() {
    const searchParams = useSearchParams();
    const inviteId = searchParams.get("invite");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        guests: "1",
        attending: "",
        message: "",
    });
    const [showFormModal, setShowFormModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Invitation-specific state
    const [isLoadingInvitation, setIsLoadingInvitation] = useState(false);
    const [invitationId, setInvitationId] = useState<string | null>(null);
    const [maxGuests, setMaxGuests] = useState(2); // Default fallback

    // Fetch invitation data on mount if invite ID exists
    useEffect(() => {
        async function fetchInvitationData() {
            if (!inviteId) return;

            setIsLoadingInvitation(true);
            try {
                const result = await getInvitationData(inviteId);
                if (result.success) {
                    setInvitationId(inviteId);
                    setMaxGuests(result.maxGuests);
                    // Pre-fill family name if available
                    if (result.familyName) {
                        setFormData((prev) => ({
                            ...prev,
                            name: result.familyName!,
                        }));
                    }
                } else {
                    // Invalid invitation - use defaults
                    console.warn("Invalid invitation:", result.error);
                }
            } catch (err) {
                console.error("Error fetching invitation:", err);
            } finally {
                setIsLoadingInvitation(false);
            }
        }

        fetchInvitationData();
    }, [inviteId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            const data = new FormData();
            data.append("fullName", formData.name);
            data.append("email", formData.email);
            data.append("guestCount", formData.guests);
            data.append("attending", formData.attending);
            data.append("message", formData.message);

            // Include invitation_id if available
            if (invitationId) {
                data.append("invitationId", invitationId);
            }

            const result = await submitRSVP(data);

            if (result.success) {
                if (formData.attending === "yes") {
                    setShowConfetti(true);
                    setTimeout(() => setShowConfetti(false), 4000);
                }
                setShowFormModal(false);
                setShowConfirmModal(true);
            } else {
                setError(result.message);
            }
        } catch {
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Generate guest options dynamically based on maxGuests
    const guestOptions = Array.from({ length: maxGuests }, (_, i) => i + 1);

    return (
        <>
            <ConfirmationModal
                isOpen={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                formData={formData}
                showConfetti={showConfetti}
            />

            {/* RSVP Form Modal */}
            <AnimatePresence>
                {showFormModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        onClick={() => setShowFormModal(false)}
                    >
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 50 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-hidden bg-wedding-charcoal border border-wedding-red/30 rounded-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Scrollable inner container */}
                            <div className="overflow-y-auto max-h-[90vh] p-6 md:p-8 modal-scroll">
                                {/* Close Button */}
                                <button
                                    onClick={() => setShowFormModal(false)}
                                    className="absolute top-4 right-4 text-wedding-champagne/60 hover:text-wedding-ivory transition-colors"
                                >
                                    <X size={24} />
                                </button>

                                {/* Header */}
                                <div className="text-center mb-8">
                                    <h2
                                        className="text-wedding-ivory text-4xl md:text-5xl mb-2"
                                        style={{ fontFamily: "var(--font-display)" }}
                                    >
                                        RSVP
                                    </h2>
                                    <p
                                        className="text-wedding-champagne/80 text-sm"
                                        style={{ fontFamily: "var(--font-body)" }}
                                    >
                                        Please respond by January 15, 2026
                                    </p>
                                    {/* Loading invitation indicator */}
                                    {isLoadingInvitation && (
                                        <div className="flex items-center justify-center gap-2 mt-3">
                                            <Loader2 className="animate-spin text-wedding-red" size={16} />
                                            <span
                                                className="text-wedding-red/80 text-xs"
                                                style={{ fontFamily: "var(--font-body)" }}
                                            >
                                                Loading invitation details...
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Full Name */}
                                    <div>
                                        <label
                                            className="block text-wedding-red text-xs tracking-[0.2em] uppercase mb-2"
                                            style={{ fontFamily: "var(--font-body)" }}
                                        >
                                            Your Full Name <span className="text-wedding-red">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-transparent border-b-2 border-wedding-champagne/40 text-wedding-ivory py-3 focus:border-wedding-red focus:outline-none transition-all duration-300 placeholder:text-wedding-champagne/50"
                                            style={{ fontFamily: "var(--font-body)" }}
                                            placeholder="Enter your full name"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label
                                            className="block text-wedding-red text-xs tracking-[0.2em] uppercase mb-2"
                                            style={{ fontFamily: "var(--font-body)" }}
                                        >
                                            Email Address <span className="text-wedding-red">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-transparent border-b-2 border-wedding-champagne/40 text-wedding-ivory py-3 focus:border-wedding-red focus:outline-none transition-all duration-300 placeholder:text-wedding-champagne/50"
                                            style={{ fontFamily: "var(--font-body)" }}
                                            placeholder="your.email@example.com"
                                        />
                                    </div>

                                    {/* Number of Guests */}
                                    <div>
                                        <label
                                            className="block text-wedding-red text-xs tracking-[0.2em] uppercase mb-2"
                                            style={{ fontFamily: "var(--font-body)" }}
                                        >
                                            Number of Guests
                                        </label>
                                        <select
                                            value={formData.guests}
                                            onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                                            className="w-full bg-transparent border-b-2 border-wedding-champagne/40 text-wedding-ivory py-3 focus:border-wedding-red focus:outline-none transition-all duration-300 cursor-pointer"
                                            style={{ fontFamily: "var(--font-body)" }}
                                            disabled={isLoadingInvitation}
                                        >
                                            {guestOptions.map((num) => (
                                                <option key={num} value={num.toString()} className="bg-wedding-charcoal">
                                                    {num === 1
                                                        ? "1 Guest (Just me)"
                                                        : `${num} Guests (Me + ${num - 1})`}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Attendance - Radio Buttons */}
                                    <div>
                                        <label
                                            className="block text-wedding-red text-xs tracking-[0.2em] uppercase mb-4"
                                            style={{ fontFamily: "var(--font-body)" }}
                                        >
                                            Will You Attend? <span className="text-wedding-red">*</span>
                                        </label>
                                        <div className="flex gap-4">
                                            <label
                                                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 ${formData.attending === "yes"
                                                    ? "border-wedding-red bg-wedding-red/20"
                                                    : "border-wedding-champagne/30 hover:border-wedding-champagne/60"
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="attending"
                                                    value="yes"
                                                    checked={formData.attending === "yes"}
                                                    onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                                                    className="sr-only"
                                                    required
                                                />
                                                <Heart
                                                    className={`${formData.attending === "yes" ? "text-wedding-red" : "text-wedding-champagne/50"}`}
                                                    size={18}
                                                    fill={formData.attending === "yes" ? "currentColor" : "none"}
                                                />
                                                <span
                                                    className={`text-xs ${formData.attending === "yes" ? "text-wedding-ivory" : "text-wedding-champagne/70"}`}
                                                    style={{ fontFamily: "var(--font-body)" }}
                                                >
                                                    Accepting
                                                </span>
                                            </label>

                                            <label
                                                className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all duration-300 ${formData.attending === "no"
                                                    ? "border-wedding-dove bg-wedding-dove/20"
                                                    : "border-wedding-champagne/30 hover:border-wedding-champagne/60"
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="attending"
                                                    value="no"
                                                    checked={formData.attending === "no"}
                                                    onChange={(e) => setFormData({ ...formData, attending: e.target.value })}
                                                    className="sr-only"
                                                />
                                                <X
                                                    className={`${formData.attending === "no" ? "text-wedding-dove" : "text-wedding-champagne/50"}`}
                                                    size={18}
                                                />
                                                <span
                                                    className={`text-xs ${formData.attending === "no" ? "text-wedding-ivory" : "text-wedding-champagne/70"}`}
                                                    style={{ fontFamily: "var(--font-body)" }}
                                                >
                                                    Declining
                                                </span>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label
                                            className="block text-wedding-red text-xs tracking-[0.2em] uppercase mb-2"
                                            style={{ fontFamily: "var(--font-body)" }}
                                        >
                                            Message (Optional)
                                        </label>
                                        <textarea
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            rows={3}
                                            className="w-full bg-transparent border-b-2 border-wedding-champagne/40 text-wedding-ivory py-3 focus:border-wedding-red focus:outline-none transition-all duration-300 resize-none placeholder:text-wedding-champagne/50"
                                            style={{ fontFamily: "var(--font-body)" }}
                                            placeholder="Share your wishes..."
                                        />
                                    </div>

                                    {/* Error Message */}
                                    {error && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="bg-red-500/20 border border-red-500/40 rounded-lg p-3"
                                        >
                                            <p
                                                className="text-red-300 text-sm text-center"
                                                style={{ fontFamily: "var(--font-body)" }}
                                            >
                                                {error}
                                            </p>
                                        </motion.div>
                                    )}

                                    {/* Submit Button */}
                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                                        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                                        className={`w-full bg-wedding-red text-wedding-charcoal py-4 text-sm tracking-[0.2em] uppercase font-bold transition-all duration-300 flex items-center justify-center gap-3 rounded-lg shadow-xl ${isSubmitting
                                            ? "opacity-70 cursor-not-allowed"
                                            : "hover:bg-wedding-darkred"
                                            }`}
                                        style={{ fontFamily: "var(--font-body)" }}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg
                                                    className="animate-spin h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    />
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    />
                                                </svg>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={16} />
                                                Send RSVP
                                            </>
                                        )}
                                    </motion.button>
                                </form>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* RSVP Section - CTA Button Only */}
            <section
                id="rsvp"
                className="relative min-h-[70vh] flex items-center justify-center py-16 md:py-24"
            >
                {/* Background */}
                <PlaceholderImage
                    className="absolute inset-0 w-full h-full"
                    label="RSVP Background"
                    variant="rsvp"
                />
                <div className="absolute inset-0 bg-wedding-charcoal/85" />

                {/* Content */}
                <motion.div
                    className="relative z-10 text-center px-6"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2
                        className="text-wedding-ivory text-5xl md:text-6xl lg:text-7xl mb-4"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        RSVP
                    </h2>
                    <p
                        className="text-wedding-champagne/80 text-sm md:text-base mb-8 max-w-md mx-auto"
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        We can&apos;t wait to celebrate with you! Please let us know if you&apos;ll be joining us.
                    </p>

                    {/* Pulsing RSVP Button */}
                    <motion.button
                        id="rsvp-button"
                        onClick={() => setShowFormModal(true)}
                        className="relative bg-wedding-red text-wedding-charcoal px-12 md:px-16 py-4 md:py-5 text-sm md:text-base tracking-[0.2em] uppercase font-bold rounded-lg shadow-xl hover:bg-wedding-darkred transition-colors flex items-center gap-3 mx-auto"
                        style={{ fontFamily: "var(--font-body)" }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        {/* Pulse Ring Animation */}
                        <motion.span
                            className="absolute inset-0 rounded-lg border-2 border-wedding-red"
                            animate={{
                                scale: [1, 1.15, 1.15],
                                opacity: [0.8, 0, 0],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeOut",
                            }}
                        />
                        <motion.span
                            className="absolute inset-0 rounded-lg border-2 border-wedding-red"
                            animate={{
                                scale: [1, 1.25, 1.25],
                                opacity: [0.5, 0, 0],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeOut",
                                delay: 0.3,
                            }}
                        />
                        {/* Send icon - empty space for plane to land */}
                        <motion.span
                            className="relative z-10 w-[18px] h-[18px] flex items-center justify-center"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.5, duration: 0.5 }}
                        >
                            <Send size={18} style={{ transform: "rotate(-45deg)" }} />
                        </motion.span>
                        <span className="relative z-10">Respond Now</span>
                    </motion.button>

                    {/* Gift Message */}
                    <motion.p
                        className="text-wedding-champagne/50 text-xs mt-10 max-w-sm mx-auto italic leading-relaxed"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        style={{ fontFamily: "var(--font-body)" }}
                    >
                        &ldquo;Your presence is already a gift, but if you wish to give, a monetary contribution will help us start our new chapter.&rdquo;
                    </motion.p>

                    {/* Heart Icon */}
                    <div className="flex justify-center mt-6">
                        <Heart className="text-wedding-red/40" size={20} fill="currentColor" />
                    </div>
                </motion.div>
            </section>
        </>
    );
}
