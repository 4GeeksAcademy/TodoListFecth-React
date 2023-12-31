import React, { useEffect, useState} from "react";
import { FontAwesomeIcon} from '@@fortawesome/react/fontawesome'
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
//include images into your bundle


// Jijitl create your first component
const Home = () => {
	const [valorInput, setValorInput] = useState('Tarea nueva');
	const [porhacer, setPorHacer] = useState(['']);

	useEffect(()=>{
		let URL = "https://playground.4geeks.com/apis/fake/todos/user/spirosis"
		fetch(URL, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(resp =>{
			console.log(resp.ok); //retorna verdad si se conecta
			console.log(resp.status) //codigo 200 o 400
			console.log(resp.text()) //intentara devolver el resultado exacto como cadena (string)
			return resp.json(); //se accede a la api pero se entregan resultados segun solicitud del cliente(la promesa)
		})
		.then(data => {
			console.log(data);
		})
		.catch(error => {
			console.log(error);
		});
		
	})

	const addTask=()=> {
		fetch(URL, {
			method: "PUT",
			body: JSON.stringify(toBeDone),
			headers: {
				"Content-Type": "application/json"
			}
		})
		.then(resp =>{
			console.log(resp.ok); //retorna verdad si se conecta
			console.log(resp.status) //codigo 200 o 400
			console.log(resp.text()) //intentara devolver el resultado exacto como cadena (string)
			return resp.json(); //se accede a la api pero se entregan resultados segun solicitud del cliente(la promesa)
		})
		.then(data => {
			console.log(data);
		})
		.catch(error => {
			console.log(err);
		});
	};

	return (
		
	)
};

export default Home;
