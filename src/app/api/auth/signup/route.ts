import { NextResponse } from "next/server";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import connectDB from "@/libs/mongodb";

// Registrar usuario
export async function POST(request: Request) {
  const { fullname, email, password } = await request.json();
  console.log(fullname, email, password);

  // Validar contraseña
  if (password < 6) {
    return NextResponse.json(
      {
        message: "Password must be at least 6 characters",
      },
      {
        status: 400,
      }
    );
  }

  try {
    await connectDB();
    // Validar si el usuario ya existe
    const userFound = await User.findOne({ email }); // consulta
    if (userFound)
      return NextResponse.json(
        {
          message: "Email already exists",
        },
        {
          status: 409,
        }
      );
    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 12);

    // Objeto usuario
    const user = new User({
      email,
      fullname,
      password: hashedPassword,
    });
    const savedUser = await user.save(); // guardar en la DB

    return NextResponse.json({
      _id: savedUser._id,
      email: savedUser.email,
      fullname: savedUser.fullname
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 400,
        }
      );
    }
  }
}
