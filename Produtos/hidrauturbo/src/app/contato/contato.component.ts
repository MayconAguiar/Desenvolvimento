import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Contato } from '../data-model';
import { Http, Response } from '@angular/http';



@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})

export class ContatoComponent implements OnInit {

  constructor(private http:Http) { }
  
  EMAIL_REGEX : any = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
  public contato : Contato;

  fromFormControl : FormControl;

  ngOnInit() {
    this.contato = new Contato();
    this.fromFormControl = new FormControl('', [
      Validators.required,
      Validators.pattern(this.EMAIL_REGEX)
    ])
  }

  onSubmit(ngForm) {
    console.log(ngForm);
    this.envieEmail()
    .then((this.emailEnviadoComSucesso, ()=>{}));
  }

  emailEnviadoComSucesso() {
    console.log("email enviado com sucesso");
  }



  envieEmail(){
    let promise = new Promise((resolve, reject) => {
      let apiURL = "http://localhost/ServicosHidrauTurbo/email/enviar" +
      "?nome="+this.contato.nome +
      "&de=" + this.contato.email +
      "&assunto=" + this.contato.assunto +
      "&mensagem=" + this.contato.mensagem;

      this.http.get(apiURL)
        .toPromise()
        .then(
          res => { 
            // Success
            resolve();
          }
        );
    });
    return promise;
  }

}
