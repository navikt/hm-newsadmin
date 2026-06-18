import { apiPath } from 'mocks/apiPath'
import { HttpResponse, http } from 'msw'
import { OTPRequest, ResetPasswordRequest, VerifyOTPRequest } from 'utils/types/response-types'

export const resetPasswordHandler = [
  http.post<{}, OTPRequest, {}>(apiPath('api/v1/reset-password/otp'), async ({ request }) => {
    const req: OTPRequest = await request.json()

    return HttpResponse.json({})
  }),
  http.post<{}, VerifyOTPRequest, {}>(apiPath('api/v1/reset-password/otp/verify'), async ({ request }) => {
    const req: VerifyOTPRequest = await request.json()

    return HttpResponse.json({})
  }),
  http.post<{}, ResetPasswordRequest, {}>(apiPath('api/v1/reset-password'), async ({ request }) => {
    const req: ResetPasswordRequest = await request.json()

    return HttpResponse.json({})
  }),
]
