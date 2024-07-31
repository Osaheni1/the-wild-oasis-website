import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  // const res = await fetch(
  //   "https://backend-world-wide-oasis.onrender.com/api/staff/login",
  //   {
  //     method: "POST",
  //     body: JSON.stringify({
  //       email: "realadmin@gmail.com",
  //       password: "password",
  //     }),
  //     headers: { "Content-Type": "application/json" },
  //   }
  // );

  // const data = await res.json();
  // console.log(data);
  // console.log(req.cookies.get("jwt"));
  const response = NextResponse.next();

  // response.headers.set('x-custom-auth-header', 'newAuth')
  // response.cookies.set("jwt", data.token);
  // req.cookies.set("tok", "setcookie");
  // const cookie = req.cookies.getAll();
  // console.log(cookie);
  // console.log("response", cookies().getAll());
  return response;
}
