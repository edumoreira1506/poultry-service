import createDoc from '@cig-platform/docs/build/docs/createDoc'

const breederImageDocs = {
  ...createDoc('/breeders/{breederId}/images', ['Breeder images'], [
    {
      method: 'post',
      title: 'Register breeder image',
      files: ['files']
    }
  ], {
    pathVariables: [{ type: 'string', name: 'breederId' }]
  }),
  ...createDoc('/breeders/{breederId}/images', ['Breeder images'], [
    {
      method: 'get',
      title: 'Get breeder images',
    }
  ], {
    pathVariables: [{ type: 'string', name: 'breederId' }]
  }),
  ...createDoc('/breeders/{breederId}/images/{breederImageId}', ['Breeder images'], [
    {
      method: 'delete',
      title: 'Delete breeder image',
    }
  ], {
    pathVariables: [{ type: 'string', name: 'breederId' }, { type: 'string', name: 'breederImageId' }]
  })
}

export default breederImageDocs
