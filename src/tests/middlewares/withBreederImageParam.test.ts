import faker from 'faker'
import { breederFactory } from '@cig-platform/factories'

import BreederImageController from '@Controllers/BreederImageController'
import { withBreederImageParamFactory } from '@Middlewares/withBreederImageParam'

describe('withBreederImageParam', () => {
  it('calls errorCallback when breeder does not exist', async () => {
    const mockErrorCallback = jest.fn()
    const mockRequest: any = {}
    const mockResponse: any = {}
    const mockNext = jest.fn()
    const mockRepository: any = {
      findById: jest.fn().mockResolvedValue({})
    }

    jest.spyOn(BreederImageController, 'repository', 'get').mockReturnValue(mockRepository)

    const withBreederImageParam = withBreederImageParamFactory(mockErrorCallback)

    await withBreederImageParam(mockRequest, mockResponse, mockNext)

    expect(mockNext).not.toHaveBeenCalled()
    expect(mockErrorCallback).toHaveBeenCalled()
  })
 
  it('calls errorCallback when breederImage does not exist', async () => {
    const mockErrorCallback = jest.fn()
    const mockRequest: any = {
      breeder: breederFactory(),
      params: {
        breederImageId: faker.datatype.uuid()
      }
    }
    const mockResponse: any = {}
    const mockNext = jest.fn()
    const mockRepository: any = {
      findById: jest.fn().mockResolvedValue(null)
    }

    jest.spyOn(BreederImageController, 'repository', 'get').mockReturnValue(mockRepository)

    const withBreederImageParam = withBreederImageParamFactory(mockErrorCallback)

    await withBreederImageParam(mockRequest, mockResponse, mockNext)

    expect(mockNext).not.toHaveBeenCalled()
    expect(mockErrorCallback).toHaveBeenCalled()
    expect(mockRepository.findById).toHaveBeenCalledWith(mockRequest.params.breederImageId)
  })

  it('calls errorCallback when breederImage does not belong to breeder', async () => {
    const mockErrorCallback = jest.fn()
    const mockRequest: any = {
      breeder: breederFactory(),
      params: {
        breederImageId: faker.datatype.uuid()
      }
    }
    const mockResponse: any = {}
    const mockNext = jest.fn()
    const mockRepository: any = {
      findById: jest.fn().mockResolvedValue({ breederId: faker.datatype.uuid() })
    }

    jest.spyOn(BreederImageController, 'repository', 'get').mockReturnValue(mockRepository)

    const withBreederImageParam = withBreederImageParamFactory(mockErrorCallback)

    await withBreederImageParam(mockRequest, mockResponse, mockNext)

    expect(mockNext).not.toHaveBeenCalled()
    expect(mockErrorCallback).toHaveBeenCalled()
    expect(mockRepository.findById).toHaveBeenCalledWith(mockRequest.params.breederImageId)
  })

  it('calls next when breederImage belongs to breeder', async () => {
    const mockErrorCallback = jest.fn()
    const breeder = breederFactory()
    const mockRequest: any = {
      breeder,
      params: {
        breederImageId: faker.datatype.uuid()
      }
    }
    const mockResponse: any = {}
    const mockNext = jest.fn()
    const mockRepository: any = {
      findById: jest.fn().mockResolvedValue({ breederId: breeder.id })
    }

    jest.spyOn(BreederImageController, 'repository', 'get').mockReturnValue(mockRepository)

    const withBreederImageParam = withBreederImageParamFactory(mockErrorCallback)

    await withBreederImageParam(mockRequest, mockResponse, mockNext)

    expect(mockNext).toHaveBeenCalled()
    expect(mockErrorCallback).not.toHaveBeenCalled()
    expect(mockRepository.findById).toHaveBeenCalledWith(mockRequest.params.breederImageId)
  })
})
