'use client';

import { useState } from 'react';

export default function Header() {
  const [isCopied, setIsCopied] = useState(false);

  const copyEmailToClipboard = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText('anianir1919@gmail.com');
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-6 p-4 bg-transparent">
      <button 
        onClick={copyEmailToClipboard}
        className="hover:underline cursor-pointer"
      >
        {isCopied ? 'copied' : 'anianir1919@gmail.com'}
      </button>
      <a 
        href="https://www.linkedin.com/in/anisa-roshan-zamir/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        LinkedIn
      </a>
      <a 
        href="/docs/resume.docx"
        download
        className="hover:underline"
      >
        Resume
      </a>
    </header>
  );
}
