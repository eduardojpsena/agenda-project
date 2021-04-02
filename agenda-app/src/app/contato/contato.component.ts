import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContatoService } from '../contato.service';
import { Contato } from './contato';
import { MatDialog } from '@angular/material/dialog';
import { ContatoDetalheComponent } from '../contato-detalhe/contato-detalhe.component';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario: FormGroup;
  contatos: Contato[] = [];
  colunas = ['foto', 'id', 'nome', 'fone', 'email', 'favorito']

  constructor(
    private fb: FormBuilder,
    private service: ContatoService,
    private dialog: MatDialog
  ) { };

  ngOnInit(): void {
    this.montarFormulario();
    this.listarContatos();
  };

  montarFormulario() {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      fone: ['', Validators.required],
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

  uploadFoto(event, contato) {
    const files = event.target.files;
    if (files) {
      const foto = files[0];
      const formData: FormData = new FormData();
      formData.append("foto", foto);
      this.service
          .upload(contato, formData)
          .subscribe( response => {
            this.listarContatos();
          })     
    }
  };

  visualizarContato(contato: Contato){
    this.dialog.open(ContatoDetalheComponent, {
      width: '400px',
      height: '500px',
      data: contato
    })
  };

  submit() {
    const formValues = this.formulario.value;
    const contato: Contato = new Contato(formValues.nome, formValues.fone ,formValues.email);
    contato.favorito = false;
    this.service
      .salvar(contato)
      .subscribe(response => {
        let lista: Contato[] = [...this.contatos, response]
        this.contatos = lista;
      })
  };

}
