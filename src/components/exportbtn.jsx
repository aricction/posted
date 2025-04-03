import { IoMdDownload } from "react-icons/io";

import React, { useEffect } from 'react';

const ExportBtn = () => {
  const handleSave = () => {
    const canvas = document.getElementsByTagName('canvas')[0]; // Assumes the stage renders as a canvas element
    try {
      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'canvas.png';
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error("Failed to export canvas: ", e);
    }
  };

  useEffect(() => {
    const exportButton = document.getElementById('exportBtn');
    exportButton.addEventListener('click', handleSave);

    return () => {
      exportButton.removeEventListener('click', handleSave);
    };
  }, []);

  return (
    <div>
      <button id="exportBtn" className="flex items-center justify-center gap-3 w-full bg-sky-500 hover:bg-white hover:text-blue-500 text-white font-bold p-4 rounded hover:border-2 hover:border-sky-500 duration-500">
        <IoMdDownload className="size-5" />
        <span>Export</span>
      </button>
    </div>
  );
};


export default ExportBtn;
