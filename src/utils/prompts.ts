import { IAluno } from "../interfaces/IAluno";
import inquirer from "inquirer"
import { AlunoManager } from "../managers/AlunoManager";

const alunoManager = new AlunoManager();

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
          message: "Digite a idade: ",
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
  return inquirer
    .prompt([
      {
        type: 'list',
        name: 'opcao',
        message: 'Escolha uma opção:',
        choices: [
          { name: 'Adicionar aluno', value: 'adicionar' },
          { name: 'Listar alunos', value: 'listar' },
          { name: 'Sair', value: 'sair' }
        ]
      }
    ])
    .then((resposta) => {
      return resposta.opcao as string;
    });
}