// import { useEffect, useState } from "react"
// import { useNavigate } from "react-router-dom"
// import ModifyForm from "../components/ModifyForm"

// function Profile() {
//   const [user, setUser] = useState<user | null>(null)
//   const navigate = useNavigate()

//   useEffect(() => {
//     fetch("/api/v1/users/me/", {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     }).then((response) => {
//       if (response.ok) {
//         response.json().then((data: user) => {
//           setUser(data)
//         })
//       } else {
//         navigate("/login")
//       }
//     })
//   }, [navigate])

//   return (
//     <div className="flex justify-center">
//       <div className="card w-2/3 bg-base-300 p-5">
//         <h2 className="text-center font-bold text-2xl mb-4">👤 Profile</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2"></div>
//         <p className="text-center mb-8">
//           <strong>This</strong> are all your profile details. You can update it
//           here.
//         </p>
//         <div className="stats shadow">
//           <div className="stat">
//             <div className="stat-figure text-2xl">⌚</div>
//             <div className="stat-title">Joined at</div>
//             <div className="stat-value text-primary">
//               {user?.date_joined.split("T")[0]}{" "}
//               {user?.date_joined.split("T")[1].split(".")[0]}
//             </div>
//             <div className="stat-desc">We're glad to see you here! 🎉</div>
//           </div>

//           <div className="stat">
//             <div className="stat-figure text-2xl">🪃</div>
//             <div className="stat-title">Last update</div>
//             <div className="stat-value text-secondary">
//               {user?.updated_at.split("T")[0]}{" "}
//               {user?.updated_at.split("T")[1].split(".")[0]}
//             </div>
//             <div className="stat-desc">You're doing great! 🚀</div>
//           </div>
//         </div>
//         <ModifyForm user={user} setUser={setUser} />
//       </div>
//     </div>
//   )
// }

// export default Profile
