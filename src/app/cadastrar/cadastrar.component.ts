import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  usuario: Usuario = new Usuario();
  confirmarSenha : string;
  tipoUsuar: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit(): void {
    window.scroll(0,0)
  }

  confirmSenha(event: any){
    this.confirmarSenha = event.target.value
  }

  tipoUsuario(event: any){
    this.tipoUsuar = event.target.value
  }
  cadastrar(){
    this.usuario.tipo = this.tipoUsuar
    
    if(this.usuario.senha != this.confirmarSenha){
      alert('a senha está incorreta')
    }
    else{
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario)=> {
        this.usuario = resp
        this.router.navigate(['/entrar'])
        this.alertas.showAlertSuccess('Usuário cadastrado com sucesso')
      })
    }

  }

}