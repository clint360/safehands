import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function TextEditor({value, setValue}: any) {
        const modules = {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ size: [] }],
            ['bold', 'underline', 'italic', 'blockquote', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [
              { list: 'ordered' },
              { list: 'bullet' },
              { indent: '-1' },
              { indent: '+1' },
            ],
            ["link", "image", "video", "pdf"]
          ]
        }
  return (
    <div>
         <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            className='editor-input'
            modules={modules}
            placeholder='Tell us what happened, Start with a title, Feel free to use Media to describe your experience'
          />
    </div>
  )
}

export default TextEditor