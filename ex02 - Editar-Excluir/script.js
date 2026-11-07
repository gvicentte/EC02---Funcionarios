// Exercício 2 - Excluir e alterar (onclick com funções anônimas + métodos da classe)
const funcionarios = [];
let funcionarioEmEdicao = null;   // null = cadastrando | objeto = editando

const btnCadastrar = document.getElementById("btnCadastrar");
const btnCancelar = document.getElementById("btnCancelar");

function lerFormulario() {
    return {
        nome: document.getElementById("nome").value.trim(),
        idade: document.getElementById("idade").value,
        cargo: document.getElementById("cargo").value.trim(),
        salario: document.getElementById("salario").value
    };
}

function validar(d) {
    if (d.nome === "" || d.idade === "" || d.cargo === "" || d.salario === "") {
        alert("Preencha todos os campos!");
        return false;
    }
    return true;
}

function limparFormulario() {
    document.getElementById("formFuncionario").reset();
    funcionarioEmEdicao = null;
    btnCadastrar.textContent = "Cadastrar";
    btnCancelar.hidden = true;
}

function carregarNoFormulario(f) {
    document.getElementById("nome").value = f.nome;       // getters
    document.getElementById("idade").value = f.idade;
    document.getElementById("cargo").value = f.cargo;
    document.getElementById("salario").value = f.salario;
    funcionarioEmEdicao = f;
    btnCadastrar.textContent = "Salvar alteração";
    btnCancelar.hidden = false;
}

function listarFuncionarios() {
    const tbody = document.getElementById("tabelaFuncionarios");
    tbody.innerHTML = "";

    for (let i = 0; i < funcionarios.length; i++) {
        const f = funcionarios[i];
        const tr = document.createElement("tr");
        tr.innerHTML =
            "<td>" + f.id + "</td><td>" + f.nome + "</td><td>" + f.idade +
            "</td><td>" + f.cargo + "</td><td>" + f.salarioFormatado() + "</td>";

        const tdAcoes = document.createElement("td");

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.onclick = function () {          // função anônima
            carregarNoFormulario(f);
        };

        const btnExcluir = document.createElement("button");
        btnExcluir.textContent = "Excluir";
        btnExcluir.onclick = function () {         // função anônima
            if (confirm("Excluir " + f.nome + "?")) {
                funcionarios.splice(funcionarios.indexOf(f), 1);
                if (funcionarioEmEdicao === f) limparFormulario();
                listarFuncionarios();
            }
        };

        tdAcoes.append(btnEditar, " ", btnExcluir);
        tr.appendChild(tdAcoes);
        tbody.appendChild(tr);
    }
}

btnCadastrar.onclick = function () {           // função anônima
    const d = lerFormulario();
    if (!validar(d)) return;

    if (funcionarioEmEdicao === null) {
        funcionarios.push(new Funcionario(d.nome, d.idade, d.cargo, d.salario));
    } else {
        // Atualiza usando o método da classe (que usa os setters)
        funcionarioEmEdicao.atualizar(d.nome, d.idade, d.cargo, d.salario);
        console.log("Atualizado:", funcionarioEmEdicao.toString());
    }

    limparFormulario();
    listarFuncionarios();
};

btnCancelar.onclick = function () {
    limparFormulario();
};
