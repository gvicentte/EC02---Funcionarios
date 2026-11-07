// Classe Funcionario - atributos, construtor, get/set e toString()
class Funcionario {
    #id; #nome; #idade; #cargo; #salario;   // atributos privados (encapsulamento)
    static #proximoId = 1;                  // gera ID automático

    constructor(nome, idade, cargo, salario) {
        this.#id = Funcionario.#proximoId++;
        this.nome = nome;          // usa os setters (já validam)
        this.idade = idade;
        this.cargo = cargo;
        this.salario = salario;
    }

    // ---------- GET ----------
    get id() { return this.#id; }
    get nome() { return this.#nome; }
    get idade() { return this.#idade; }
    get cargo() { return this.#cargo; }
    get salario() { return this.#salario; }

    // ---------- SET ----------
    set nome(valor) { this.#nome = String(valor).trim(); }
    set idade(valor) { this.#idade = Number(valor); }
    set cargo(valor) { this.#cargo = String(valor).trim(); }
    set salario(valor) { this.#salario = Number(valor); }

    // Atualiza vários atributos de uma vez usando os setters
    atualizar(nome, idade, cargo, salario) {
        this.nome = nome;
        this.idade = idade;
        this.cargo = cargo;
        this.salario = salario;
    }

    salarioFormatado() {
        return this.#salario.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    }

    toString() {
        return `#${this.#id} | ${this.#nome} | ${this.#idade} anos | ${this.#cargo} | ${this.salarioFormatado()}`;
    }
}
