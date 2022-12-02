import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Jogo } from "src/app/models/jogo.model";


@Component({
  selector: "app-palpitar-jogo",
  templateUrl: "./palpitar-jogo.component.html",
  styleUrls: ["./palpitar-jogo.component.css"],
})
export class PalpitarJogoComponent implements OnInit {

  id?: number;
  placarA?: number;
  placarB?: number;
  selecaoAId!: number;
  selecaoBId!: number;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        let { id } = params;
        if (id !== undefined) {
          this.http.get<Jogo>("https://localhost:5001/api/jogo/buscar/" + id)
            //Executar a requisição
            .subscribe({
              next: (jogo) => {
                this.id = jogo.id;
                this.placarA = jogo.placar;
                this.placarB = jogo.placarB;
                this.selecaoAId = jogo.selecaoAId;
                this.selecaoBId = jogo.selecaoBId;
              }
            });
        }
      }
    })
  }

palpitar(): void {
  let jogo: Jogo = {
    id: this.id,
    placar: this.placarA,
    placarB: this.placarB,
    selecaoAId: this.selecaoAId,
    selecaoBId: this.selecaoBId,
  };

  this.http.patch<Jogo>("https://localhost:5001/api/jogo/palpitar", jogo)
  .subscribe({
    next: () => {
      this.router.navigate(["jogo/listar"]);
    },
  });
}
}
