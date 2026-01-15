"use server";

import { supabase } from "@/lib/supabase";
import { sendEmail } from "@/lib/nodemailer";
import { render } from "@react-email/components";
import RSVPEmail from "@/components/emails/RSVPEmail";

interface SubmitRSVPResult {
    success: boolean;
    message: string;
}

interface InvitationData {
    success: boolean;
    familyName: string | null;
    maxGuests: number;
    status: string | null;
    error?: string;
}

export async function getInvitationData(inviteId: string): Promise<InvitationData> {
    try {
        if (!inviteId || !inviteId.trim()) {
            return {
                success: false,
                familyName: null,
                maxGuests: 2,
                status: null,
                error: "Invalid invitation ID.",
            };
        }

        const { data, error } = await supabase
            .from("invitations")
            .select("family_name, max_guests, status")
            .eq("id", inviteId.trim())
            .single();

        if (error || !data) {
            console.error("Supabase Error fetching invitation:", error);
            return {
                success: false,
                familyName: null,
                maxGuests: 2,
                status: null,
                error: "Invitation not found.",
            };
        }

        return {
            success: true,
            familyName: data.family_name || null,
            maxGuests: data.max_guests || 2,
            status: data.status,
        };
    } catch (error) {
        console.error("Get Invitation Data Error:", error);
        return {
            success: false,
            familyName: null,
            maxGuests: 2,
            status: null,
            error: "An unexpected error occurred.",
        };
    }
}

interface GuestStatusData {
    success: boolean;
    data?: {
        name: string;
        email: string;
        attending: boolean;
        guestCount: number;
    };
    error?: string;
}

export async function checkGuestStatus(query: string): Promise<GuestStatusData> {
    try {
        if (!query || !query.trim()) {
            return {
                success: false,
                error: "Please enter your email or full name.",
            };
        }

        const searchTerm = query.trim().toLowerCase();

        // Search by exact email or case-insensitive name
        // Using ilike for name and eq for email to be precise on email but flexible on name
        // Note: OR logic in Supabase requires distinct filters usually, but we can try .or()
        const { data, error } = await supabase
            .from("guests")
            .select("name, email, attending, guest_count")
            .or(`email.eq.${searchTerm},name.ilike.%${searchTerm}%`)
            .limit(1)
            .single();

        if (error || !data) {
            // It's not necessarily an error if not found, just no result
            return {
                success: false,
                error: "No RSVP found. Please try the email you used or submit a new response.",
            };
        }

        return {
            success: true,
            data: {
                name: data.name,
                email: data.email,
                attending: data.attending,
                guestCount: data.guest_count,
            },
        };

    } catch (error) {
        console.error("Check Guest Status Error:", error);
        return {
            success: false,
            error: "An unexpected error occurred while checking status.",
        };
    }
}

export async function submitRSVP(formData: FormData): Promise<SubmitRSVPResult> {
    try {
        // Step A: Extract form data
        const fullName = formData.get("fullName") as string;
        const email = formData.get("email") as string;
        const guestCount = parseInt(formData.get("guestCount") as string) || 1;
        const attending = formData.get("attending") === "yes";
        const message = formData.get("message") as string;
        const invitationId = formData.get("invitationId") as string | null;

        // Validate required fields
        if (!fullName || !fullName.trim()) {
            return { success: false, message: "Please provide your full name." };
        }
        if (!email || !email.trim()) {
            return { success: false, message: "Please provide your email address." };
        }

        const cleanEmail = email.trim().toLowerCase();

        // Check for existing RSVP with this email
        const { data: existingGuest, error: checkError } = await supabase
            .from("guests")
            .select("id")
            .eq("email", cleanEmail)
            .single();

        if (existingGuest) {
            return {
                success: false,
                message: "An RSVP with this email has already been submitted. Please check your status instead.",
            };
        }

        // Parse additional guests
        const additionalGuestsRaw = formData.get("additionalGuests");
        let additionalGuests: string[] = [];
        if (additionalGuestsRaw) {
            try {
                additionalGuests = JSON.parse(additionalGuestsRaw as string);
            } catch (e) {
                console.error("Failed to parse additional guests", e);
            }
        }

        // Step B: Insert into Supabase
        const guestData: Record<string, unknown> = {
            name: fullName.trim(),
            email: cleanEmail,
            guest_count: guestCount,
            attending,
            message: message?.trim() || null,
            additional_guests: additionalGuests,
        };

        if (invitationId && invitationId.trim()) {
            guestData.invitation_id = invitationId.trim();
        }

        const { error: dbError } = await supabase.from("guests").insert(guestData);

        if (dbError) {
            console.error("Supabase Error:", dbError);
            return {
                success: false,
                message: "Failed to save your RSVP. Please try again.",
            };
        }

        // Step B.2: Lock the invitation if successful
        if (invitationId && invitationId.trim()) {
            console.log("Locking invitation:", invitationId);
            const { error: updateError } = await supabase
                .from("invitations")
                .update({ status: "responded" })
                .eq("id", invitationId.trim());

            if (updateError) {
                console.error("Failed to update invitation status:", updateError);
                // We don't fail the request here as the RSVP is already saved
            }
        }

        // Step C: Send confirmation email
        try {
            const emailHtml = await render(
                RSVPEmail({
                    fullName: fullName.trim(),
                    attending,
                    guestCount,
                })
            );

            await sendEmail({
                to: cleanEmail,
                subject: attending
                    ? "🎉 Your RSVP is Confirmed! | Wedding Celebration"
                    : "Thank You for Your Response | Wedding Celebration",
                html: emailHtml,
            });
        } catch (emailError) {
            console.error("Email Error:", emailError);
        }

        // Step D: Return success
        return {
            success: true,
            message: attending
                ? "Thank you! Your attendance has been confirmed."
                : "Thank you for letting us know. We'll miss you!",
        };
    } catch (error) {
        console.error("Submit RSVP Error:", error);
        return {
            success: false,
            message: "An unexpected error occurred. Please try again.",
        };
    }
}
