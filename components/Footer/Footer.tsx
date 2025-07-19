import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="content">
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className="wrap">
          <p>Developer: your name</p>
          <p>
            Contact us: <a href="mailto:student@notehub.app">student@notehub.app</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
