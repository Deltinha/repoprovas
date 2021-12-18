import { FC } from 'react';
import Draggable from 'react-draggable';

export default function UploadExam({
  title,
  children,
}: {
  title: string;
  children: any;
}) {
  return (
    <>
      <Draggable handle=".window" cancel=".window-body">
        <div style={{}} className="window">
          <div className="title-bar">
            <div className="title-bar-text">{title}</div>
          </div>
          <div className="window-body">{children}</div>
        </div>
      </Draggable>
    </>
  );
}
