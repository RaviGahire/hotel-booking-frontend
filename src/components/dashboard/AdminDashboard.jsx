import { Header } from "../common/Header";
import { Navbar } from "../common/Navbar";

export const AdminDashboard = () => {
  return (
    <>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <button className="text-sm bg-black text-white px-4 py-1.5 rounded">
            Logout
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded border">
            <p className="text-gray-500 text-sm">Users</p>
            <h2 className="text-xl font-bold">120</h2>
          </div>
          <div className="bg-white p-4 rounded border">
            <p className="text-gray-500 text-sm">Vendors</p>
            <h2 className="text-xl font-bold">75</h2>
          </div>
          <div className="bg-white p-4 rounded border">
            <p className="text-gray-500 text-sm">Hotels</p>
            <h2 className="text-xl font-bold">₹50k</h2>
          </div>
        </div>
        <div className="bg-white rounded border p-4">
          <h2 className="text-md font-medium mb-4">Recent Users</h2>
          <table className="w-full text-sm">
            <thead className="text-left text-gray-500">
              <tr>
                <th className="pb-2">Name</th>
                <th className="pb-2">Email</th>
                <th className="pb-2">Role</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="py-2">Ravi</td>
                <td>ravi@mail.com</td>
                <td>Admin</td>
              </tr>
              <tr className="border-t">
                <td className="py-2">John</td>
                <td>john@mail.com</td>
                <td>User</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
};