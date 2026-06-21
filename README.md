# ChipVerse MVP

This repository contains an MVP scaffold for ChipVerse — a learning and practice platform for VLSI, HDL, embedded, and programming students.

Quickstart

1. Install Node (>=18) and a PostgreSQL database.
2. Copy environment example:

   cp .env.example .env

   Fill DATABASE_URL, JWT_SECRET and OPENAI_API_KEY (optional).

3. Install dependencies:

   npm install

4. Prisma migrate and seed:

   npx prisma generate
   npx prisma migrate dev --name init
   npm run prisma:seed

5. Run dev server:

   npm run dev

Default admin seeded: admin@chipverse.test / Admin123!

Notes
- Do NOT commit real secrets. Use .env and GitHub secrets for production.
- Verilog auto-evaluation is a placeholder; integrate iverilog/Verilator in Docker for real checks.
