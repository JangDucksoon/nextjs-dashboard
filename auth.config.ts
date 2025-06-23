import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: {nextUrl}}) {
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            const isLoggedIn = !!auth?.user;
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return false;
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
    },
    providers: [],
}