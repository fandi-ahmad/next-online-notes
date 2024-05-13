import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
async function main() {
  await prisma.user.create({
    data: {
      username: 'fandi',
      password: '1234'
    }
  })
}
main()
.then(async () => {
  await prisma.$disconnect()
})
.catch(async (e) => {
  console.error(e)
  await prisma.$disconnect()
})