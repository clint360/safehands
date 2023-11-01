import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ReportStatus } from '@/domains/Report';

interface ReportTagProps {
    children: ReactNode;
    status: ReportStatus
}

import React, { ReactNode } from 'react'

function ReportTag({children, status}: ReportTagProps) {

  function getColor(status: ReportStatus) {
    switch(status){
      case 'REVIEWED':
      return 'green'
      case 'REJECTED':
      return 'red'
      case 'RECEIVED':
      return 'black'
      case 'DONE':
      return 'blue'
    }
  }

  const tagStyle = {
    height: "auto",
    background: getColor(status),
    fontSize: "0.8rem",
    fontWeight: "bold",
    padding: "3px 10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: 'white',
    borderRadius: "10px"
  }
  return (
    <div style={tagStyle}>{children}</div>
  )
}

export default ReportTag