import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC = 'publico';

export const PublicRouter = () => {
  return SetMetadata(IS_PUBLIC, true);
};
