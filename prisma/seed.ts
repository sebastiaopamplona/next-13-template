import { db } from "../lib/db"
import { hashPassword } from "../lib/local-login"

async function seedUsers() {
  type user = {
    email: string
    password: string
    name: string
    picture: string
  }
  const users: user[] = [
    {
      email: "admin@app.io",
      password: "secret",
      name: "App Admin",
      picture: "https://avatars.githubusercontent.com/u/27507750?v=4",
    },
  ]
  const seed = users.map(async (u) => {
    await db.user.create({
      data: {
        email: u.email,
        password: hashPassword(u.password),
        name: u.name,
        picture: u.picture,
      },
    })
  })
  await Promise.all(seed)

  console.log("Users seeded")
}

async function main() {
  if (process.env.NODE_ENV !== "production") {
    await seedUsers()
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
