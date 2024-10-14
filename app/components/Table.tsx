import React from "react";

interface Employee {
  _id?: string;
  name: string;
  age?: number | null;
  email: string;
  blood_group: string;
  address: string;
}

interface TableProps {
  data: Employee[];
  onDelete: (id?: string) => void;
  onUpdate: (id?: string) => void;
}

const Table: React.FC<TableProps> = ({ data, onDelete, onUpdate }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">S.No</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Age</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Blood Group</th>
            <th className="border border-gray-300 px-4 py-2">Address</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((person, index) => (
            <tr key={person._id} className="text-center">
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">
                {person.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">{person.age}</td>
              <td className="border border-gray-300 px-4 py-2">
                {person.email}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {person.blood_group}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {person.address}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                  onClick={() => onUpdate(person?._id)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded"
                  onClick={() => onDelete(person?._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
