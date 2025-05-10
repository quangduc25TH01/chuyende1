import { message } from 'antd';
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import styled from 'styled-components';

import config from '../../config';
import Upload from '../../api/Upload';

const CustomEditorStyled = styled.div`
  .tox .tox-edit-area::before {
    border: 1px solid #1677ff;
    box-shadow: 0 0 0 2px rgba(5, 145, 255, 0.1);
    outline: 0;
  }

  .tox-statusbar {
    justify-content: flex-end;
    .tox-statusbar__text-container {
      display: none;
    }
  }
`;

interface CustomEditorProps {
  content: string;
  setContent: (content: string) => void;
}

export default function CustomEditor(props: CustomEditorProps) {
  const { content, setContent } = props;
  const editorRef = useRef<any>(null);

  const handleEditorChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleImageUpload = async (
    blobInfo: any,
    _success: any,
  ): Promise<any> => {
    try {
      const formData = new FormData();

      formData.append('file', blobInfo.blob(), blobInfo.filename());

      const { data } = await Upload.uploadImage(formData);
      if (data?.url) {
        const imageUrl = data.url;
        // Insert image directly into the editor content
        if (editorRef.current) {
          editorRef.current.insertContent(`<img src="${imageUrl}" alt="" />`);
        }
      } else {
        message.error('No valid image URL returned.');
      }
    } catch (error: any) {
      message.error('Upload failed: ' + error);
    }
  };

  return (
    <CustomEditorStyled>
      <Editor
        apiKey={config.tinymceApiKey}
        value={content}
        onEditorChange={handleEditorChange}
        onInit={(_evt, editor) => (editorRef.current = editor)}
        init={{
          min_height: 100,
          max_height: 500,
          statusbar: true,
          table_default_styles: {
            'border-collapse': 'collapse',
            width: '100%',
          },
          table_default_attributes: {
            border: '1',
          },
          placeholder: 'Nhập nội dung...',
          content_style: `body { font-weight: 400; font-size: 14px} p { margin: 0; color: #000000; }`,
          plugins:
            'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
          toolbar:
            'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
          file_picker_types: 'image',
          images_upload_handler: handleImageUpload,
        }}
      />
    </CustomEditorStyled>
  );
}
