// import { user } from "../../../models/user"
// import { toast } from "react-toastify"

// function ModifyForm({
//   user,
//   setUser,
// }: {
//   user: user | null
//   setUser: React.Dispatch<React.SetStateAction<user | null>>
// }) {
//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!user) return
//     setUser({ ...user, [e.target.name]: e.target.value })
//   }

//   const confirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const password = document.querySelector(
//       'input[name="password"]'
//     ) as HTMLInputElement
//     if (e.target.value !== password.value) {
//       document.getElementById("password_confirm_error")!.textContent =
//         "Passwords do not match."
//     } else {
//       document.getElementById("password_confirm_error")!.textContent = ""
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     const formData = Object.fromEntries(new FormData(e.currentTarget).entries())
//     if (!formData.password) {
//       delete formData.password
//     }
//     try {
//       const response = await fetch(`/api/v1/users/${user?.id}/`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: JSON.stringify(formData),
//       })
//       const data = await response.json()
//       if (response.ok) {
//         toast.success("Profile updated successfully!")
//       } else {
//         toast.error("Something went wrong.")
//         Object.keys(data).forEach((key) => {
//           toast.error(`${key}: ${data[key]}`)
//         })
//       }
//     } catch (error) {
//       toast.error("❌ Something went wrong." + error)
//     }
//   }
//   return (
//     <form onSubmit={handleSubmit}>
//       <p className="text-center mb-8"></p>
//       <label className="input input-bordered flex items-center gap-2 mb-2">
//         <i className="bi bi-person-fill"></i>
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           className="grow"
//           value={user?.username}
//           onChange={handleChange}
//         />
//       </label>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
//         <label className="input input-bordered flex items-center gap-2">
//           <i className="bi bi-person-fill"></i>
//           <input
//             type="text"
//             name="first_name"
//             placeholder="Firstname"
//             value={user?.first_name}
//             onChange={handleChange}
//           />
//         </label>
//         <label className="input input-bordered flex items-center gap-2">
//           <i className="bi bi-person-fill"></i>
//           <input
//             type="text"
//             name="last_name"
//             placeholder="Lastname"
//             value={user?.last_name}
//             onChange={handleChange}
//           />
//         </label>
//       </div>
//       <label className="input input-bordered flex items-center gap-2 mb-2">
//         <i className="bi bi-envelope-fill"></i>
//         <input
//           type="text"
//           name="email"
//           placeholder="Email"
//           value={user?.email}
//           onChange={handleChange}
//         />
//       </label>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
//         <label className="input input-bordered flex items-center gap-2">
//           <i className="bi bi-key-fill"></i>
//           <input type="password" name="password" placeholder="Password" />
//         </label>
//         <label className="input input-bordered flex items-center gap-2">
//           <i className="bi bi-key-fill"></i>
//           <input
//             type="password"
//             name="password_confirm"
//             placeholder="Password confirm"
//             onChange={confirmPassword}
//           />
//         </label>
//       </div>
//       <div
//         id="password_confirm_error"
//         className="text-xs text-error mb-12"
//       ></div>
//       <div className="flex justify-center">
//         <button className="btn btn-primary btn-block w-1/2" type="submit">
//           Update
//         </button>
//       </div>
//     </form>
//   )
// }

// export default ModifyForm
