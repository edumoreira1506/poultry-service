import { Request } from 'express'

import Breeder from '@Entities/BreederEntity'
import BreederImage from '@Entities/BreederImageEntity'

export interface RequestWithBreeder extends Request {
  breeder?: Breeder;
}

export interface RequestWithFile extends Request {
  fileNames?: string[]
}

export interface RequestWithBreederImage extends Request {
  breederImage?: BreederImage;
}

export interface RequestWithBreederAndFile extends RequestWithBreeder, RequestWithFile {}

export interface RequestWithBreederAndBreederImage extends RequestWithBreederImage, RequestWithBreeder {}
