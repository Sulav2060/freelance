import React from "react";

export default function Profile() {
  return (
    <div className="p-6 text-white">
      <h2 className="text-xl font-bold mb-4">Profile</h2>
      <div className="bg-gray-800 p-4 rounded-md">
        <h3 className="font-semibold">Personal Information</h3>
        <p><strong>Photo:</strong> [User's Photo]</p>
        <p><strong>Citizenship:</strong> [User's Citizenship]</p>
        <p><strong>PAN:</strong> [User's PAN]</p>
      </div>
    </div>
  );
}
