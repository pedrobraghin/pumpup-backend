import { Transform } from 'class-transformer';
import * as xss from 'xss';
import { BadRequestException } from '@nestjs/common';

export function Sanitize() {
  return Transform(({ value }) => {
    if (typeof value === 'string') {
      const sanitizedValue = xss.filterXSS(value);

      if (sanitizedValue !== value) {
        throw new BadRequestException('Malicious content found');
      }

      return sanitizedValue;
    }

    return value;
  });
}
