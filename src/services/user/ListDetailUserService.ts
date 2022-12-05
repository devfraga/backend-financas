import prismaClient from "../../prisma";

class ListDetailUserService{
  async execute(user_id: string){

    if (!user_id) {
      throw new Error("Invalid user");
    }

    const user = await prismaClient.user.findFirst({
      where:{
        id: user_id,
      },
      select:{
        id: true,
        name: true,
        email: true,
        balance: true,
        created_at: true,
        updated_at:true,
      }
    })

    if(user === null){
      throw new Error("User not found")
    }

    return user;

  }
}

export { ListDetailUserService }