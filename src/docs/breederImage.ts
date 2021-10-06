import createDoc from '@cig-platform/docs/build/docs/createDoc'

const breederImageDocs = {
  ...createDoc('/breeders/{breederId}/images', ['Breeders'], [
    {
      method: 'post',
      title: 'Register breeder image',
      files: ['files']
    }
  ], {
    pathVariables: [{ type: 'string', name: 'breederId' }]
  })
}

export default breederImageDocs
