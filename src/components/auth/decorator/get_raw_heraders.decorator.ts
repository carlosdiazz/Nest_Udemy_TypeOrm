import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';

export const GetRawHeaders = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    //console.log(data);
    const req = ctx.switchToHttp().getRequest();
    const rawHeaders = req.rawHeaders;
    //console.log(rawHeaders);
    if (!rawHeaders) {
      throw new InternalServerErrorException('rawHeaders not found Request');
    }
    return rawHeaders;
  },
);
