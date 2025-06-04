import { PrismaClient } from "../../generated/prisma"

const prisma = new PrismaClient()

async function main() {
  // ... aqui eh onde as queries do Prisma Client sao escritas
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })