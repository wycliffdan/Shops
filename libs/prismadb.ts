//  import { PrismaClient } from "@prisma/client"

// declare global{
//     var prisma: PrismaClient | undefined
// }

// const client = globalThis.prisma || new PrismaClient();

// if(process.env.NODE_ENV === "production") globalThis.prisma = client;

// export default client;

// import { PrismaClient } from '@prisma/client';

// declare global {
  // This prevents TypeScript from complaining about the redeclaration of `prisma`
  // in the global scope
//   var prisma: PrismaClient | undefined;
// }

// const client = globalThis.prisma || new PrismaClient();

// if (process.env.NODE_ENV === 'production') {
//   globalThis.prisma = client;
// }

// export default client;
