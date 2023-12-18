import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export const TextEdit = ({ placeholder, onQuillChange, defaultValue }) => {
  const [content, setContent] = useState(defaultValue || '');

  useEffect(() => {
    setContent(defaultValue || '');
  }, [defaultValue]);

  let toolbarOptions = [
    ['bold', 'italic', 'underline'],
    ['link', 'image'],
  ];
  const module = {
    toolbar: toolbarOptions,
  };
  const handleQuillChange = (value) => {
    setContent(value);
    onQuillChange(value);
  };

  return (
    <div>
      <ReactQuill
        theme="snow"
        modules={module}
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
