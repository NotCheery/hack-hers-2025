import Link from 'next/link';

export default function Dashboard() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-gray-50 font-sans">
      <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-center">
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome to CampusCare
        </h1>
        
        <p className="text-gray-500 mb-8">
          Your hub for finding and sharing campus essentials. How would you like to search?
        </p>

        {/* Container for the buttons */}
        <div className="flex flex-col gap-4">

          {/* Button to navigate to the map page */}
          <Link href="/map" className="w-full inline-block bg-pink-500 text-white font-bold py-4 px-6 rounded-xl hover:bg-pink-600 transition-colors duration-300 text-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50">
            View Interactive Map
          </Link>
          
          {/* Button to navigate to the locations list page */}
          <Link href="/locations" className="w-full inline-block bg-white text-pink-500 font-bold py-4 px-6 rounded-xl border-2 border-pink-500 hover:bg-pink-50 transition-colors duration-300 text-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50">
            View as a List
          </Link>

        </div>
        
      </div>
    </main>
  );
}