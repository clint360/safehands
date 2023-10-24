"use client"
import Card from '@/components/atoms/Card';
import ReportTag from '@/components/atoms/Tag';
import Text from '@/components/atoms/Text';
import styled from '@emotion/styled';
import Link from 'next/link';
import React from 'react'


const StyledReport = styled(Card)`
  padding: 1rem;
  cursor: pointer;
  transition: transform 0.3s ease-in;
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 5fr 2fr 1fr;
  align-items: center;
  gap: 1rem;
  justify-content: space-between;
  border-radius: 5px;
  border-left: 5px solid var(--secondary);

  &:hover {
    transform: translateY(-5px) scale(1.01);
  }

  & + & {
    margin-top: 1rem;
  }
`;

const ReportTitle = styled(Text)`
  flex: 1;
  min-width: 300px;
`;

const ReportCategory = styled(Text)`
  width: 200px;
`;

const ReportDate = styled(Text)`
  background-color: var(--dark-05);
  border-radius: 100px;
  padding: 0.15rem 0.5rem;
  margin: 0;
`;

function Reports() {
  return (
    <div>
         <Link
            href={`/dashboard/projects/`}
          >
            <StyledReport as="a">
              <ReportTitle size="medium" weight="medium">
                Report Name
              </ReportTitle>
              <ReportCategory>Hey</ReportCategory>
              <div>
                <ReportTag status='RECIEVED'>
                  Pending
                </ReportTag>
              </div>
              <div>
                <ReportDate as="span">
                  Date
                </ReportDate>
              </div>
            </StyledReport>
          </Link>
    </div>
  )
}

export default Reports