
const AdminPanel = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-4">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <ul className="mt-6">
          <li className="mb-4">
            <a href="#" className="hover:bg-blue-700 px-4 py-2 rounded">
              Dashboard
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:bg-blue-700 px-4 py-2 rounded">
              Users
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:bg-blue-700 px-4 py-2 rounded">
              Settings
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="hover:bg-blue-700 px-4 py-2 rounded">
              Logout
            </a>
          </li>
        </ul>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-3xl font-bold">120</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">New Orders</h3>
            <p className="text-3xl font-bold">45</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold">Revenue</h3>
            <p className="text-3xl font-bold">$4,200</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;