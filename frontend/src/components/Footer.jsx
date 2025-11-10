// src/components/Footer.jsx
import React from 'react';
import X from '../assets/X.png';
import fb from '../assets/fb.png';
import linkedin from '../assets/linkedin.png';
import instagram from '../assets/instagram.png';

const Footer = () => {
  return (
    <footer className="bg-[#121212] py-12 mb-2 text-[#787878] flex flex-row px-12 gap-20 tracking-wider">
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-white">Company</h3>
        <p className="cursor-pointer hover:text-white">Terms and Conditions</p>
        <p className="cursor-pointer hover:text-white">Privacy Policy</p>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-white">Support</h3>
        <p className="cursor-pointer hover:text-white">Help</p>
        <p className="cursor-pointer hover:text-white">Contact Us</p>
      </div>

      <div className="right-32">
        <h3 className="font-semibold text-white">Follow us on</h3>
        <div className="flex flex-row gap-4 mt-4">
          {/* Use links when pointing to social profiles. Add proper hrefs when available */}
          <a href="#" aria-label="Follow on X" className="opacity-40 hover:opacity-80">
            <img className="h-6" src={X} alt="X (Twitter)" />
          </a>
          <a href="#" aria-label="Follow on Facebook" className="opacity-40 hover:opacity-80">
            <img className="h-6" src={fb} alt="Facebook" />
          </a>
          <a href="#" aria-label="Follow on Instagram" className="opacity-40 hover:opacity-80">
            <img className="h-6" src={instagram} alt="Instagram" />
          </a>
          <a href="#" aria-label="Follow on LinkedIn" className="opacity-40 hover:opacity-80">
            <img className="h-6" src={linkedin} alt="LinkedIn" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
