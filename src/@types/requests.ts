import { Request } from 'express'

import Poultry from '@Entities/PoultryEntity'

export interface PoultryUserRequest extends Request {
  poultry?: Poultry;
}
