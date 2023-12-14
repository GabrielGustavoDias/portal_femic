import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export const TextEdit = ({ placeholder, onQuillChange }) => {
  const [content, setContent] = useState('');

  const handleQuillChange = (value: string) => {
    setContent(value);
    onQuillChange(value);
  };

  return (
    <div>
      <ReactQuill
        theme="snow"
        placeholder={placeholder}
        value={content}
        onChange={handleQuillChange}
      />
    </div>
  );
};

{
  /* <div dangerouslySetInnerHTML={{ __html: course.about }} /> colocar isso aqui, aonde for implementar esse componente com o valor do html sendo o que deve ser enderizado */
}
