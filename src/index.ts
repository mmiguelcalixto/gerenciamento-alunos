import { AlunoManager } from "./managers/AlunoManager";
import { promptMenuPrincipal, promptParaDetalhesDoAluno } from "./utils/prompts";

async function main() {
    const manager = new AlunoManager();
    let sair = false;

    while (!sair) {
        await promptMenuPrincipal().then(async res => {
            switch (res) {
                case "adicionar":
                    await promptParaDetalhesDoAluno().then(
                        aluno => manager.adicionarAluno(aluno)
                    )
                    break;
                case "listar":
                    manager.listarAlunos();
                    break;
                case "editar":
                    await promptParaDetalhesDoAluno().then(
                        aluno => manager.editarAluno(aluno.matricula, { ...aluno })
                    )
                    break;
                case "sair":
                    sair = true;
                    break;
                default:
                    break;
            }
        });
    }
}

main();