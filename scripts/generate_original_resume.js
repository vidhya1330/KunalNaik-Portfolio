import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { PDFDocument } from 'pdf-lib';

async function generateOriginalResume() {
  // A4 dimensions at 2x resolution (1587 x 2245 px)
  const width = 1240;
  const height = 1754;

  const svg = `
  <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <style>
        .title { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 46px; font-weight: 800; fill: #0f388a; letter-spacing: -0.5px; }
        .subtitle { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 20px; font-weight: 700; fill: #002d72; letter-spacing: 2.5px; }
        .meta-text { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14.5px; fill: #1e293b; font-weight: 500; }
        .summary-text { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15.5px; font-style: italic; fill: #003366; line-height: 1.45; }
        .section-header-text { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 17px; font-weight: 800; fill: #0a3d91; letter-spacing: 0.8px; }
        .item-title { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 17px; font-weight: 700; fill: #002d72; }
        .item-subtitle { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; font-weight: 600; fill: #1e293b; }
        .body-text { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; fill: #334155; line-height: 1.4; }
        .bullet-title { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 700; fill: #0a3d91; }
        .tag-pill { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 13.5px; font-weight: 700; fill: #003366; }
      </style>
      <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0b3888"/>
        <stop offset="100%" stop-color="#1453b8"/>
      </linearGradient>
      <linearGradient id="bannerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#dbeafe"/>
        <stop offset="100%" stop-color="#eff6ff"/>
      </linearGradient>
      <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.08"/>
      </filter>
    </defs>

    <!-- Background -->
    <rect width="${width}" height="${height}" fill="#ffffff"/>

    <!-- TOP SECTION -->
    <!-- Name and Title -->
    <text x="60" y="90" class="title">Kunal Naik</text>
    <text x="62" y="122" class="subtitle">OPERATIONS ASSOCIATE</text>

    <!-- Top Contact Details Box -->
    <g transform="translate(60, 140)">
      <!-- Phone icon -->
      <circle cx="16" cy="14" r="14" fill="#003b94"/>
      <path d="M12 9 C11.5 9 11 9.5 11 10 C11 14.5 14.5 18 19 18 C19.5 18 20 17.5 20 17 L18.5 14.5 L16.5 15.5 C15.5 15 14 13.5 13.5 12.5 L14.5 10.5 Z" fill="#ffffff"/>
      <text x="38" y="19" class="meta-text">7678060075</text>

      <!-- Email icon -->
      <g transform="translate(160, 0)">
        <rect x="0" y="0" width="28" height="28" rx="6" fill="#003b94"/>
        <path d="M6 8 L22 8 C23 8 23 9 23 10 L23 18 C23 19 22 20 21 20 L7 20 C6 20 5 19 5 18 L5 10 C5 9 6 8 6 8 Z" fill="none" stroke="#ffffff" stroke-width="1.5"/>
        <path d="M5 9 L14 15 L23 9" fill="none" stroke="#ffffff" stroke-width="1.5"/>
        <text x="38" y="19" class="meta-text">naikkunal360@gmail.com</text>
      </g>

      <!-- DOB icon -->
      <g transform="translate(430, 0)">
        <rect x="0" y="0" width="28" height="28" rx="6" fill="#003b94"/>
        <rect x="5" y="7" width="18" height="15" rx="2" fill="none" stroke="#ffffff" stroke-width="1.5"/>
        <line x1="5" y1="11" x2="23" y2="11" stroke="#ffffff" stroke-width="1.5"/>
        <text x="38" y="19" class="meta-text">DOB: 31 December 2001</text>
      </g>
    </g>

    <!-- Location line -->
    <g transform="translate(60, 185)">
      <circle cx="16" cy="14" r="14" fill="#003b94"/>
      <path d="M16 7 C13 7 11 9 11 12 C11 16 16 21 16 21 C16 21 21 16 21 12 C21 9 19 7 16 7 Z M16 14 C14.9 14 14 13.1 14 12 C14 10.9 14.9 10 16 10 C17.1 10 18 10.9 18 12 C18 13.1 17.1 14 16 14 Z" fill="#ffffff"/>
      <text x="38" y="19" class="meta-text"><tspan font-weight="700">Location:</tspan> Airoli (Job Location)</text>
    </g>

    <!-- Professional Summary Box (Top Right) -->
    <g transform="translate(770, 48)">
      <line x1="0" y1="0" x2="0" y2="140" stroke="#003b94" stroke-width="1.5"/>
      <text x="20" y="24" class="summary-text">Detail-oriented and</text>
      <text x="20" y="48" class="summary-text">process-driven professional</text>
      <text x="20" y="72" class="summary-text">with experience in Operations</text>
      <text x="20" y="96" class="summary-text">Setup (Operations) and</text>
      <text x="20" y="120" class="summary-text">Order to Cash process, seeking</text>
      <text x="20" y="144" class="summary-text">to contribute and grow in a</text>
      <text x="20" y="168" class="summary-text">dynamic organization.</text>
    </g>

    <!-- Horizontal Divider -->
    <line x1="60" y1="240" x2="${width - 60}" y2="240" stroke="#003b94" stroke-width="2"/>

    <!-- ========================================== -->
    <!-- LEFT COLUMN (X: 60 to 450) -->
    <!-- ========================================== -->

    <!-- 1. EDUCATION -->
    <g transform="translate(60, 270)">
      <!-- Header Banner -->
      <rect x="0" y="0" width="370" height="38" rx="6" fill="#e0ecfb"/>
      <circle cx="24" cy="19" r="16" fill="#003b94"/>
      <!-- Cap icon -->
      <path d="M14 18 L24 13 L34 18 L24 23 Z M29 20.5 L29 24 C29 25.5 26.5 27 24 27 C21.5 27 19 25.5 19 24 L19 20.5" fill="#ffffff"/>
      <text x="50" y="25" class="section-header-text">EDUCATION</text>

      <!-- Content -->
      <text x="10" y="65" class="item-title">Bachelor of Accounting and Finance</text>
      <text x="10" y="88" class="item-title">(BAF)</text>
      <text x="10" y="115" class="item-subtitle" font-weight="700">Mumbai University</text>
      <text x="10" y="138" class="body-text">Year of Passing: 2022</text>
    </g>

    <!-- Left Divider 1 -->
    <line x1="60" y1="440" x2="430" y2="440" stroke="#bfdbfe" stroke-width="1.5"/>

    <!-- 2. SKILLS -->
    <g transform="translate(60, 465)">
      <!-- Header Banner -->
      <rect x="0" y="0" width="370" height="38" rx="6" fill="#e0ecfb"/>
      <circle cx="24" cy="19" r="16" fill="#003b94"/>
      <!-- Gear icon -->
      <circle cx="24" cy="19" r="5" fill="#ffffff"/>
      <text x="50" y="25" class="section-header-text">SKILLS</text>

      <!-- Skill Bullets -->
      <g transform="translate(10, 60)">
        <circle cx="5" cy="5" r="3.5" fill="#003b94"/>
        <text x="20" y="10" class="body-text" font-weight="600">Operations Setup</text>

        <circle cx="5" cy="38" r="3.5" fill="#003b94"/>
        <text x="20" y="43" class="body-text" font-weight="600">Order to Cash Process</text>

        <circle cx="5" cy="71" r="3.5" fill="#003b94"/>
        <text x="20" y="76" class="body-text" font-weight="600">Production Audit</text>

        <circle cx="5" cy="104" r="3.5" fill="#003b94"/>
        <text x="20" y="109" class="body-text" font-weight="600">Client Calls &amp; Communication</text>

        <circle cx="5" cy="137" r="3.5" fill="#003b94"/>
        <text x="20" y="142" class="body-text" font-weight="600">Production Assignment &amp; Tracking</text>

        <circle cx="5" cy="170" r="3.5" fill="#003b94"/>
        <text x="20" y="175" class="body-text" font-weight="600">Process Improvement</text>

        <circle cx="5" cy="203" r="3.5" fill="#003b94"/>
        <text x="20" y="208" class="body-text" font-weight="600">Data Analysis &amp; Reporting</text>

        <circle cx="5" cy="236" r="3.5" fill="#003b94"/>
        <text x="20" y="241" class="body-text" font-weight="600">MS Office (Excel, Word, Outlook)</text>

        <circle cx="5" cy="269" r="3.5" fill="#003b94"/>
        <text x="20" y="274" class="body-text" font-weight="600">Time Management</text>

        <circle cx="5" cy="302" r="3.5" fill="#003b94"/>
        <text x="20" y="307" class="body-text" font-weight="600">Team Collaboration</text>
      </g>
    </g>

    <!-- Left Divider 2 -->
    <line x1="60" y1="835" x2="430" y2="835" stroke="#bfdbfe" stroke-width="1.5"/>

    <!-- 3. PERSONAL DETAILS -->
    <g transform="translate(60, 860)">
      <!-- Header Banner -->
      <rect x="0" y="0" width="370" height="38" rx="6" fill="#e0ecfb"/>
      <circle cx="24" cy="19" r="16" fill="#003b94"/>
      <!-- User icon -->
      <circle cx="24" cy="15" r="4.5" fill="#ffffff"/>
      <path d="M17 25 C17 21 21 21 24 21 C27 21 31 21 31 25" fill="#ffffff"/>
      <text x="50" y="25" class="section-header-text">PERSONAL DETAILS</text>

      <g transform="translate(10, 60)" font-family="Helvetica, Arial, sans-serif" font-size="14.5px">
        <text x="0" y="10" fill="#1e293b" font-weight="600">Full Name</text>
        <text x="110" y="10" fill="#1e293b">:</text>
        <text x="130" y="10" fill="#0f172a" font-weight="700">Kunal Naik</text>

        <text x="0" y="38" fill="#1e293b" font-weight="600">Phone No.</text>
        <text x="110" y="38" fill="#1e293b">:</text>
        <text x="130" y="38" fill="#0f172a">7678060075</text>

        <text x="0" y="66" fill="#1e293b" font-weight="600">Email</text>
        <text x="110" y="66" fill="#1e293b">:</text>
        <text x="130" y="66" fill="#0f172a">naikkunal360@gmail.com</text>

        <text x="0" y="94" fill="#1e293b" font-weight="600">Date of Birth</text>
        <text x="110" y="94" fill="#1e293b">:</text>
        <text x="130" y="94" fill="#0f172a">31 December 2001</text>

        <text x="0" y="122" fill="#1e293b" font-weight="600">Nationality</text>
        <text x="110" y="122" fill="#1e293b">:</text>
        <text x="130" y="122" fill="#0f172a">Indian</text>

        <text x="0" y="150" fill="#1e293b" font-weight="600">Languages</text>
        <text x="110" y="150" fill="#1e293b">:</text>
        <text x="130" y="150" fill="#0f172a">English, Hindi, Marathi</text>

        <text x="0" y="178" fill="#1e293b" font-weight="600">Job Location</text>
        <text x="110" y="178" fill="#1e293b">:</text>
        <text x="130" y="178" fill="#0f172a">Airoli</text>
      </g>
    </g>

    <!-- Bottom Motto line -->
    <g transform="translate(60, 1110)">
      <line x1="0" y1="0" x2="370" y2="0" stroke="#93c5fd" stroke-width="1.5"/>
      <text x="185" y="24" font-family="Helvetica, Arial, sans-serif" font-size="14px" font-style="italic" fill="#003b94" text-anchor="middle" font-weight="600">— Focused  |  Dedicated  |  Growth Mindset —</text>
    </g>

    <!-- Vertical Column Divider -->
    <line x1="465" y1="260" x2="465" y2="1680" stroke="#bfdbfe" stroke-width="1.5"/>

    <!-- ========================================== -->
    <!-- RIGHT COLUMN (X: 495 to 1180) -->
    <!-- ========================================== -->

    <!-- 1. WORK EXPERIENCE -->
    <g transform="translate(495, 270)">
      <!-- Header Banner -->
      <rect x="0" y="0" width="685" height="38" rx="6" fill="#e0ecfb"/>
      <circle cx="24" cy="19" r="16" fill="#003b94"/>
      <!-- Briefcase icon -->
      <rect x="16" y="14" width="16" height="11" rx="1.5" fill="#ffffff"/>
      <path d="M20 14 L20 12 C20 11 21 10 22 10 L26 10 C27 10 28 11 28 12 L28 14" fill="none" stroke="#ffffff" stroke-width="1.5"/>
      <text x="50" y="25" class="section-header-text">WORK EXPERIENCE</text>

      <!-- Company & Role -->
      <text x="10" y="66" class="title" font-size="24px" fill="#0f388a">Buzz Works Consultancy</text>
      <text x="10" y="94" class="subtitle" font-size="19px" fill="#002d72">Operations Associate</text>

      <!-- Dates & Location line -->
      <g transform="translate(10, 112)">
        <rect x="0" y="0" width="20" height="20" rx="3" fill="#003b94"/>
        <rect x="4" y="5" width="12" height="11" rx="1" fill="none" stroke="#ffffff" stroke-width="1"/>
        <text x="30" y="15" class="body-text" font-weight="700" fill="#0f172a">August 2024 – Present</text>

        <g transform="translate(220, 0)">
          <circle cx="10" cy="10" r="10" fill="#003b94"/>
          <circle cx="10" cy="9" r="3" fill="#ffffff"/>
          <text x="28" y="15" class="body-text"><tspan font-weight="700">Location:</tspan> Airoli</text>
        </g>
      </g>

      <!-- Overview paragraph -->
      <text x="10" y="160" class="body-text" font-size="14.5px" fill="#1e293b">
        Working in Operations Setup and Order to Cash processes, handling production, audits and client communication
      </text>
      <text x="10" y="182" class="body-text" font-size="14.5px" fill="#1e293b">
        for smooth operations and timely delivery.
      </text>

      <!-- Subheader: OPERATIONS SETUP -->
      <g transform="translate(10, 215)">
        <rect x="0" y="0" width="665" height="28" rx="4" fill="#eaf2fd"/>
        <text x="16" y="19" class="tag-pill">OPERATIONS SETUP</text>

        <g transform="translate(10, 48)">
          <circle cx="5" cy="5" r="3.5" fill="#003b94"/>
          <text x="20" y="10" class="body-text">Conducted audit for operations to ensure accuracy and compliance with client requirements.</text>

          <circle cx="5" cy="36" r="3.5" fill="#003b94"/>
          <text x="20" y="41" class="body-text">Handled client calls for queries, clarifications and issue resolution.</text>

          <circle cx="5" cy="67" r="3.5" fill="#003b94"/>
          <text x="20" y="72" class="body-text">Monitored and managed production, ensuring timely and accurate processing of orders.</text>

          <circle cx="5" cy="98" r="3.5" fill="#003b94"/>
          <text x="20" y="103" class="body-text">Assigned production to team members and tracked progress to meet SLA and quality standards.</text>

          <circle cx="5" cy="129" r="3.5" fill="#003b94"/>
          <text x="20" y="134" class="body-text">Maintained detailed records and supported process improvements through regular feedback and reporting.</text>
        </g>
      </g>

      <!-- Subheader: ORDER TO CASH (O2C) PROCESS -->
      <g transform="translate(10, 410)">
        <rect x="0" y="0" width="665" height="28" rx="4" fill="#eaf2fd"/>
        <text x="16" y="19" class="tag-pill">ORDER TO CASH (O2C) PROCESS</text>

        <g transform="translate(10, 48)">
          <circle cx="5" cy="5" r="3.5" fill="#003b94"/>
          <text x="20" y="10" class="body-text">Performed production audit to validate accuracy of orders, invoices and receivables.</text>

          <circle cx="5" cy="36" r="3.5" fill="#003b94"/>
          <text x="20" y="41" class="body-text">Managed the complete O2C cycle from order entry to cash application.</text>

          <circle cx="5" cy="67" r="3.5" fill="#003b94"/>
          <text x="20" y="72" class="body-text">Coordinated with internal teams and clients to resolve discrepancies and follow up on pending orders.</text>

          <circle cx="5" cy="98" r="3.5" fill="#003b94"/>
          <text x="20" y="103" class="body-text">Updated systems with accurate data and ensured timely invoice generation and payment collection.</text>

          <circle cx="5" cy="129" r="3.5" fill="#003b94"/>
          <text x="20" y="134" class="body-text">Monitored aging reports and escalated issues to ensure reduced DSO (Days Sales Outstanding).</text>
        </g>
      </g>
    </g>

    <!-- 2. TOOLS & TECHNOLOGIES -->
    <g transform="translate(495, 890)">
      <!-- Header Banner -->
      <rect x="0" y="0" width="685" height="38" rx="6" fill="#e0ecfb"/>
      <circle cx="24" cy="19" r="16" fill="#003b94"/>
      <!-- Tools icon -->
      <circle cx="24" cy="19" r="6" fill="none" stroke="#ffffff" stroke-width="2"/>
      <text x="50" y="25" class="section-header-text">TOOLS &amp; TECHNOLOGIES</text>

      <g transform="translate(20, 62)">
        <circle cx="5" cy="5" r="3.5" fill="#003b94"/>
        <text x="20" y="10" class="body-text" font-size="15px">
          <tspan font-weight="700" fill="#0a3d91">MS Office</tspan> (Excel, Word, Outlook)   <tspan fill="#94a3b8">|</tspan>   <tspan font-weight="700" fill="#0a3d91">CRM Tools</tspan>   <tspan fill="#94a3b8">|</tspan>   <tspan font-weight="700" fill="#0a3d91">Internal Portals</tspan>
        </text>
      </g>
    </g>

    <!-- 3. ADDITIONAL STRENGTHS -->
    <g transform="translate(495, 1020)">
      <!-- Header Banner -->
      <rect x="0" y="0" width="685" height="38" rx="6" fill="#e0ecfb"/>
      <circle cx="24" cy="19" r="16" fill="#003b94"/>
      <!-- Star icon -->
      <polygon points="24,11 26,16 31,17 27,21 28,26 24,23 20,26 21,21 17,17 22,16" fill="#ffffff"/>
      <text x="50" y="25" class="section-header-text">ADDITIONAL STRENGTHS</text>

      <g transform="translate(20, 60)">
        <circle cx="5" cy="5" r="3.5" fill="#003b94"/>
        <text x="20" y="10" class="body-text" font-size="14.5px">Quick learner with a positive attitude</text>

        <circle cx="5" cy="36" r="3.5" fill="#003b94"/>
        <text x="20" y="41" class="body-text" font-size="14.5px">Ability to work independently and in a team</text>

        <circle cx="5" cy="67" r="3.5" fill="#003b94"/>
        <text x="20" y="72" class="body-text" font-size="14.5px">Strong communication and interpersonal skills</text>

        <circle cx="5" cy="98" r="3.5" fill="#003b94"/>
        <text x="20" y="103" class="body-text" font-size="14.5px">Committed to process accuracy and client satisfaction</text>
      </g>
    </g>
  </svg>
  `;

  // Render SVG to high-res PNG
  const pngBuffer = await sharp(Buffer.from(svg))
    .png({ quality: 100 })
    .toBuffer();

  // Create standard A4 PDF containing this exact resume
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // A4
  const pngImage = await pdfDoc.embedPng(pngBuffer);

  page.drawImage(pngImage, {
    x: 0,
    y: 0,
    width: 595.28,
    height: 841.89,
  });

  const pdfBytes = await pdfDoc.save();

  const paths = [
    path.resolve('assets/resume.pdf'),
    path.resolve('public/assets/resume.pdf'),
    path.resolve('portfolio/assets/resume.pdf'),
    path.resolve('dist/assets/resume.pdf')
  ];

  for (const p of paths) {
    const dir = path.dirname(p);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(p, pdfBytes);
  }

  console.log('Original exact resume PDF generated successfully in all asset directories!');
}

generateOriginalResume().catch(err => {
  console.error(err);
  process.exit(1);
});
