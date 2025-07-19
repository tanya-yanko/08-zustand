import type { Metadata } from 'next';
import React from 'react';
import './globals.css';


export const metadata: Metadata = {
  title: 'Home',
};

const Home = () => {
  return (
    <main>
      <div className="container">
        <h1 className="title">Welcome to NoteHub</h1>
        <p className="description">
          NoteHub is a simple and efficient application designed for managing
          personal notes. It helps keep your thoughts organized and accessible
          in one place, whether you&apos;re at home or on the go.
        </p>
        <p className="description">
          The app provides a clean interface for writing, editing, and browsing
          notes. With support for keyword search and structured organization,
          NoteHub offers a streamlined experience for anyone who values clarity
          and productivity.
        </p>
      </div>
    </main>
  );
};

export default Home;
