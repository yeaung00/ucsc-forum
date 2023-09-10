// import { withAuth } from "next-auth/middleware"

// export default withAuth(
//   function middleware (req) {
//   },
//   {
//     callbacks: {
//       authorized: ({ req, token }) => {
//         return !!token;
//         // if (
//         //   !req.nextUrl.pathname.startsWith('/api/auth/signin') &&
//         //   token === null
//         // ) {
//         //   return false
//         // }
//         // return true
//       }
//     }
//   }
// )
export { default } from "next-auth/middleware"