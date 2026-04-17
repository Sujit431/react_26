import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  background-color: ${(props) => {
    if (props.type === 'success') return '#2ea043'; // Green
    if (props.type === 'error') return '#da3633';   // Red
    return '#6c757d';                               // Default Gray
  }};
  color: white;
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 15px;
  text-align: center;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
`;

export default function StatusCard({ type, children }) {
  // Use `children` if provided, otherwise fallback to "Status: <type>"
  return (
    <CardContainer type={type}>
      {children || `Status: ${type}`}
    </CardContainer>
  );
}
