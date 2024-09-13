// src/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import BloodBank from './BloodBank'
import { auth, db } from '../utils/firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const Home = () => {
    return (
        <>
            <Header className="bg-red-800" />
            <BloodBank/>
            {/* <div className="flex justify-center items-center h-screen w-full bg-gray-50">
            </div> */}
        </>
    );
};

export default Home;








