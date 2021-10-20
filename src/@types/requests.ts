import { Request } from 'express'

import Breeder from '@Entities/BreederEntity'
import BreederImage from '@Entities/BreederImageEntity'
import Poultry from '@Entities/PoultryEntity'
import BreederContact from '@Entities/BreederContactEntity'

export interface RequestWithBreeder extends Request {
  breeder?: Breeder;
}

export interface RequestWithPoultryAndBreeder extends Request, RequestWithBreeder {
  poultry?: Poultry;
}

export interface RequestWithFile extends Request {
  fileNames?: string[]
}

export interface RequestWithBreederImage extends Request {
  breederImage?: BreederImage;
}

export interface RequestWithBreederContact extends Request {
  breederContact?: BreederContact;
}

export interface RequestWithBreederAndFile extends RequestWithBreeder, RequestWithFile {}

export interface RequestWithBreederAndBreederImage extends RequestWithBreederImage, RequestWithBreeder {}

export interface RequestWithBreederAndBreederContact extends RequestWithBreederContact, RequestWithBreeder {}
