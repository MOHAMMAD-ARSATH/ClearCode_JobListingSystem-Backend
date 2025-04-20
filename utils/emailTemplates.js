const generateApplicationEmail = ({ name, jobRole, companyName }) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Application Received</title>
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;600&display=swap" rel="stylesheet">
      <style>
        body {
          font-family: 'Roboto', sans-serif;
          background-color: #f4f6f8;
          margin: 0;
          padding: 0;
        }
        .email-wrapper {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
        }
        .email-header {
          position: relative;
          width: 100%;
          overflow: hidden;
        }
        .email-header img {
          width: 100%;
          height: auto;
          display: block;
        }
        .email-header .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.4);
        }
        .email-content {
          padding: 30px 20px;
        }
        h2 {
          color: #2c3e50;
          font-weight: 600;
        }
        p {
          color: #555;
          line-height: 1.6;
          margin: 10px 0;
        }
        .footer {
          padding: 20px;
          text-align: center;
          font-size: 13px;
          color: #999;
          background-color: #f0f0f0;
        }
        .company {
          color: #007bff;
          font-weight: 500;
        }
  
        @media (max-width: 600px) {
          .email-content {
            padding: 20px 10px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-wrapper">
        <div class="email-header">
          <img src="https://yt3.googleusercontent.com/xk543zkT4CaItVDIBufezBlF3casuaC5yQfyROisI7gm39Awa_YppcXGlyqJKIsPgm1HgfCIH1M=w1707-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj" alt="Email Header">
          <div class="overlay"></div>
        </div>
        <div class="email-content">
          <h2>Hi ${name},</h2>
          <p>Thank you for applying to the position of <strong>${jobRole}</strong> at <span class="company">${companyName}</span>.</p>
          <p>We have successfully received your application.</p>
          <p>Our hiring team will carefully review your resume. If you are shortlisted, we will contact you for the next steps.</p>
          <p>We appreciate your interest in being part of our team.</p>
          <br/>
          <p>Best regards,<br><strong>ClearCode Team</strong></p>
        </div>
        <div class="footer">
          This is an automated message. Please do not reply to this email.
        </div>
      </div>
    </body>
    </html>
    `;
  };
  
  module.exports = generateApplicationEmail;
  