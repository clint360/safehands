import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  HTMLAttributes,
} from 'react';

type textTagType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'span'
  | 'p'
  | 'a'
  | 'button';

type InType = HTMLAttributes<HTMLElement> &
  (
    | AnchorHTMLAttributes<HTMLAnchorElement>
    | ButtonHTMLAttributes<HTMLButtonElement>
  );

export interface TextProps {
  readonly as?: textTagType;
  size?: keyof typeof sizes;
  weight?: keyof typeof weights;
  color?: string;
}
const sizes = {
  medium: '1.188rem',
  regular: '0.875rem',
  small: '0.75rem',
  large: '2rem',
};

const weights = {
  bold: '700',
  regular: '400',
  medium: '500',
  light: '300',
};
function sizeAndWeight({ size = 'regular', weight = 'regular' }: TextProps) {
  return css`
    font-size: ${sizes[size]};
    font-weight: ${weights[weight]};
    line-height: 1;
  `;
}

function textColor({ color = 'dark' }) {
  return css`
    color: var(--${color});
  `;
}

const StyledText = styled.p<TextProps>`
  ${textColor}
  ${sizeAndWeight}
`;

const Text = ({
  children,
  as = 'p',
  ...props
}: TextProps & InType): JSX.Element => {
  return (
    <StyledText as={as} {...props}>
      {children}
    </StyledText>
  );
};

export default Text;