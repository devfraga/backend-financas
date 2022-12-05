import {Request, Response }from 'express'
import { DeleteReceiveService } from '../../services/receive/DeleteReceiveService'

class DeleteReceiveController{
  async handle(request: Request, response:Response){
    const user_id = request.user_id;
    const item_id = request.query.item_id as string;

    const deleteReceiveService = new DeleteReceiveService();

    const deleteItem = await deleteReceiveService.execute({
      item_id,
      user_id,
    })

    return response.json(deleteItem);

  }
}

export { DeleteReceiveController }