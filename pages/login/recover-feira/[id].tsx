import { useState } from "react";
import { useRouter } from "next/router";
import { Banner, Container, Input, LoginForm, SubmitButton } from "../../../styles/login.style";

import api from "../../../config/api";
import { useAlert } from "react-alert";

export default function Recover() {
	const [pass,setPass] = useState("");
	const [passVerify, setPassVerify] =  useState("");
  
  const router = useRouter();
  const alert = useAlert();

  const recoverPass = (e: any) => {
    e.preventDefault();
		if (pass !== passVerify) {
			alert.error("As senhas não são iguais");
			return;
    }
    const path = router.asPath.split("/");
    const id = path[path.length - 1];
    
    api.post("/affiliate/recover/password/auth", { pass, id }).then(res => {
      alert.success("Senha alterada com sucesso");
      router.push("/login");
    }).catch(err => {
      console.log("erro");
    })
	}

	return(
		<Container>
			<LoginForm>
				<h1 style={{fontSize: 32}}>Digite sua nova senha</h1>
				<form className="tabs" onSubmit={recoverPass}>
					<label>Digite a nova senha</label>
					<Input
            type="password"
            placeholder="Digite sua senha"
            minLength={6}
            pattern="^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){6,16}$"
            onChange={(e) => setPass(e.currentTarget.value)} required />
            <label>Digite a senha novamente</label>
					<Input
            type="password"
            placeholder="Digite sua senha novamente"
            minLength={6}
            pattern="^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){6,16}$"
            onChange={(e) => setPassVerify(e.currentTarget.value)} required />
            <button type="submit" className="text-white font-semibold py-4 text-xl rounded" style={{backgroundColor: "#1FB58F"}}>Alterar senha</button>
				</form>
			</LoginForm>
		</Container>
	);
}
