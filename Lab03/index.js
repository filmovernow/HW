//task1-2 มันซ้ำกัน
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
async function main() {
    const author = await prisma.author.create({
        data: {
            name: "J.K. Rowling",
            books: {
                create: {
                    title: "Harry Potter and the Philosopher's Stone"
                }
            }
        }
    })
    
    console.log(author)
//task3
    const category = await prisma.category.create({
        data: {
            name: "Fantasy"
        }
    })
    
    await prisma.book.update({
        where: {
            id: 3 //เชื่อมกันผ่านid แบบอื่นต้องดูที่ schema
        },
        data: {
            categories: {
                connect: {
                    id: category.id
                }
            }
        }
    })
    console.log("done")
}
main()
