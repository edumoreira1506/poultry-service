import { Request } from 'express'

import Poultry from '@Entities/PoultryEntity'

export interface RequestWithPoultry extends Request {
  poultry?: Poultry;
}
