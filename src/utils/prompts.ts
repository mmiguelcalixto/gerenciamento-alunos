import { IAluno } from "../interfaces/IAluno";
import inquirer from "inquirer"

export async function promptParaDetalhesDoAluno(): Promise<IAluno> {
    const input = [
        {
            type: "input",
            name: "matricula",
            message: "Digite a matrícula: ",
            validate: (input: string): boolean | string => {
              if (input.trim() === "") {
                return "A matrícula não pode ser vazia";
              }
              return true;
            },
        },
        {
            type: "input",
            name: "nome",
            message: "Digite o nome: ",
        },
        {
            type: "input",
            name: "idade",
            message: "Digite a iade: ",
            validate: (input: string): boolean | string => {
              if (input.trim() === "") {
                return "A matrícula não pode ser vazia";
              }
              return true;
            },
        },
    ]

    return await inquirer.prompt<IAluno>(input as any);
}

export async function promptMenuPrincipal(): Promise<string> {
    
}