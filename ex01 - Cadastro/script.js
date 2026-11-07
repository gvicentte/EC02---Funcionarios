// Exercício 1 - Cadastro e listagem usando a classe Funcionario
const funcionarios = [];   // array de objetos da classe Funcionario

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

function listarFuncionarios() {
    const tbody = document.getElementById("tabelaFuncionarios");
    tbody.innerHTML = "";

    for (const f of funcionarios) {
        const tr = document.createElement("tr");
        tr.innerHTML =
            "<td>" + f.id + "</td>" +
            "<td>" + f.nome + "</td>" +
            "<td>" + f.idade + "</td>" +
            "<td>" + f.cargo + "</td>" +
            "<td>" + f.salarioFormatado() + "</td>" +
            "<td>-</td>";
        tbody.appendChild(tr);
    }
}

function cadastrar() {
    const d = lerFormulario();
    if (!validar(d)) return;

    const funcionario = new Funcionario(d.nome, d.idade, d.cargo, d.salario);
    funcionarios.push(funcionario);
    console.log("Cadastrado:", funcionario.toString());

    document.getElementById("formFuncionario").reset();
    listarFuncionarios();
}

// Evento de clique do botão Cadastrar
document.getElementById("btnCadastrar").onclick = cadastrar;
