this project is x-ship
project goal ship fast project
project use
prisma
-bun i prisma
-bum i @prisma-client
-prisma init
--
✔ Your Prisma schema was created at prisma/schema.prisma
You can now open it in your favorite editor.

warn Prisma would have added DATABASE_URL but it already exists in .env
warn You already have a .gitignore file. Don't forget to add `.env` in it to not commit any private information.

Next steps:

1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.
5. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and real-time database events. Read: https://pris.ly/beyond-the-orm
   npx prisma format
   npx prisma migrate dev --name init
   npx prisma generate

authjs
shadcn ui
tenstack datatable

        build in features
        []user manager
        []matrix
        []Role base middleware
        []sqlite

#Task
[]folder structure
[]layout
[]auth
[]datatable
[]crud
[]export/import
[]offline mode
[]user management

#Ref
https://table.sadmn.com/?page=1&per_page=10&sort=createdAt.desc
https://www.prisma.io
https://authjs.dev
https://ui.shadcn.com
https://github.com/jonasschmedtmann/ultimate-react-course/tree/main

app
\_components
\_lib
actoin.ts
auth.ts
data-service.ts
db.ts
validation.ts
\_styles
about
account
api
cabins
login
error.js
layout.js
loading.js
not-fount.js
page.js
