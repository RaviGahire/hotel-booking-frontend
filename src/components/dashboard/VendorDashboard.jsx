import React from "react";

export const VendorDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Vendor Dashboard</h1>
        <button className="text-sm bg-black text-white px-4 py-1.5 rounded">
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded border">
          <p className="text-gray-500 text-sm">My Listings</p>
          <h2 className="text-xl font-bold">12</h2>
        </div>

        <div className="bg-white p-4 rounded border">
          <p className="text-gray-500 text-sm">Bookings</p>
          <h2 className="text-xl font-bold">30</h2>
        </div>

        <div className="bg-white p-4 rounded border">
          <p className="text-gray-500 text-sm">Earnings</p>
          <h2 className="text-xl font-bold">₹20k</h2>
        </div>
      </div>

      <div className="bg-white rounded border p-4">
        <h2 className="text-md font-medium mb-4">Recent Bookings</h2>

        <table className="w-full text-sm">
          <thead className="text-left text-gray-500">
            <tr>
              <th className="pb-2">Customer</th>
              <th className="pb-2">Service</th>
              <th className="pb-2">Date</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td className="py-2">Ravi</td>
              <td>Hotel Room</td>
              <td>25 Apr</td>
            </tr>
            <tr className="border-t">
              <td className="py-2">John</td>
              <td>Deluxe Room</td>
              <td>26 Apr</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};