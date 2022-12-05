import {Request, Response }from 'express'
import { ListReceivesService } from '../../services/receive/ListReceivesService'

class ListReceivesController{
  async handle(request: Request, response:Response){
    const date = request.query.date as string;
    const user_id = request.user_id;

    const listReceivesService = new ListReceivesService();

    const user = await listReceivesService.execute({
      user_id,
      date
    })

    return response.json(user);

  }
}

export { ListReceivesController }