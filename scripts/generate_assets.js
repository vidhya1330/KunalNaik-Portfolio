import fs from 'fs';
import path from 'path';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import sharp from 'sharp';

async function generateResumePdf() {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4 size in points
  const { width, height } = page.getSize();

  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Palette
  const navy = rgb(0.04, 0.1, 0.22);
  const charcoal = rgb(0.12, 0.16, 0.23);
  const muted = rgb(0.39, 0.45, 0.54);
  const gold = rgb(0.77, 0.61, 0.15);
  const lightBg = rgb(0.97, 0.98, 0.99);
  const lineCol = rgb(0.88, 0.91, 0.94);

  // Top header banner
  page.drawRectangle({
    x: 0,
    y: height - 120,
    width: width,
    height: 120,
    color: lightBg,
  });

  page.drawLine({
    start: { x: 0, y: height - 120 },
    end: { x: width, y: height - 120 },
    thickness: 1.5,
    color: gold,
  });

  // Name & Title
  page.drawText('KUNAL NAIK', {
    x: 40,
    y: height - 55,
    size: 26,
    font: fontBold,
    color: navy,
  });

  page.drawText('OPERATIONS ASSOCIATE', {
    x: 40,
    y: height - 74,
    size: 11,
    font: fontBold,
    color: gold,
  });

  // Contact info row
  const contactText = 'naikkunal360@gmail.com   |   +91 7678060075   |   Airoli, Maharashtra, India';
  page.drawText(contactText, {
    x: 40,
    y: height - 98,
    size: 9,
    font: fontRegular,
    color: muted,
  });

  let currentY = height - 145;

  function drawSectionHeader(title) {
    page.drawText(title.toUpperCase(), {
      x: 40,
      y: currentY,
      size: 11,
      font: fontBold,
      color: navy,
    });
    page.drawLine({
      start: { x: 40, y: currentY - 5 },
      end: { x: width - 40, y: currentY - 5 },
      thickness: 0.75,
      color: lineCol,
    });
    currentY -= 20;
  }

  // 1. PROFESSIONAL SUMMARY
  drawSectionHeader('Professional Summary');
  const summary =
    'Detail-oriented and process-driven professional with experience in Operations Setup and Order to Cash (O2C) processes. Seeking to contribute and grow in a dynamic organization through rigorous process discipline, production audits, and effective client communication.';
  
  page.drawText(summary.slice(0, 115), {
    x: 40,
    y: currentY,
    size: 9.5,
    font: fontRegular,
    color: charcoal,
  });
  currentY -= 14;
  page.drawText(summary.slice(115), {
    x: 40,
    y: currentY,
    size: 9.5,
    font: fontRegular,
    color: charcoal,
  });
  currentY -= 25;

  // 2. WORK EXPERIENCE
  drawSectionHeader('Work Experience');

  page.drawText('Buzz Works Consultancy', {
    x: 40,
    y: currentY,
    size: 11,
    font: fontBold,
    color: navy,
  });
  page.drawText('August 2024 - Present', {
    x: width - 150,
    y: currentY,
    size: 9,
    font: fontBold,
    color: gold,
  });
  currentY -= 14;

  page.drawText('Operations Associate  |  Location: Airoli', {
    x: 40,
    y: currentY,
    size: 9.5,
    font: fontOblique,
    color: muted,
  });
  currentY -= 16;

  const roleIntro = 'Working in Operations Setup and Order to Cash processes, handling production, audits and client communication for smooth operations and timely delivery.';
  page.drawText(roleIntro, {
    x: 40,
    y: currentY,
    size: 9,
    font: fontRegular,
    color: charcoal,
  });
  currentY -= 16;

  page.drawText('OPERATIONS SETUP:', {
    x: 40,
    y: currentY,
    size: 9,
    font: fontBold,
    color: navy,
  });
  currentY -= 13;

  const opsSetupBullets = [
    'Conducted audit for operations to ensure accuracy and compliance with client requirements.',
    'Handled client calls for queries, clarifications and issue resolution.',
    'Monitored and managed production, ensuring timely and accurate processing of orders.',
    'Assigned production to team members and tracked progress to meet SLA and quality standards.',
    'Maintained detailed records and supported process improvements through regular feedback and reporting.'
  ];

  for (const bullet of opsSetupBullets) {
    page.drawText('•', { x: 50, y: currentY, size: 9, font: fontBold, color: gold });
    page.drawText(bullet, { x: 62, y: currentY, size: 8.5, font: fontRegular, color: charcoal });
    currentY -= 13;
  }

  currentY -= 4;
  page.drawText('ORDER TO CASH (O2C) PROCESS:', {
    x: 40,
    y: currentY,
    size: 9,
    font: fontBold,
    color: navy,
  });
  currentY -= 13;

  const o2cBullets = [
    'Performed production audit to validate accuracy of orders, invoices and receivables.',
    'Managed the complete O2C cycle from order entry to cash application.',
    'Coordinated with internal teams and clients to resolve discrepancies and follow up on pending orders.',
    'Updated systems with accurate data and ensured timely invoice generation and payment collection.',
    'Monitored aging reports and escalated issues to ensure reduced DSO (Days Sales Outstanding).'
  ];

  for (const bullet of o2cBullets) {
    page.drawText('•', { x: 50, y: currentY, size: 9, font: fontBold, color: gold });
    page.drawText(bullet, { x: 62, y: currentY, size: 8.5, font: fontRegular, color: charcoal });
    currentY -= 13;
  }

  currentY -= 12;

  // 3. EDUCATION
  drawSectionHeader('Education');
  page.drawText('Bachelor of Accounting and Finance (BAF)', {
    x: 40,
    y: currentY,
    size: 10,
    font: fontBold,
    color: navy,
  });
  page.drawText('Year of Passing: 2022', {
    x: width - 150,
    y: currentY,
    size: 9,
    font: fontRegular,
    color: muted,
  });
  currentY -= 14;
  page.drawText('Mumbai University', {
    x: 40,
    y: currentY,
    size: 9.5,
    font: fontRegular,
    color: charcoal,
  });
  currentY -= 22;

  // 4. SKILLS & TOOLS
  drawSectionHeader('Skills & Tools');
  page.drawText('Key Competencies:', {
    x: 40,
    y: currentY,
    size: 9,
    font: fontBold,
    color: navy,
  });
  page.drawText('Operations Setup  |  Order to Cash Process  |  Production Audit  |  Client Communication', {
    x: 140,
    y: currentY,
    size: 8.5,
    font: fontRegular,
    color: charcoal,
  });
  currentY -= 14;

  page.drawText('Process & Delivery:', {
    x: 40,
    y: currentY,
    size: 9,
    font: fontBold,
    color: navy,
  });
  page.drawText('Production Assignment & Tracking  |  Process Improvement  |  Data Analysis & Reporting', {
    x: 140,
    y: currentY,
    size: 8.5,
    font: fontRegular,
    color: charcoal,
  });
  currentY -= 14;

  page.drawText('Tools & Software:', {
    x: 40,
    y: currentY,
    size: 9,
    font: fontBold,
    color: navy,
  });
  page.drawText('MS Office (Excel, Word, Outlook)  |  CRM Tools  |  Internal Portals', {
    x: 140,
    y: currentY,
    size: 8.5,
    font: fontRegular,
    color: charcoal,
  });
  currentY -= 22;

  // 5. PERSONAL DETAILS & ADDITIONAL STRENGTHS
  drawSectionHeader('Additional Information & Strengths');
  page.drawText('Strengths:', {
    x: 40,
    y: currentY,
    size: 9,
    font: fontBold,
    color: navy,
  });
  page.drawText('Quick learner with positive attitude  |  Strong communication  |  Committed to process accuracy', {
    x: 100,
    y: currentY,
    size: 8.5,
    font: fontRegular,
    color: charcoal,
  });
  currentY -= 14;

  page.drawText('Languages:', {
    x: 40,
    y: currentY,
    size: 9,
    font: fontBold,
    color: navy,
  });
  page.drawText('English, Hindi, Marathi', {
    x: 100,
    y: currentY,
    size: 8.5,
    font: fontRegular,
    color: charcoal,
  });
  page.drawText('Nationality: Indian   |   DOB: 31 December 2001', {
    x: 280,
    y: currentY,
    size: 8.5,
    font: fontRegular,
    color: muted,
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

async function generateProfileImage() {
  const svg = `
  <svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0a192f"/>
        <stop offset="50%" stop-color="#112240"/>
        <stop offset="100%" stop-color="#1b2a47"/>
      </linearGradient>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f5d77f"/>
        <stop offset="50%" stop-color="#c59b27"/>
        <stop offset="100%" stop-color="#9a7414"/>
      </linearGradient>
      <linearGradient id="suitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#152238"/>
        <stop offset="100%" stop-color="#091322"/>
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="40%" r="50%">
        <stop offset="0%" stop-color="#233554" stop-opacity="0.6"/>
        <stop offset="100%" stop-color="#0a192f" stop-opacity="0"/>
      </radialGradient>
      <filter id="subtleShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="6" stdDeviation="12" flood-color="#000000" flood-opacity="0.35"/>
      </filter>
    </defs>

    <!-- Background Canvas -->
    <rect width="600" height="600" fill="url(#bgGrad)"/>
    <circle cx="300" cy="270" r="240" fill="url(#glow)"/>

    <!-- Subtle Geometric Architecture Elements -->
    <circle cx="300" cy="300" r="270" fill="none" stroke="#233554" stroke-width="1.5" stroke-dasharray="8 8"/>
    <circle cx="300" cy="300" r="285" fill="none" stroke="url(#goldGrad)" stroke-width="1.5" stroke-opacity="0.4"/>

    <!-- Corporate Crest Border -->
    <circle cx="300" cy="300" r="235" fill="none" stroke="url(#goldGrad)" stroke-width="2"/>

    <!-- Professional Stylized Avatar Silhouette -->
    <!-- Shoulders & Suit -->
    <path d="M 170 540 C 170 420, 230 380, 300 380 C 370 380, 430 420, 430 540 Z" fill="url(#suitGrad)" filter="url(#subtleShadow)"/>
    <!-- Suit Lapels -->
    <path d="M 230 410 L 285 530 L 255 540 L 195 440 Z" fill="#1e2d4a"/>
    <path d="M 370 410 L 315 530 L 345 540 L 405 440 Z" fill="#1e2d4a"/>
    <!-- Crisp Shirt V -->
    <polygon points="275,410 325,410 300,470" fill="#f8fafc"/>
    <!-- Corporate Tie in Gold -->
    <polygon points="295,440 305,440 308,530 300,545 292,530" fill="url(#goldGrad)"/>

    <!-- Neck & Head -->
    <rect x="282" y="320" width="36" height="50" rx="8" fill="#d9a577"/>
    <ellipse cx="300" cy="260" rx="65" ry="78" fill="#e0b084"/>
    
    <!-- Hair -->
    <path d="M 230 250 C 230 180, 270 170, 300 170 C 330 170, 370 180, 370 250 C 370 220, 340 185, 300 185 C 260 185, 230 220, 230 250 Z" fill="#1a1c23"/>
    <path d="M 233 240 Q 250 175 300 175 Q 350 175 367 240 Q 360 200 330 185 Q 300 180 270 185 Q 240 200 233 240 Z" fill="#111317"/>

    <!-- Corporate Monogram Badge / Insignia at bottom -->
    <g transform="translate(300, 520)" filter="url(#subtleShadow)">
      <rect x="-110" y="-18" width="220" height="36" rx="18" fill="#071326" stroke="url(#goldGrad)" stroke-width="1.5"/>
      <text x="0" y="5" font-family="Helvetica, Arial, sans-serif" font-size="13" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="2">KUNAL NAIK</text>
    </g>

    <!-- Subtitle Badge -->
    <g transform="translate(300, 555)">
      <text x="0" y="0" font-family="Helvetica, Arial, sans-serif" font-size="10.5" font-weight="600" fill="url(#goldGrad)" text-anchor="middle" letter-spacing="1.5">OPERATIONS ASSOCIATE</text>
    </g>
  </svg>
  `;

  return await sharp(Buffer.from(svg))
    .jpeg({ quality: 95 })
    .toBuffer();
}

async function main() {
  const dirs = [
    path.resolve('assets'),
    path.resolve('public/assets'),
    path.resolve('portfolio/assets'),
    path.resolve('portfolio/css'),
    path.resolve('portfolio/js')
  ];

  for (const dir of dirs) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  console.log('Generating resume PDF...');
  const resumePdfBuffer = await generateResumePdf();
  fs.writeFileSync(path.resolve('assets/resume.pdf'), resumePdfBuffer);
  fs.writeFileSync(path.resolve('public/assets/resume.pdf'), resumePdfBuffer);
  fs.writeFileSync(path.resolve('portfolio/assets/resume.pdf'), resumePdfBuffer);
  console.log('Resume PDF generated successfully at assets/resume.pdf');

  console.log('Generating profile image...');
  const profileJpgBuffer = await generateProfileImage();
  fs.writeFileSync(path.resolve('assets/profile.jpg'), profileJpgBuffer);
  fs.writeFileSync(path.resolve('public/assets/profile.jpg'), profileJpgBuffer);
  fs.writeFileSync(path.resolve('portfolio/assets/profile.jpg'), profileJpgBuffer);
  console.log('Profile JPG generated successfully at assets/profile.jpg');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
