import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

/**
 * Configure email transporter
 * Dynamically reloads .env so changes to SMTP_USER / SMTP_PASS take effect immediately.
 */
let transporter = null;
let activeConfigKey = '';

async function getTransporter() {
  // Reload .env dynamically with override so updates take effect immediately
  dotenv.config({ override: true });

  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();

  // If credentials are NOT provided in .env, do not pretend real SMTP is active
  if (!user || !pass) {
    return null;
  }

  const cleanPass = pass.replace(/\s+/g, '');
  const configKey = `${user}:${cleanPass}:${process.env.SMTP_HOST || 'gmail'}:${process.env.SMTP_PORT || '587'}`;

  // Reuse transporter if config has not changed
  if (transporter && activeConfigKey === configKey) {
    return transporter;
  }

  const isGmail = process.env.SMTP_SERVICE === 'gmail' ||
                  process.env.SMTP_HOST?.includes('gmail') ||
                  user.endsWith('@gmail.com');

  try {
    if (isGmail && (!process.env.SMTP_HOST || process.env.SMTP_HOST === 'smtp.gmail.com')) {
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user,
          pass: cleanPass
        }
      });
    } else {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: {
          user,
          pass: cleanPass
        }
      });
    }

    activeConfigKey = configKey;
    console.log(`[EMAIL SERVICE] Initialized SMTP transporter for: ${user}`);
    return transporter;
  } catch (err) {
    console.error('[EMAIL SERVICE] Failed to initialize SMTP transporter:', err.message);
    transporter = null;
    activeConfigKey = '';
    return null;
  }
}

/**
 * Send 6-digit OTP code for password reset
 */
