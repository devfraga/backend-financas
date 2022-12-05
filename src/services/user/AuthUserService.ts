import prismaClient from "../../prisma";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'


interface AuthRequest{
  email: string;
  password: string;
}

class AuthUserService{
  async execute({ email, password }: AuthRequest){

    const user = await prismaClient.user.findFirst({
      where:{
        email: email,
      }
    })

    if(!user){
      throw new Error("Email/Password incorret")
    }

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch){
      throw new Error("Email/Password incorret")
    }

    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      "4f93ac9d10cb751b8c9c646bc9dbccb9",
      {
        subject: user.id,
        expiresIn: '30d'
      }
    )

    return{
      id: user.id,
      name: user.name,
      token: token
    }

  }
}

export { AuthUserService };