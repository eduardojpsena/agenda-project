import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContatoService } from '../contato.service';
import { Contato } from './contato';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario: FormGroup;
  contatos: Contato[] = [];
  colunas = ['id', 'nome', 'email', 'favorito']

  constructor(
    private fb: FormBuilder,
    private service: ContatoService
  ) { };

  ngOnInit(): void {
    this.montarFormulario();
    this.listarContatos();
  };

  montarFormulario() {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]]
    })
  };

  favoritar(contato: Contato) {
    this.service
      .favorito(contato)
      .subscribe(response => {
        contato.favorito = !contato.favorito;
      })

  };

  listarContatos() {
    this.service
      .listar()
      .subscribe(response => {
        this.contatos = response;
      })
  };

  submit() {
    const formValues = this.formulario.value;
    const contato: Contato = new Contato(formValues.nome, formValues.email);
    contato.favorito = false;
    this.service
      .salvar(contato)
      .subscribe(response => {
        let lista: Contato[] = [...this.contatos, response]
        this.contatos = lista;
      })
  };

}
