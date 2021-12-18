import styled from 'styled-components';

export const UploadExam = styled.div`
  .window {
    cursor: default;
  }
  .window.react-draggable-dragging {
    cursor: move;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 8px;
    label {
      margin-top: 3px;
    }
  }
`;
