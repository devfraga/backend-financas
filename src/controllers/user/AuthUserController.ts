import {Request, Response} from 'express'
import {AuthUserService} from '../../services/user/AuthUserService'

class AuthUserController{
  async handle(request: Request, response: Response){
    const { email, password } = request.body

    const authUserService = new AuthUserService();

    const auth = await authUserService.execute({
      email,
      password,
    })

    return response.json(auth);

  }
}

export { AuthUserController };