import { Outlet } from "react-router-dom";
import ShoppingHeader from "./header";

function ShoppingLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <ShoppingHeader />

      {/* Main Content */}
      <main className="flex flex-col w-full flex-grow px-4 md:px-8 lg:px-16 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="w-full bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-center py-4 shadow-md border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm">&copy; {new Date().getFullYear()} IntelliLib. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default ShoppingLayout;
