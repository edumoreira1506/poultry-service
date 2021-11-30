import { Request } from 'express'

import Breeder from '@Entities/BreederEntity'
import BreederImage from '@Entities/BreederImageEntity'
import Poultry from '@Entities/PoultryEntity'
import BreederContact from '@Entities/BreederContactEntity'
import PoultryImage from '@Entities/PoultryImageEntity'
import BreederUser from '@Entities/BreederUserEntity'

export interface RequestWithBreeder extends Request {
  breeder?: Breeder;
}

export interface RequestWithPoultryAndBreeder extends Request, RequestWithBreeder {
  poultry?: Poultry;
}

export interface RequestWithPoultryImageAndPoultryAndBreeder extends RequestWithPoultryAndBreeder {
  poultryImage?: PoultryImage;
}

export interface RequestWithPoultryAndBreederAndFile extends RequestWithPoultryAndBreeder, RequestWithFile {
}

export interface RequestWithFile extends Request {
  fileNames?: string[]
}

export interface RequestWithBreederImage extends Request {
  breederImage?: BreederImage;
}

export interface RequestWithBreederUser extends Request {
  breederUser?: BreederUser;
}

export interface RequestWithBreederContact extends Request {
  breederContact?: BreederContact;
}

export interface RequestWithBreederAndFile extends RequestWithBreeder, RequestWithFile {}

export interface RequestWithBreederAndBreederImage extends RequestWithBreederImage, RequestWithBreeder {}

export interface RequestWithBreederAndBreederUser extends RequestWithBreederUser, RequestWithBreeder {}

export interface RequestWithBreederAndBreederContact extends RequestWithBreederContact, RequestWithBreeder {}
