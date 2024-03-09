import AuthService from '@/domain/services/AuthService'
import { NextApiRequest, NextApiResponse } from 'next'
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const authService = new AuthService()
  const session = await authService.getSession()
 
  if (!session) {
    res.status(401).json({
      error: 'User is not authenticated',
    })
    return
  }
 
  if (session.user.role !== 'admin') {
    res.status(401).json({
      error: 'Unauthorized access: User does not have admin privileges.',
    })
    return
  }
}