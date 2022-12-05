import prismaClient from "../../prisma";

interface ReceiveRequest {
  description: string;
  value: number;
  type: string;
  date: string;
  user_id: string;
}

class CreateReceiveService{
  async execute({ description, type, value, date, user_id }: ReceiveRequest){

    if (!user_id) {
      throw new Error("Invalid user");
    }

    const findUser = await prismaClient.user.findFirst({
      where:{
        id: user_id,
      }
    })

    if(type === "receita"){
      await prismaClient.user.update({
        where:{
          id: user_id,
        },
        data:{
          balance: findUser.balance + Number(value)
        }
      })


    }else{
      await prismaClient.user.update({
        where:{
          id: user_id,
        },
        data:{
          balance: findUser.balance - Number(value)
        }
      })
    }


    const newReceive = await prismaClient.receive.create({
      data:{
        description,
        type,
        value,
        date,
        user_id,
      }
    })

    return newReceive;

   
  }
}

export { CreateReceiveService }