import prismaClient from "../../prisma";

interface ReceiveRequest {
  item_id: string;
  user_id: string;
}

class DeleteReceiveService{
  async execute({ item_id, user_id }: ReceiveRequest){

    const receive = await prismaClient.receive.findFirst({
      where:{
        id: item_id
      }
    })

    await prismaClient.receive.delete({
      where:{
        id: item_id
      }
    })


    const findUser = await prismaClient.user.findFirst({
      where:{
        id: user_id,
      }
    })

    const valueUpdated = receive.type === 'despesa' ? findUser.balance += receive.value : findUser.balance -= receive.value;

    const updateUser = await prismaClient.user.update({
      where:{
        id: user_id,
      },
      data:{
        balance: valueUpdated
      }
    })

    return { status: 'updated'}

   
  }
}

export { DeleteReceiveService }