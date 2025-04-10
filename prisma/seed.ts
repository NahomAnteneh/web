import { PrismaClient } from '../src/generated/prisma';
const prisma = new PrismaClient();

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
      // In a real application, use a proper password hashing mechanism
      password: '$2a$10$GQF3MrJtYEwN0bK.Pc.NF.sCnbLyFGDQAZ9q9bB5wlh6q5D2z2X26', // password: "admin123"
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
      // In a real application, use a proper password hashing mechanism
      password: '$2a$10$QPHVz3VHiCY8tE1eGC6QJuv5qCXJk/z.vBElvXVDh0jPwFCwGZD2a', // password: "user123"
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
      // In a real application, use a proper password hashing mechanism
      password: '$2a$10$UHfWu9ReCjj2Uy46vOO/xOhwS1g0SJfQnNMzskrStNGZqcl2F8IOa', // password: "developer123"
      email: 'developer@example.com',
      firstName: 'Developer',
      lastName: 'User',
      roleId: developerRole.id,
    },
  });

  // Create a test group
  const testGroup = await prisma.group.create({
    data: {
      groupName: 'Test Group',
      leaderId: developerUser.id,
      description: 'A test group for development',
    },
  });

  // Add members to the group
  await prisma.groupMember.create({
    data: {
      groupId: testGroup.id,
      userId: regularUser.id,
    },
  });

  await prisma.groupMember.create({
    data: {
      groupId: testGroup.id,
      userId: developerUser.id,
    },
  });

  // Create a test project
  const testProject = await prisma.project.create({
    data: {
      groupId: testGroup.id,
      projectName: 'Test Project',
      description: 'A test project for development',
      startDate: new Date(),
      endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)), // One year from now
    },
  });

  console.log({
    adminRole,
    userRole,
    developerRole,
    adminUser,
    regularUser,
    developerUser,
    testGroup,
    testProject,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 