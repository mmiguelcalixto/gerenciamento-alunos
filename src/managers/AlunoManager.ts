import { appendFile } from "fs";
import { IAluno } from "../interfaces/IAluno";
import { Aluno } from "../models/Aluno";
import fs from "fs"

export class AlunoManager {
    private dbFile: string = `src/database/database.json`;

    private conteudoDoArquivo = fs.readFileSync(this.dbFile, "utf-8");

    private alunos: IAluno[] = JSON.parse(this.conteudoDoArquivo);
    
    public adicionarAluno(novoAluno: IAluno): void {
        this.alunos.filter((aluno) => {
            if (aluno.matricula.toLowerCase() === novoAluno.matricula.toLowerCase()) {
                throw new Error(`O aluno com matrícula ${novoAluno.matricula} já está cadastrado!`);
            }
        })

        this.alunos.push(novoAluno);

        const novoConteudo = JSON.stringify(this.alunos, null, 2);
        fs.writeFileSync(this.dbFile, novoConteudo, "utf-8");

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

    public async editarAluno(matricula: string, novosDados: IAluno): Promise<void> {
        let aluno = this.alunos.find(aluno => aluno.matricula  === matricula);
        console.log(aluno, "---------------------------");

        if (aluno) {
            aluno = {...novosDados};
            console.log(aluno, "---------------------------");

            const index = this.alunos.findIndex(a => a.matricula === aluno?.matricula);
            this.alunos[index] = aluno;

            await this.salvarAlunos();
        }
    }

    public async salvarAlunos() {
        const json = JSON.stringify(this.alunos, null, 2);
        fs.writeFileSync(this.dbFile, json, "utf-8");
    }
}