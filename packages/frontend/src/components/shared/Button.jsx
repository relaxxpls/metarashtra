import { Button } from 'antd';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 8px;
  padding: 1rem;
  width: 100%;
  max-width: 10rem;
  font-size: 0.75rem;

  &.ant-btn-text {
    border: 2px solid lightgray;

    &:focus,
    &:hover {
      background: #00000011;
      border-color: darkgray;
    }
  }
`;

export default StyledButton;