export async function sendOtpEmail({ email, name, otp }) {
  const fromAddress = process.env.EMAIL_FROM || process.env.SMTP_USER || '"DeutschHub" <no-reply@deutschhub.org>';
  const displayName = name?.trim() || 'Learner';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset Code - DeutschHub</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 24px; }
          .container { max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .flag-strip { height: 6px; background: linear-gradient(to right, #111827 33.3%, #ef4444 33.3%, #ef4444 66.6%, #f59e0b 66.6%); }
          .content { padding: 36px 32px; }
          .brand { font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 20px; }
          h1 { font-size: 22px; font-weight: 800; color: #0f172a; margin: 0 0 12px 0; }
          p { font-size: 14px; line-height: 1.6; color: #475569; margin: 0 0 20px 0; }
          .otp-box { text-align: center; margin: 28px 0; padding: 24px; background: #f8fafc; border: 2px dashed #059669; border-radius: 12px; }
          .otp-code { font-family: 'Courier New', Courier, monospace; font-size: 38px; font-weight: 800; letter-spacing: 10px; color: #059669; margin: 0; }
          .otp-hint { font-size: 12px; font-weight: 600; color: #64748b; margin-top: 10px; margin-bottom: 0; }
          .footer { padding: 20px 32px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="flag-strip"></div>
          <div class="content">
            <div class="brand">DeutschHub</div>
            <h1>Password Reset Verification</h1>
            <p>Hallo ${displayName},</p>
            <p>We received a request to reset the password for your DeutschHub account. Please copy the 6-digit verification code below to verify your request:</p>
            
            <div class="otp-box">
              <div class="otp-code">${otp}</div>
              <p class="otp-hint">Valid for 10 minutes</p>
            </div>

            <p style="font-size: 13px; color: #64748b;">
              Paste this code into the DeutschHub verification screen. Once verified, you will be prompted to enter your new password.
            </p>
            <p style="font-size: 12px; color: #94a3b8; margin-top: 24px; margin-bottom: 0;">
              If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged.
            </p>
          </div>
          <div class="footer">
            DeutschHub — Open Education for German Learners.
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const mailClient = await getTransporter();

    if (!mailClient) {
      console.warn('\n================================================================');
      console.warn('[EMAIL WARNING] SMTP credentials are not configured in server/.env!');
      console.warn(`Target email: ${email}`);
      console.warn('Real emails will NOT be sent until SMTP_USER and SMTP_PASS are set.');
      console.warn(`[DEV OTP BACKUP] For testing, your 6-digit OTP code is: ${otp}`);
      console.warn('================================================================\n');

      return {
        success: false,
        notConfigured: true,
        error: 'SMTP credentials are not configured in server/.env (SMTP_USER or SMTP_PASS is missing).'
      };
    }

    const info = await mailClient.sendMail({
      from: fromAddress,
      to: email,
      subject: `Your DeutschHub Password Reset Code: ${otp}`,
      text: `Your DeutschHub password reset code is: ${otp}. It expires in 10 minutes.`,
      html: htmlContent
    });

    console.log(`[EMAIL SERVICE] Password reset OTP successfully sent to ${email} (Message ID: ${info.messageId})`);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error(`[EMAIL SERVICE] Error delivering OTP email to ${email}:`, err.message);
    if (err.message?.includes('535') || err.message?.includes('Invalid login') || err.message?.includes('Username and Password not accepted')) {
      console.error('[EMAIL HINT] Gmail rejected login credentials. Please ensure:');
      console.error('1. You enabled 2-Step Verification on your Google Account.');
      console.error('2. You generated a 16-character App Password (Google Account > Security > App Passwords).');
      console.error('3. You pasted the App Password in SMTP_PASS in server/.env (not your regular account password).');
    }
    return { success: false, error: err.message };
  }
}

/**
 * Send account registration / email verification link
 */
export async function sendVerificationEmail({ email, name, verificationUrl }) {
  const fromAddress = process.env.EMAIL_FROM || process.env.SMTP_USER || '"DeutschHub" <no-reply@deutschhub.org>';
  const displayName = name?.trim() || 'Learner';

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirm Your DeutschHub Account</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #1e293b; margin: 0; padding: 24px; }
          .container { max-width: 540px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05); }
          .flag-strip { height: 6px; background: linear-gradient(to right, #111827 33.3%, #ef4444 33.3%, #ef4444 66.6%, #f59e0b 66.6%); }
          .content { padding: 36px 32px; }
          .brand { font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 20px; }
          h1 { font-size: 22px; font-weight: 800; color: #0f172a; margin: 0 0 12px 0; }
          p { font-size: 14px; line-height: 1.6; color: #475569; margin: 0 0 20px 0; }
          .btn-container { text-align: center; margin: 32px 0; }
          .btn { display: inline-block; background-color: #059669; color: #ffffff !important; font-size: 14px; font-weight: 700; text-decoration: none; padding: 13px 32px; border-radius: 10px; box-shadow: 0 2px 4px rgba(5,150,105,0.25); }
          .btn:hover { background-color: #047857; }
          .raw-link { word-break: break-all; font-family: monospace; font-size: 12px; background: #f1f5f9; padding: 12px; border-radius: 8px; color: #334155; border: 1px solid #e2e8f0; }
          .footer { padding: 20px 32px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="flag-strip"></div>
          <div class="content">
            <div class="brand">DeutschHub</div>
            <h1>Willkommen, ${displayName}! 🇩🇪</h1>
            <p>Thank you for creating your free account on DeutschHub — the complete German learning platform.</p>
            <p>Please click the button below to verify your email address and activate your account:</p>
            <div class="btn-container">
              <a href="${verificationUrl}" class="btn" target="_blank">Activate My Account »</a>
            </div>
            <p style="font-size: 12px; color: #64748b;">
              Or copy and paste this verification link into your web browser:
            </p>
            <div class="raw-link">${verificationUrl}</div>
            <p style="font-size: 12px; color: #94a3b8; margin-top: 24px; margin-bottom: 0;">
              This link is valid for 24 hours. If you did not create this account, you can safely ignore this email.
            </p>
          </div>
          <div class="footer">
            DeutschHub — Open Education for German Learners.
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    const mailClient = await getTransporter();

    if (!mailClient) {
      console.warn('\n================================================================');
      console.warn('[EMAIL WARNING] SMTP credentials are not configured in server/.env!');
      console.warn(`Target email: ${email}`);
      console.warn(`[DEV ACTIVATION LINK]: ${verificationUrl}`);
      console.warn('================================================================\n');

      return {
        success: false,
        notConfigured: true,
        error: 'SMTP credentials are not configured in server/.env.',
        verificationUrl
      };
    }

    const info = await mailClient.sendMail({
      from: fromAddress,
      to: email,
      subject: 'Confirm Your DeutschHub Account (Activation Link)',
      text: `Willkommen, ${displayName}! Please verify your email by clicking: ${verificationUrl}`,
      html: htmlContent
    });

    console.log(`[EMAIL SERVICE] Registration activation link sent to ${email} (Message ID: ${info.messageId})`);
    return {
      success: true,
      messageId: info.messageId,
      verificationUrl
    };
  } catch (err) {
    console.error('[EMAIL SERVICE] Error sending verification email:', err.message);
    return {
      success: false,
      error: err.message,
      verificationUrl
    };
  }
}
