import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContatoService } from '../contato.service';
import { Contato } from './contato';
import { MatDialog } from '@angular/material/dialog';
import { ContatoDetalheComponent } from '../contato-detalhe/contato-detalhe.component';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario: FormGroup;
  contatos: Contato[] = [];
  colunas = ['foto', 'id', 'nome', 'fone', 'email', 'favorito']

  totalElementos= 0;
  pagina = 0;
  tamanho = 10;
  pageSizeOptions: number[] = [10]

  constructor(
    private fb: FormBuilder,
    private service: ContatoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { };

  ngOnInit(): void {
    this.montarFormulario();
    this.listarContatos(this.pagina, this.tamanho);
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

  listarContatos(pagina = 0, tamanho = 10) {
    this.service
      .listar(pagina, tamanho)
      .subscribe(response => {
        this.contatos = response.content;
        this.totalElementos = response.totalElements;
        this.pagina = response.number;
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

  paginar(event: PageEvent) {
    this.pagina = event.pageIndex;
    this.listarContatos(this.pagina, this.tamanho);
  }

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
        this.listarContatos();
        this.snackBar.open('Contato adicionado com sucesso!', 'Sucesso!', {
          duration: 2000
        })
        this.formulario.reset();
      })
  };

}
