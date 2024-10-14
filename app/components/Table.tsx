import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';

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
    <div className='overflow-x-auto'>
      <table className='min-w-full table-auto border-collapse border border-gray-300'>
        <thead>
          <tr className='bg-gray-200'>
            <th>S.No</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Blood Group</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((person, index) => (
            <tr
              key={person._id}
              className='text-center'
            >
              <td>{index + 1}</td>
              <td>{person.name}</td>
              <td>{person.age}</td>
              <td>{person.email}</td>
              <td>{person.blood_group}</td>
              <td>{person.address}</td>
              <td>
                <button
                  className='bg-blue-500 text-white px-4 py-1 rounded mr-2'
                  onClick={() => onUpdate(person?._id)}
                >
                  <MdEdit />
                </button>
                <button
                  className='bg-red-500 text-white px-4 py-1 rounded'
                  onClick={() => onDelete(person?._id)}
                >
                  <MdDelete />
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
