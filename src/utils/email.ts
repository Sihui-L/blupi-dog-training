// Email utility functions for form submissions
// In production, these would integrate with your email service (SendGrid, AWS SES, etc.)

export interface EmailConfig {
  to: string;
  from: string;
  subject: string;
  html: string;
  text?: string;
}

export const sendContactFormEmail = async (formData: any) => {
  // This would integrate with your email service in production
  console.log('Sending contact form email:', formData);
  
  generateContactEmailHTML(formData);

  // In production, you would use your email service here
  // For now, we'll just log it
  return Promise.resolve({ success: true, message: 'Email sent successfully' });
};

export const sendBookingConfirmationEmail = async (bookingData: any) => {
  console.log('Sending booking confirmation:', bookingData);
  
  generateBookingConfirmationHTML(bookingData);
  generateBookingNotificationHTML(bookingData);

  // Send both emails
  return Promise.all([
    Promise.resolve({ success: true }),
    Promise.resolve({ success: true })
  ]);
};

const generateContactEmailHTML = (formData: any) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>New Contact Form Submission</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #134324; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .field { margin-bottom: 15px; }
            .field strong { color: #134324; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>New Contact Form Submission</h1>
            </div>
            <div class="content">
                <div class="field">
                    <strong>Name:</strong> ${formData.firstName} ${formData.lastName}
                </div>
                <div class="field">
                    <strong>Email:</strong> ${formData.email}
                </div>
                ${formData.phone ? `<div class="field"><strong>Phone:</strong> ${formData.phone}</div>` : ''}
                ${formData.volunteerNumber ? `<div class="field"><strong>Volunteer Number:</strong> ${formData.volunteerNumber}</div>` : ''}
                ${formData.dogName ? `<div class="field"><strong>Dog Name:</strong> ${formData.dogName}</div>` : ''}
                ${formData.dogBreed ? `<div class="field"><strong>Dog Breed:</strong> ${formData.dogBreed}</div>` : ''}
                ${formData.healthCheck ? `<div class="field"><strong>Health Check Info:</strong><br>${formData.healthCheck.replace(/\n/g, '<br>')}</div>` : ''}
                ${formData.behaviorIssues ? `<div class="field"><strong>Behavior Issues:</strong><br>${formData.behaviorIssues.replace(/\n/g, '<br>')}</div>` : ''}
                ${formData.developmentBehaviors ? `<div class="field"><strong>Development Behaviors:</strong><br>${formData.developmentBehaviors.replace(/\n/g, '<br>')}</div>` : ''}
                ${formData.message ? `<div class="field"><strong>Message:</strong><br>${formData.message.replace(/\n/g, '<br>')}</div>` : ''}
            </div>
        </div>
    </body>
    </html>
  `;
};

const generateBookingConfirmationHTML = (bookingData: any) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Booking Confirmation</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #134324; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .field { margin-bottom: 15px; }
            .field strong { color: #134324; }
            .highlight { background-color: #33a8a7; color: white; padding: 15px; text-align: center; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Booking Confirmation</h1>
                <p>Thank you for choosing Blupi Dog Training!</p>
            </div>
            <div class="content">
                <div class="highlight">
                    <h2>Your booking has been received!</h2>
                    <p>We'll confirm your appointment within 24 hours.</p>
                </div>
                <div class="field">
                    <strong>Service:</strong> ${bookingData.service || bookingData.serviceType}
                </div>
                <div class="field">
                    <strong>Customer:</strong> ${bookingData.firstName} ${bookingData.lastName}
                </div>
                <div class="field">
                    <strong>Email:</strong> ${bookingData.email}
                </div>
                ${bookingData.phone ? `<div class="field"><strong>Phone:</strong> ${bookingData.phone}</div>` : ''}
                ${bookingData.dogName ? `<div class="field"><strong>Dog Name:</strong> ${bookingData.dogName}</div>` : ''}
                ${bookingData.preferredDate ? `<div class="field"><strong>Preferred Date:</strong> ${bookingData.preferredDate}</div>` : ''}
                ${bookingData.message ? `<div class="field"><strong>Special Requirements:</strong><br>${bookingData.message.replace(/\n/g, '<br>')}</div>` : ''}
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #134324;">
                    <p><strong>What happens next?</strong></p>
                    <ul>
                        <li>We'll review your booking request</li>
                        <li>You'll receive a confirmation email within 24 hours</li>
                        <li>We'll provide preparation instructions before your session</li>
                    </ul>
                    
                    <p>If you have any questions, please don't hesitate to contact us!</p>
                    
                    <p>Best regards,<br>
                    The Blupi Dog Training Team</p>
                </div>
            </div>
        </div>
    </body>
    </html>
  `;
};

const generateBookingNotificationHTML = (bookingData: any) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>New Booking Notification</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #238aa6; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .field { margin-bottom: 15px; }
            .field strong { color: #134324; }
            .urgent { background-color: #ff6b6b; color: white; padding: 10px; margin: 10px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>New Booking Alert</h1>
            </div>
            <div class="content">
                <div class="urgent">
                    <strong>Action Required:</strong> New booking request needs confirmation
                </div>
                
                <div class="field">
                    <strong>Service:</strong> ${bookingData.service || bookingData.serviceType}
                </div>
                <div class="field">
                    <strong>Customer:</strong> ${bookingData.firstName} ${bookingData.lastName}
                </div>
                <div class="field">
                    <strong>Email:</strong> ${bookingData.email}
                </div>
                ${bookingData.phone ? `<div class="field"><strong>Phone:</strong> ${bookingData.phone}</div>` : ''}
                ${bookingData.dogName ? `<div class="field"><strong>Dog Name:</strong> ${bookingData.dogName}</div>` : ''}
                ${bookingData.dogAge ? `<div class="field"><strong>Dog Age:</strong> ${bookingData.dogAge}</div>` : ''}
                ${bookingData.dogBreed ? `<div class="field"><strong>Dog Breed:</strong> ${bookingData.dogBreed}</div>` : ''}
                ${bookingData.preferredDate ? `<div class="field"><strong>Preferred Date:</strong> ${bookingData.preferredDate}</div>` : ''}
                ${bookingData.message ? `<div class="field"><strong>Message:</strong><br>${bookingData.message.replace(/\n/g, '<br>')}</div>` : ''}
                
                <div style="margin-top: 30px; padding: 20px; background-color: #134324; color: white; text-align: center;">
                    <p><strong>Please log into the admin panel to confirm this booking!</strong></p>
                </div>
            </div>
        </div>
    </body>
    </html>
  `;
};