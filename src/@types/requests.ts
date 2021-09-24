import { Request } from 'express'

import Breeder from '@Entities/BreederEntity'

export interface RequestWithBreeder extends Request {
  breeder?: Breeder;
}
