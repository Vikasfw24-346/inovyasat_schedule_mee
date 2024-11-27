import {clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const protectedRoutes = createRouteMatcher([
  '/',
  '/upcoming',
  '/previous',
  '/recordings',
  '/personal-room',
  '/meeting(.*)'
])
// export default clerkMiddleware((auth, req) =>{
//   if (protectedRoutes(req)) auth().protect();
// })

export default clerkMiddleware((auth, req) =>{
  if (protectedRoutes(req)) auth();
})

// export default clerkMiddleware((auth, req) => {
//   // Check if the requested route is protected
//   if (protectedRoutes(req)) {
//     // Enforce authentication on the protected route
//     auth().protect();
//   }
// });


// export default clerkMiddleware((auth, req) => {
//   const { userId } = auth();  // Get user ID to check authentication status

//   // Enforce protection if accessing a protected route
//   if (protectedRoutes(req) && !userId) {
//     return new Response('Unauthorized', { status: 401 });
//   }

  // If authenticated, continue request
// });
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}