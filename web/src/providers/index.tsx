'use client'

import { client } from '@/client'
import { ApolloProvider } from '@apollo/client'

function Providers({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export { Providers }
