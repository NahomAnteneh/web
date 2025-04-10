const { PrismaClient } = require('../src/generated/prisma');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

// Create a hashed password
async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

async function main() {
  // Create roles
  const adminRole = await prisma.role.create({
    data: {
      roleName: 'admin',
      permissions: JSON.stringify({
        users: ['create', 'read', 'update', 'delete'],
        groups: ['create', 'read', 'update', 'delete'],
        projects: ['create', 'read', 'update', 'delete'],
      }),
    },
  });

  const userRole = await prisma.role.create({
    data: {
      roleName: 'user',
      permissions: JSON.stringify({
        users: ['read'],
        groups: ['read'],
        projects: ['read'],
      }),
    },
  });

  const developerRole = await prisma.role.create({
    data: {
      roleName: 'developer',
      permissions: JSON.stringify({
        users: ['read'],
        groups: ['read', 'update'],
        projects: ['create', 'read', 'update'],
      }),
    },
  });

  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      username: 'admin',
      password: await hashPassword('admin123'),
      email: 'admin@example.com',
      firstName: 'Admin',
      lastName: 'User',
      roleId: adminRole.id,
    },
  });

  // Create a regular user
  const regularUser = await prisma.user.create({
    data: {
      username: 'user',
      password: await hashPassword('user123'),
      email: 'user@example.com',
      firstName: 'Regular',
      lastName: 'User',
      roleId: userRole.id,
    },
  });

  // Create a developer user
  const developerUser = await prisma.user.create({
    data: {
      username: 'developer',
      password: await hashPassword('developer123'),
      email: 'developer@example.com',
      firstName: 'Developer',
      lastName: 'User',
      roleId: developerRole.id,
    },
  });

  // Create a group
  const group = await prisma.group.create({
    data: {
      groupName: 'Sample Group',
      leaderId: developerUser.id,
      description: 'A demonstration group',
    },
  });

  // Add members to the group
  await prisma.groupMember.create({
    data: {
      groupId: group.id,
      userId: regularUser.id,
    },
  });

  await prisma.groupMember.create({
    data: {
      groupId: group.id,
      userId: developerUser.id,
    },
  });

  // Create a project
  const project = await prisma.project.create({
    data: {
      groupId: group.id,
      projectName: 'Sample Project',
      description: 'A demonstration project',
      startDate: new Date(),
      endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // One year from now
    },
  });

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 