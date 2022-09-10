import { BaseController, withApiKeyFactory } from '@cig-platform/core'
import { API_KEYS_PASSWORD, API_KEYS_SERVICE_URL, API_KEYS_USER } from '@Constants/api-keys'

export default withApiKeyFactory(
  API_KEYS_SERVICE_URL,
  'POULTRY_SERVICE',
  API_KEYS_USER,
  API_KEYS_PASSWORD,
  BaseController.errorResponse
)
