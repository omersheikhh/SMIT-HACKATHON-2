import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, addDoc } from 'firebase/firestore';
import { db, auth } from '../utils/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import menImage from '../assets/download (2).jpg';
import womenImage from '../assets/download.png';

const BloodBank = () => {
  const [donors, setDonors] = useState([]);
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [name, setName] = useState('');
  const [bloodType, setBloodType] = useState('');
  const [contact, setContact] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserEmail(user.email);
      }
    });

    const unsubscribeDonors = onSnapshot(collection(db, 'donors'), (snapshot) => {
      const donorList = [];
      snapshot.forEach((doc) => {
        donorList.push({ ...doc.data(), id: doc.id });
      });
      setDonors(donorList);
    });

    return () => {
      unsubscribeAuth();
      unsubscribeDonors();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'donors'), { name, bloodType, contact });
      setSubmitted(true);
      setName('');
      setBloodType('');
      setContact('');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  const handleMessageClick = (donor) => {
    navigate('/chat', { state: { donor } });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <header className="bg-blue-500 text-white py-4 text-center">
        <h1 className="text-4xl font-bold">Blood Donation</h1>
      </header>

      <main className="flex-grow w-full max-w-4xl mx-auto px-4 py-8">
        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Introduction to Blood Donation</h2>
          <p className="mb-4">Blood donation is a vital process that helps save lives in emergencies, surgeries, and treatments. By donating blood, you are contributing to a crucial component of medical care that is always in demand.</p>
          <p className="mb-4">Your donation helps ensure that hospitals and clinics have the necessary supply to treat patients with various conditions, including those undergoing surgery, trauma victims, and individuals with chronic illnesses.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4">Donor List</h2>
          <div className="flex flex-col gap-4">
            {donors.filter((donor) => donor.email !== currentUserEmail).map((donor, index) => (
              <div
                key={donor.id}
                onClick={() => handleMessageClick(donor)}
                className="flex items-center justify-between px-8 border-2 border-blue-400 rounded-md py-3 bg-blue-100 cursor-pointer transition-transform transform hover:scale-105"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={donor.gender === 'Male' ? menImage : womenImage}
                    alt="Profile"
                    className="w-20 h-20 rounded-full border"
                  />
                  <h2 className="text-2xl font-semibold text-gray-800">{donor.name}</h2>
                </div>
                <div>
                  <h1 className="text-md font-semibold">Message</h1>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white shadow-lg rounded-lg p-6">
          {!submitted ? (
            <>
              <h2 className="text-2xl font-semibold mb-4">Donate Blood</h2>
              <p className="mb-4">Help save lives by donating blood. Your donation can make a huge difference.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">
                  <span className="text-gray-700">Name</span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    required
                  />
                </label>.zButton Updatezaaaana
                <label className="block">
                  <span className="text-gray-700">Blood Type</span>
                  <input
                    type="text"
                    value={bloodType}
                    onChange={(e) => setBloodType(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    required
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Contact</span>
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                    required
                  />
                </label>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
                >
                  Submit
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">Thank You!</h2>
              <p>Your donation details have been submitted successfully. Thank you for contributing to saving lives!</p>
            </div>
          )}
        </section>
      </main>

      <footer className="bg-red-600 text-white py-4 text-center">
        <p>&copy; 2024 Blood Donation</p>
      </footer>
    </div>
  );
};

export default BloodBank;