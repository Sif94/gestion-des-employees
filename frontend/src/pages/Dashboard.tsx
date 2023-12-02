import AuthContext from "@/components/shared/AuthContext.tsx"
import { useContext } from "react"


const Dashboard = () => {
    const {user} = useContext(AuthContext)
  return (
    <div>
        <h1 className="text-xl font-bold text-center">Bienvenue Dans votre Dashboard {`${user.nom} ${user.prenom}`}</h1>
    </div>
  )
}

export default Dashboard