import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContatoService } from '../contato.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private fb: FormBuilder,
    private service: ContatoService
  ) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]]
    })
  }

  submit() {
    console.log(this.formulario.value)
    
    // this.service
    //     .salvar()
    //     .subscribe( response => {
    //     console.log(response)
    // })
  }

}
