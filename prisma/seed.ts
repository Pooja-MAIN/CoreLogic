import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
  const adminPass = await bcrypt.hash('Admin123!', 10);
  await prisma.user.upsert({
    where: { email: 'admin@chipverse.test' },
    update: {},
    create: {
      email: 'admin@chipverse.test',
      name: 'Admin',
      password: adminPass,
      role: 'admin'
    }
  });

  await prisma.article.createMany({
    data: [
      {
        title: 'Intro to Verilog: Modules and Always Blocks',
        content: 'Verilog basics: modules, ports, always blocks, initial blocks. Example: ...',
        tags: ['verilog','rtl','beginner']
      },
      {
        title: 'Timing Closure Basics (STA)',
        content: 'Static timing analysis (STA) overview: setup, hold, slack, constraints...',
        tags: ['sta','physical-design']
      }
    ]
  });

  await prisma.mcq.createMany({
    data: [
      {
        question: 'What is the default net type in Verilog if not specified?',
        options: JSON.stringify(['wire','reg','logic','tri']),
        answer: 0,
        explanation: 'By default nets are of type wire in Verilog.'
      },
      {
        question: 'Which process is used for place and route?',
        options: JSON.stringify(['Synthesis','Floorplanning','Routing','Packing']),
        answer: 2,
        explanation: 'Routing is the detailed placement for nets on the routing resources.'
      }
    ]
  });

  await prisma.challenge.create({
    data: {
      title: 'Sum of Two Numbers',
      description: 'Given two integers, output their sum. Input: two space-separated integers. Output: an integer.',
      language: 'javascript',
      difficulty: 'easy',
      testcases: [
        { input: '2 3', output: '5' },
        { input: '10 -4', output: '6' }
      ]
    }
  });

  await prisma.verilogProblem.create({
    data: {
      title: '2-bit Adder Module',
      description: 'Implement a 2-bit adder module named adder2 that takes inputs a[1:0], b[1:0] and outputs sum[2:0].',
      checkerHint: 'Check module name `adder2` and that result is a 3-bit bus named sum.'
    }
  });

  console.log('Seeding complete.');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
