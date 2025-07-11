import { appendFile } from "fs";
import { IAluno } from "../interfaces/IAluno";
import { Aluno } from "../models/Aluno";
import fs from "fs"

export class AlunoManager {
    private dbFile: string = `src/database/database.json`;

    private conteudoDoArquivo = fs.readFileSync(this.dbFile, "utf-8");

    private alunos: IAluno[] = JSON.parse(this.conteudoDoArquivo);
    
    public async adicionarAluno(novoAluno: IAluno): Promise<void> {
        this.alunos.filter((aluno) => {
            if (aluno.matricula.toLowerCase() === novoAluno.matricula.toLowerCase()) {
                throw new Error(`O aluno com matrícula ${novoAluno.matricula} já está cadastrado!`);
            }
        })

        this.alunos.push(novoAluno);

        await this.salvarAlunos();

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

        if (aluno) {
            if (novosDados.nome === "") novosDados.nome = aluno.nome;
            if (!novosDados.idade) novosDados.idade = aluno.idade;

            aluno = {...novosDados};
            const index = this.alunos.findIndex(a => a.matricula === aluno?.matricula);
            this.alunos[index] = aluno;

            await this.salvarAlunos();

            console.log(`Aluno ${matricula} editado com sucesso.`);
        } else {
            throw new Error(`Aluno com matrícula ${matricula} não encontrado`);
        }
    }

    public async deletarAluno(matricula: string): Promise<void> {
        let aluno = this.alunos.find(aluno => aluno.matricula  === matricula);

        if (aluno) {
            this.alunos = this.alunos.filter(a => a.matricula !== aluno.matricula);

            await this.salvarAlunos();

            console.log(`Aluno ${matricula} excluído com sucesso.`);
        } else {
            throw new Error(`Aluno com matrícula ${matricula} não encontrado`);
        }
    }


    public async salvarAlunos() {
        try {
            const json = JSON.stringify(this.alunos, null, 2);
            fs.writeFileSync(this.dbFile, json, "utf-8");
        } catch (error) {
            throw error;
        }
    }
}