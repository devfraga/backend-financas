import {Request, Response }from 'express'
import { ListUserBalanceService } from '../../services/user/ListUserBalanceService'

class ListUserBalanceController{
  async handle(request: Request, response:Response){
    const user_id = request.user_id;
    const date = request.query.date as string;

    const listUserBalanceService = new ListUserBalanceService();

    const detail = await listUserBalanceService.execute({
      user_id,
      date,
    })
    
    return response.json(detail);

  }
}

export { ListUserBalanceController }