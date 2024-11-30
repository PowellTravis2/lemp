import NextAuth from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";

const authOptions = {
   providers: [
      AzureADProvider({
         clientId: process.env.ENTRA_CLIENTID || "none",
         clientSecret: process.env.ENTRA_SECRET || "none",
         tenantId: process.env.ENTRA_TENNANT,
         authorization: {
				params: {
					// Force user to select which logged in account to use
					// Otherwise, AAD will use the first account in the cache
					prompt: "select_account",
				},
			},
      }),
   ],
   callbacks: {
      async jwt({ token, account }) {
         if(account?.id_token) {
            const [header, payload, sig] = account.id_token.split('.')
            const idToken = JSON.parse(Buffer.from(payload, 'base64').toString('utf8'))
      
            token.roles = [...idToken.roles]
         }
   
         return token
      },
      async session({ session, token }) {
         session.roles = [...token.roles]
         return session;
      },
   },
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
export { authOptions };