const verificationHtml = (url: string) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email - Cakranesia</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #fafafa; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fafafa; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);">

              <!-- Header with gradient background -->
              <tr>
                <td style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 40px 30px; text-align: center;">
                  <img src="https://lh3.googleusercontent.com/a/ACg8ocIkwd1ad3gyXT7CvWUnuzLhivhNykUAwy0BmCuJcQ6NUvf15kY=s360-c-no" alt="Cakranesia Logo" style="width: 100px; height: 100px; margin-bottom: 20px; border-radius: 12px;" />
                  <h1 style="margin: 0; color: #1f2937; font-size: 28px; font-weight: 700; letter-spacing: -0.025em;">Cakranesia</h1>
                  <p style="margin: 8px 0 0 0; color: #6b5d03; font-size: 14px; font-weight: 500;">Melestarikan Cita Rasa Indonesia</p>
                </td>
              </tr>

              <!-- Main content -->
              <tr>
                <td style="padding: 40px 30px;">
                  <div style="text-align: center; margin-bottom: 24px;">
                    <div style="display: inline-block; background-color: #fef3c7; border-radius: 50%; padding: 16px;">
                      <span style="font-size: 32px;">🎉</span>
                    </div>
                  </div>

                  <h2 style="margin: 0 0 16px 0; color: #111827; font-size: 24px; font-weight: 600; letter-spacing: -0.025em; text-align: center;">Welcome to Cakranesia!</h2>

                  <p style="margin: 0 0 24px 0; color: #4b5563; font-size: 16px; line-height: 1.6; text-align: center;">
                    Thank you for joining our community of Indonesian cuisine lovers. We're excited to have you on board!
                  </p>

                  <p style="margin: 0 0 32px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                    To get started and unlock all features, please verify your email address by clicking the button below:
                  </p>

                  <!-- CTA Button -->
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                    <tr>
                      <td align="center" style="border-radius: 8px; background: linear-gradient(135deg, #fde047 0%, #facc15 100%);">
                        <a href="${url}" style="display: inline-block; padding: 14px 32px; color: #000000; text-decoration: none; font-weight: 600; font-size: 16px; letter-spacing: -0.025em;">
                          Verify Email Address →
                        </a>
                      </td>
                    </tr>
                  </table>

                  <!-- Benefits section -->
                  <div style="margin: 32px 0; padding: 24px; background-color: #fef3c7; border-radius: 8px;">
                    <p style="margin: 0 0 16px 0; color: #1f2937; font-size: 15px; font-weight: 600;">
                      Once verified, you'll be able to:
                    </p>
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 6px 0;">
                          <span style="color: #6b5d03; font-size: 14px;">✓ Discover authentic Indonesian recipes</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0;">
                          <span style="color: #6b5d03; font-size: 14px;">✓ Share your culinary stories and creations</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0;">
                          <span style="color: #6b5d03; font-size: 14px;">✓ Connect with fellow food enthusiasts</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 6px 0;">
                          <span style="color: #6b5d03; font-size: 14px;">✓ Explore the rich flavors of Nusantara</span>
                        </td>
                      </tr>
                    </table>
                  </div>

                  <p style="margin: 24px 0 16px 0; color: #6b7280; font-size: 14px; line-height: 1.6;">
                    This verification link will expire in <strong style="color: #111827;">24 hours</strong>. If you didn't create an account with Cakranesia, you can safely ignore this email.
                  </p>

                  <!-- Alternative link section -->
                  <div style="margin: 32px 0; padding: 16px; background-color: #f9fafb; border-radius: 8px; border-left: 3px solid #fde047;">
                    <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 13px; font-weight: 500;">
                      Button not working? Copy and paste this link:
                    </p>
                    <p style="margin: 0; color: #3b82f6; font-size: 13px; word-break: break-all; line-height: 1.6;">
                      ${url}
                    </p>
                  </div>
                </td>
              </tr>

              <!-- Footer -->
              <tr>
                <td style="padding: 30px; background-color: #f9fafb; border-top: 1px solid #e5e7eb;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding-bottom: 16px;">
                        <p style="margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6; text-align: center;">
                          Welcome to the Cakranesia family! We're here to help you explore and celebrate Indonesian culinary heritage.
                        </p>
                      </td>
                    </tr>
                    <tr>
                      <td style="text-align: center; padding-top: 16px; border-top: 1px solid #e5e7eb;">
                        <p style="margin: 0 0 8px 0; color: #9ca3af; font-size: 13px;">
                          Questions? Contact us at <a href="mailto:support@cakranesia.com" style="color: #3b82f6; text-decoration: none;">support@cakranesia.com</a>
                        </p>
                        <p style="margin: 0; color: #9ca3af; font-size: 13px;">
                          © ${new Date().getFullYear()} Cakranesia. All rights reserved.
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

export default verificationHtml;
