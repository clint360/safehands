import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { ReportStatus } from '@/domains/Report';

interface ReportTagProps {
    children: ReactNode;
    status: ReportStatus
}

import React, { ReactNode } from 'react'

function ReportTag({children, status}: ReportTagProps) {
  const tagStyle = {
    height: "auto",
    background: "green",
    padding: "5px 5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    borderRadius: "10px"
  }
  return (
    <div style={tagStyle}>{children}</div>
  )
}

export default ReportTag