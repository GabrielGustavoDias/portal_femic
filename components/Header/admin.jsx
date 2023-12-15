import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Dropdown } from "@nextui-org/react";

import { ContainerAdmin, colourStyles } from "./styles";

const options = [
  { value: "admin", label: "Admin", color: "#555" },
  { value: "exit", label: "Sair", color: "#222" },
]

export default function AdminHeader() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [input,setInput] = useState("");

  const router = useRouter();

  useEffect(() => {
    setName(sessionStorage.getItem("name") || "");
    setAvatar(sessionStorage.getItem("avatar") || "");
  }, []);

  const exit = () => {
    sessionStorage.clear();
    localStorage.clear()
    router.push("/");
  }

  return (
    <ContainerAdmin>
      <h1>Admin</h1>
      <div className="flex content">
        <img src={avatar} width="50" height="50" alt="Foto de perfil" />
        <div className="flex flex-col mx-3">
          <span className="text-semibold text-xl">{name}</span>
          <Dropdown>
            <Dropdown.Button light>Admin</Dropdown.Button>
            <Dropdown.Menu aria-label="Static Actions">
              <Dropdown.Item key="new" textValue="Admin">Admin</Dropdown.Item>
              <Dropdown.Item key="delete" withDivider color="error"  textValue="Sair">
                <button style={{width: "100%"}} onClick={exit}>Sair</button>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </ContainerAdmin>
  )
}
