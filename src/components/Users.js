import React, {useState, useEffect} from "react";
const API = process.env.REACT_APP_API




export const Users = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [passsword, setPassword] = useState("")

    const [editing, setEditing] = useState(false)
    const [id, setID] = useState("")

    const [users, setUsers] = useState([])


    const agregar = async (e) =>{
        e.preventDefault()
        if (!editing){
            const respuesta = await fetch(`${API}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                "username":username,
                "email": email,
                "password": passsword
            }
            )
        })
        const data = await respuesta.json()
        console.log(data)
        }

        else{
           const respuesta = await fetch(`${API}/users/${id}`,{
               method: "PUT",
               headers: {
                   "Content-Type": "application/json"
               },
               body: JSON.stringify({
                   "username":username,
                "email": email,
                "password": passsword
               })


           })
            const data = await respuesta.json()
            console.log(data)
            setEditing(false)
            setID("")

        }
        await getUsers()
         setUsername("")
        setEmail("")
        setPassword("")

    }

    const getUsers = async () => {
       const respuesta = await fetch(`${API}/users`)
        const data = await respuesta.json()
         setUsers(data)

    }

    useEffect(() => {
        getUsers()

    }, [])


    const deleteUser = async (id) =>{
       const respuesta = window.confirm("¿Desea eliminar a este usuario?")
        if (respuesta){
            const respuesta = await fetch(`${API}/users/${id}`,{
            method: "DELETE"
        })

        const data = await respuesta.json()
        console.log(data)
        await getUsers()

        }

    }

    const EditUser = async (id) =>{
       const respuesta = await fetch(`${API}/user/${id}`)
        const data = await respuesta.json()
        setEditing(true)
        setID(id)

        setUsername(data.username)
        setEmail(data.email)
        setPassword(data.password)

    }


    return (
    <div className="row">
      <div className="col-md-4">
        <form onSubmit={agregar} className="card card-body">
          <div className="form-group">
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="form-control"
              placeholder="Username"
              autoFocus
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-control"
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={passsword}
              className="form-control"
              placeholder="Password"
            />
          </div>
          <button className="btn btn-primary btn-block">
            Crear
          </button>
        </form>
      </div>
        <div className="col-md-6">
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Operaciones</th>


                </tr>

                </thead>

                <tbody>
                {users.map(user =>(
                    <tr key={user._id}>
                        <td>${user.username}</td>
                        <td>${user.email}</td>
                        <td>${user.password}</td>
                        <td>
                            <button className="btn btn-secondary btn-sm btn-block"
                            onClick={() => EditUser(user._id)}
                            >
                            Editar
                        </button>
                        <button className="btn btn-danger btn-sm btn-block"
                        onClick={() => deleteUser(user._id)}

                        >
                            Eliminar

                        </button>
                        </td>
                    </tr>
                ))}

                </tbody>


            </table>

        </div>
    </div>
  );
}