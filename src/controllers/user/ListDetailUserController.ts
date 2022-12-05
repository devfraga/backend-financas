import {Request, Response }from 'express'
import { ListDetailUserService } from '../../services/user/ListDetailUserService'

class ListDetailUserController{
  async handle(request: Request, response:Response){
    const user_id = request.user_id;

    const listDetailUserService = new ListDetailUserService();

    const user = await listDetailUserService.execute(user_id)
    
    return response.json(user);

  }
}

export { ListDetailUserController }