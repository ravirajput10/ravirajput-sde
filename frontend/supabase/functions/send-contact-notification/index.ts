import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactNotificationRequest {
  name: string;
  email: string;
  message: string;
}

// Input validation functions
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function validateInput(data: unknown): { valid: true; data: ContactNotificationRequest } | { valid: false; error: string } {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: "Invalid request body" };
  }

  const { name, email, message } = data as Record<string, unknown>;

  // Check required fields
  if (typeof name !== 'string' || !name.trim()) {
    return { valid: false, error: "Name is required" };
  }
  if (typeof email !== 'string' || !email.trim()) {
    return { valid: false, error: "Email is required" };
  }
  if (typeof message !== 'string' || !message.trim()) {
    return { valid: false, error: "Message is required" };
  }

  // Validate lengths
  const trimmedName = name.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  if (trimmedName.length > 100) {
    return { valid: false, error: "Name must be 100 characters or less" };
  }
  if (trimmedEmail.length > 255) {
    return { valid: false, error: "Email must be 255 characters or less" };
  }
  if (trimmedMessage.length > 5000) {
    return { valid: false, error: "Message must be 5000 characters or less" };
  }

  // Validate email format
  if (!isValidEmail(trimmedEmail)) {
    return { valid: false, error: "Invalid email format" };
  }

  return {
    valid: true,
    data: {
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
    },
  };
}

const handler = async (req: Request): Promise<Response> => {
  console.log("send-contact-notification function called");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const rawData = await req.json();
    
    // Validate input
    const validation = validateInput(rawData);
    if (!validation.valid) {
      console.log("Validation failed:", validation.error);
      return new Response(
        JSON.stringify({ error: validation.error }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { name, email, message } = validation.data;
    
    console.log(`Received valid contact from: ${name} (${email})`);

    // Sanitize content for HTML email
    const sanitizedName = sanitizeHtml(name);
    const sanitizedEmail = sanitizeHtml(email);
    const sanitizedMessage = sanitizeHtml(message);

    // Send notification email to the admin
    // NOTE: Using ravi81rajput@gmail.com because Resend testing mode only allows 
    // sending to your own email. For production, verify a domain at resend.com/domains
    const adminEmail = "ravi81rajput@gmail.com";
    
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: [adminEmail],
        subject: `New Contact Form Submission from ${sanitizedName}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #7c3aed; font-size: 24px; margin-bottom: 20px;">New Contact Form Submission</h1>
            
            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 0 0 10px 0;"><strong>Name:</strong> ${sanitizedName}</p>
              <p style="margin: 0 0 10px 0;"><strong>Email:</strong> <a href="mailto:${sanitizedEmail}" style="color: #7c3aed;">${sanitizedEmail}</a></p>
            </div>
            
            <div style="background-color: #fff; border: 1px solid #e5e7eb; padding: 20px; border-radius: 8px;">
              <h2 style="font-size: 16px; color: #374151; margin: 0 0 10px 0;">Message:</h2>
              <p style="color: #4b5563; line-height: 1.6; margin: 0; white-space: pre-wrap;">${sanitizedMessage}</p>
            </div>
            
            <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                This message was sent from your portfolio contact form.
              </p>
            </div>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Resend API error:", error);
      throw new Error(`Resend API error: ${error}`);
    }

    const emailResponse = await res.json();
    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-notification function:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred processing your request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
