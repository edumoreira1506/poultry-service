import { Request } from 'express'

import Breeder from '@Entities/BreederEntity'

export interface RequestWithBreeder extends Request {
  breeder?: Breeder;
}

export interface RequestWithFile extends Request {
  fileNames?: string[]
}

export interface RequestUpdateBreeder extends RequestWithBreeder, RequestWithFile {}
