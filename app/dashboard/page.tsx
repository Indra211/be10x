'use client';
import { signOut, useSession } from 'next-auth/react';
import { use, useEffect, useState } from 'react';
import Modal from '../components/Modal';
import Table from '../components/Table';
import { MdOutlineAdd } from 'react-icons/md';
import Footer from '../components/footer';

type EmpData = {
  _id?: string;
  name: string;
  email: string;
  age?: number | null;
  blood_group: string;
  address: string;
};

function Dashbaord() {
  const session: any = useSession();

  const [formData, setFormData] = useState<EmpData>({
    email: '',
    name: '',
    age: null,
    blood_group: '',
    address: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
    setFormData({
      email: '',
      name: '',
      age: null,
      blood_group: '',
      address: '',
    });
  };
  const closeModal = () => {
    setShowModal(false);
    setFormData({
      email: '',
      name: '',
      age: null,
      blood_group: '',
      address: '',
    });
  };
  const handleFormData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData._id);

    if (loading) return;

    if (
      !formData.email ||
      !formData.name ||
      !formData.age ||
      !formData.blood_group ||
      !formData.address
    ) {
      return setError('Please enter all details');
    }
    if (!formData.email.includes('@') && !formData.email.includes('.')) {
      return setError('Please enter a valid email');
    }

    setLoading(true);
    if (!formData?._id) {
      try {
        const res = await fetch('/api/EmpData', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        setFormData({
          email: '',
          name: '',
          age: null,
          blood_group: '',
          address: '',
        });
        closeModal();
      }
    } else if (formData?._id) {
      try {
        const res = await fetch(`/api/EmpData?id=${formData?._id}`, {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        setFormData({
          email: '',
          name: '',
          age: null,
          address: '',
          blood_group: '',
          _id: '',
        });
        closeModal();
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/EmpData', {
          method: 'GET',
        });

        const data = await res.json();
        setEmpData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [formData]);

  const [empData, setEmpData] = useState<EmpData[]>([]);

  const handleUpdateData = (id: string) => {
    const data = empData?.filter((item: any) => item?._id === id)?.[0];
    openModal();
    setFormData({ ...data });
  };

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const openDeleteModalHandler = (id: any) => {
    const data = empData?.filter((item: any) => item?._id === id)?.[0];
    setFormData({ ...data });
    setOpenDeleteModal(true);
  };
  const closeDeleteModalHandler = () => {
    setOpenDeleteModal(false);
  };

  const handleDelete = async (id?: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/EmpData?id=${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data?.status === 'success') {
        setEmpData(empData?.filter((item: any) => item?._id !== formData?._id));
      } else {
        alert('Something went wrong');
      }
    } catch (error) {
    } finally {
      setLoading(false);
      setFormData({
        email: '',
        name: '',
        age: null,
        address: '',
        blood_group: '',
        _id: '',
      });
      closeDeleteModalHandler();
    }
  };

  return (
    <div className='w-full h-full bg-slate-200 relative'>
      <header className='shadow-md shadow-slate-100 p-2 bg-white w-full flex items-center justify-between'>
        <p>
          <span className='font-medium text-slate-500'>Welcome</span>{' '}
          <span className='font-bold text-slate-500'>
            {session?.data?.user?.fullName}
          </span>
        </p>
        <button
          onClick={() => signOut()}
          className='bg-slate-200 p-2 rounded-md hover:bg-slate-300'
        >
          Sign out
        </button>
      </header>
      {empData?.length > 0 && (
        <button
          className='fixed bottom-2 right-2 px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center justify-center'
          onClick={openModal}
        >
          <MdOutlineAdd /> Create Employee
        </button>
      )}
      <main>
        {showModal && (
          <Modal
            showModal={showModal}
            closeModal={closeModal}
          >
            <form
              onSubmit={handleSubmit}
              className='w-full p-4 m-auto  bg-white rounded-md flex flex-col'
            >
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleFormData}
                placeholder='Name'
              />
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleFormData}
                placeholder='Email'
              />
              <input
                type='number'
                name='age'
                value={formData.age || ''}
                onChange={handleFormData}
                placeholder='Age'
              />
              <input
                type='text'
                name='blood_group'
                value={formData.blood_group}
                onChange={handleFormData}
                placeholder='Blood Group'
              />
              <textarea
                className='w-full mb-4 bg-zinc-100 p-2 border border-slate-200 rounded-md resize-none'
                name='address'
                value={formData.address}
                onChange={handleFormData}
                placeholder='Address'
              />
              {error && (
                <h3 className='bg-red-500 mb-4 p-2 rounded-lg  text-white font-medium w-[60%] text-center'>
                  {error}
                </h3>
              )}
              <button
                type='submit'
                className='p-2 self-center bg-red-400 text-xl font-medium text-white rounded-md hover:bg-red-500'
              >
                Submit
              </button>
            </form>
          </Modal>
        )}
        {openDeleteModal && (
          <Modal
            showModal={openDeleteModal}
            closeModal={closeDeleteModalHandler}
          >
            <div className='w-full h-full flex flex-col items-center justify-center'>
              <h1 className='text-xl font-medium mb-6'>
                Are you sure you want to delete?
              </h1>
              <div className='flex gap-4'>
                <button
                  onClick={() => handleDelete(formData?._id)}
                  className='bg-red-500  text-white px-4 py-2 rounded-md'
                >
                  Yes
                </button>
                <button
                  onClick={closeDeleteModalHandler}
                  className='bg-white-500 border border-red-500 text-red-500 px-4 py-2 rounded-md'
                >
                  No
                </button>
              </div>
            </div>
          </Modal>
        )}
        <div className='w-full h-full flex flex-col items-center justify-center'>
          <h1 className='text-xl font-medium'>Employee Details</h1>
          <div
            className='w-[90%] h-[90%] overflow-scroll '
            style={{
              scrollBehavior: 'smooth',
              scrollbarWidth: 'none',
            }}
          >
            {empData?.length > 0 ? (
              <Table
                data={empData}
                onUpdate={(id: any) => handleUpdateData(id)}
                onDelete={(id: any) => openDeleteModalHandler(id)}
              />
            ) : (
              <div className=' mt-4 w-full h-full flex flex-col gap-4 items-center justify-center'>
                <p>No data found</p>
                <button
                  className='fixed bottom-2 right-2 px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center justify-center'
                  onClick={openModal}
                >
                  <MdOutlineAdd /> Create Employee
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <div className='fixed bottom-0 w-full'>
        <Footer />
      </div>
    </div>
  );
}
export default Dashbaord;
