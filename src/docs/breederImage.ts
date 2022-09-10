import createDoc from '@cig-platform/docs/build/docs/createDoc'

const breederImageDocs = {
  ...createDoc('/breeders/{breederId}/images', ['Breeder images'], [
    {
      method: 'post',
      title: 'Register breeder image',
      files: ['files'],
      headerParams: [{ type: 'string', name: 'Cig-Api-Key' }]
    },
    {
      method: 'get',
      title: 'Get breeder images',
      headerParams: [{ type: 'string', name: 'Cig-Api-Key' }]
    }
  ], {
    pathVariables: [{ type: 'string', name: 'breederId' }]
  }),
  ...createDoc('/breeders/{breederId}/images/{breederImageId}', ['Breeder images'], [
    {
      method: 'delete',
      title: 'Delete breeder image',
      headerParams: [{ type: 'string', name: 'Cig-Api-Key' }]
    }
  ], {
    pathVariables: [{ type: 'string', name: 'breederId' }, { type: 'string', name: 'breederImageId' }]
  })
}

export default breederImageDocs
