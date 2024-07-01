// import { NavLink, NavigateFunction, useNavigate } from "react-router-dom"
// import { toast } from "react-toastify"
// import { user } from "../../models/user"

// function Login({
//   onLogin,
// }: {
//   onLogin: React.Dispatch<React.SetStateAction<user | null>>
// }) {
//   const navigate: NavigateFunction = useNavigate()

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     const formData = Object.fromEntries(new FormData(e.currentTarget).entries())
//     try {
//       const response = await fetch("/api/v1/token/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       })
//       const data = await response.json()
//       if (response.ok) {
//         localStorage.setItem("refresh", data.refresh)
//         localStorage.setItem("token", data.access)
//         const userResponse = await fetch("/api/v1/users/me/", {
//           headers: {
//             Authorization: `Bearer ${data.access}`,
//           },
//         })
//         const user = await userResponse.json()
//         localStorage.setItem("user", JSON.stringify(user))
//         onLogin(user)
//         navigate("/")
//         toast.success("Logged in successfully")
//       } else {
//         toast.error("Invalid username or password")
//       }
//     } catch (error) {
//       toast.error("Something went wrong. Please try again.")
//     }
//   }

//   return (
//     <div className="flex justify-center">
//       <form onSubmit={handleSubmit} className="card w-1/2 bg-base-300 p-5">
//         <h2 className="text-center font-bold text-2xl mb-4">
//           🪵 Login to the website
//         </h2>
//         <p className="text-center mb-4">
//           <strong>Login</strong> to your account to access all the features and
//           content.
//           <br />
//           Don't have an account ? Click{" "}
//           <NavLink to="/register" className="link hover:link-primary">
//             here
//           </NavLink>
//         </p>
//         <label className="input input-bordered flex items-center gap-2 mb-2">
//           <i className="bi bi-envelope-fill"></i>
//           <input
//             type="text"
//             className="grow"
//             name="username"
//             placeholder="Username"
//           />
//         </label>
//         <label className="input input-bordered flex items-center gap-2 mb-12">
//           <i className="bi bi-key-fill"></i>
//           <input
//             type="password"
//             className="grow"
//             name="password"
//             placeholder="Password"
//           />
//         </label>
//         <button className="btn btn-primary btn-block w-full" type="submit">
//           Login
//         </button>
//       </form>
//     </div>
//   )
// }

// export default Login
