import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

const defaultColor = '#616161';
export function SvgClose({ color = defaultColor, ...props }: SvgProps) {
  return (
    <Svg width={33.942} height={33.942} viewBox="0 0 33.942 33.942" {...props}>
      <Path
        data-name="Combined Shape"
        d="M7.425 24.395l7.425-7.424-7.425-7.425 2.121-2.121 7.425 7.424 7.425-7.424 2.12 2.12-7.424 7.426 7.425 7.424-2.121 2.122-7.425-7.425-7.425 7.425z"
        fill={color}
      />
    </Svg>
  );
}
