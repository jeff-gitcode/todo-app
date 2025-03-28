This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

![alt text](./doc/nextjs-demo.gif)

## Playwright Test:

![alt text](./doc/playwright.gif)

## Storybook

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Tech Stack

- [x] clean architecture
- [x] nextjs
- [x] zod
- [x] react-query
- [x] react-hook-form
- [x] next-auth
- [x] prisma
- [x] jest/testing-library
- [x] storybook
- [x] playwright
- [x] shadcn-ui
- [x] sqllite
- [x] ci/github action

## Scripts

- `dev`: Runs the development server.
- `build`: Builds the application for production.
- `start`: Starts the production server.
- `lint`: Runs ESLint to check for linting errors.
- `test`: Runs the test suite.

## Project Structure

```
nextjs-todo-app/
├── .next/                  # Next.js build output (generated)
├── node_modules/           # Node.js modules (generated)
├── public/                 # Static files
│   ├── favicon.ico
│   └── ...
├── src/                    # Source files
│   ├── app/                # Application pages and components
│   │   ├── page.tsx        # Main page component
│   │   └── ...
│   ├── components/         # Reusable components
│   │   └── ...
│   ├── styles/             # Global styles
│   │   ├── globals.css
│   │   └── ...
│   ├── utils/              # Utility functions
│   │   └── ...
│   └── ...
├── .eslintrc.js            # ESLint configuration
├── .gitignore              # Git ignore file
├── next.config.ts          # Next.js configuration
├── package.json            # Project metadata and dependencies
├── README.md               # Project documentation
├── tsconfig.json           # TypeScript configuration
└── yarn.lock               # Yarn lock file (or package-lock.json for npm)
```

````
$ npx create-next-app@latest todo-app with-jest with-playwright with-docker --typescript
$ npm install -g npm@11.0.0
$ yarn add @tanstack/react-query @tanstack/react-query-devtools zod react-hook-form next-auth @prisma/client @storybook/react @testing-library/react @testing-library/jest-dom jest playwright shadcn-ui
$ yarn add -D prisma
$ npx prisma init

✔ Your Prisma schema was created at prisma/schema.prisma
  You can now open it in your favorite editor.

warn You already have a .gitignore file. Don't forget to add `.env` in it to not commit any private information.

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.
5. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and real-time database events. Read: https://pris.ly/cli/beyond-orm

More information in our documentation:
https://pris.ly/d/getting-started

# JEST
$ yarn add -D @types/jest
$ yarn add -D  jest ts-jest @types/jest @prisma/client
$ yarn add --dev @testing-library/jest-dom
$ yarn create jest
$ yarn add -D jest jest-environment-jsdom @testing-library/react @testing-library/dom @testing-library/jest-dom ts-node

# tanstack
$ yarn add -D @tanstack/react-query-devtools

# sqllite
$ npx prisma init --datasource-provider sqlite

info A prisma folder or prisma schema file already exists in the project.
info Please manually update your .env file with the new DATABASE_URL shown below.

Database URL:
undefined

Project link:
https://console.prisma.io////dashboard

Next steps
1. Define your database schema
Open the schema.prisma file and define your first models. Go to https://pris.ly/ppg-quickstart if you need inspiration.

2. Apply migrations
Run the following command to create and apply a migration:
npx prisma migrate dev --name init

3. Send queries with Prisma Client
As a next step, you can instantiate Prisma Client and start sending queries to your database from your application.

4. Manage your data
View your database in Studio via Console: https://console.prisma.io////studio.
Or run Studio locally with: npx prisma studio

Find more information in our documentation:
https://pris.ly/d/getting-started


$ npx prisma migrate dev --name init

Environment variables loaded from .env
Prisma schema loaded from prisma\schema.prisma
Datasource "db": SQLite database "dev.db" at "file:./dev.db"

SQLite database dev.db created at file:./dev.db

Applying migration `20250130122003_init`

The following migration(s) have been created and applied from new schema changes:

migrations/
  └─ 20250130122003_init/
    └─ migration.sql

Your database is now in sync with your schema.

$ yarn add @prisma/client
$ npx prisma generate

# shadcn
$ npx shadcn@latest init
$ npx shadcn@latest add button input checkbox card table form alert
$ npx shadcn@latest add dropdown-menu navigation-menu avatar

# auth
$ yarn add bcryptjs
$ yarn add -D @types/bcryptjs
$ yarn add @next-auth/prisma-adapter

# storybook
$ npx sb init
$ yarn storybook
$ yarn add -D @storybook/test-runner
$ yarn test:storybook

# playwright
$ yarn create playwright
√ Where to put your end-to-end tests? · e2e
√ Add a GitHub Actions workflow? (y/N) · false
√ Install Playwright browsers (can be done manually via 'yarn playwright install')? (Y/n) · true

$ yarn add -D @playwright/test
$ yarn test:playwright:report
$ npx playwright show-report

# eslint
$ yarn add eslint-plugin-storybook --dev

# github action

# deployment on local
$ yarn build
# powershell command
$ cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/
# cmd
$ node .next/standalone/server.js

# docker
$ docker compose up --build
$ docker compose down


```
````
