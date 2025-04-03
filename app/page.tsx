import Link from 'next/link'
import React from 'react'

const HomePage = () => {
  return (
    <div className="flex flex-col gap-16 items-center justify-center min-h-screen bg-gray-900">
      <h1 className="text-4xl font-bold mb-8">Web3 Donation Samples</h1>
      <div className="flex space-x-4">
        <Link
          href="/ether"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Ether Sample
        </Link>
        <Link
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          href="/bitcoin"
        >
          Bitcoin Sample
        </Link>
      </div>
    </div>
  )
}

export default HomePage