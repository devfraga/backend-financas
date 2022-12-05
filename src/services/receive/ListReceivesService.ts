import prismaClient from "../../prisma";

interface ReceiveRequest {
  user_id: string;
  date: string;
}

class ListReceivesService{
  async execute({ date, user_id }: ReceiveRequest){

    const receives = await prismaClient.receive.findMany({
      where:{
        date: date,
        user_id: user_id,
      },
      orderBy:{
        created_at: "desc"
      }
    })

    return receives;

   
  }
}

export { ListReceivesService }