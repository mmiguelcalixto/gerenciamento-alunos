import { appendFile } from "fs";
import { IAluno } from "../interfaces/IAluno";
import { Aluno } from "../models/Aluno";
import fs from "fs"

export class AlunoManager {
    private alunos: IAluno[] = [];
    
    public adicionarAluno(novoAluno: IAluno): void {
        this.alunos.filter((aluno) => {
            if (aluno.matricula.toLowerCase() === novoAluno.matricula.toLowerCase()) {
                throw new Error(`O aluno com matrícula ${novoAluno.matricula} já está cadastrado!`);
            }
        })

        const dbFile: string = `src/database/database.json`;

        try {
            const conteudoDoArquivo = fs.readFileSync(dbFile, "utf-8");
            this.alunos = JSON.parse(conteudoDoArquivo);
          } catch (erro: any) {
            if (erro.code !== "ENOENT") {
              throw erro;
            }
        }

        this.alunos.push(novoAluno);

        const novoConteudo = JSON.stringify(this.alunos, null, 2);
        fs.writeFileSync(dbFile, novoConteudo, "utf-8");

        console.log(`Aluno ${novoAluno.nome} adiconado com sucesso.`);
    }
    
    public listarAlunos(): void {
        if (this.alunos.length === 0) {
            console.log("Nenhum aluno cadastrado.");
        } else {
            this.alunos.map(aluno => {
                const alunoObj = new Aluno(aluno.matricula, aluno.nome, aluno.idade);
                alunoObj.exibirDetalhes();
            })
        }
    }
}