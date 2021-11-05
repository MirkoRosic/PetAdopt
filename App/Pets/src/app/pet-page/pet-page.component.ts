import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Adoption } from '../model/adoption.model';
import { Pet } from '../model/pet.model';
import { PetsService } from '../pets.service';

@Component({
  selector: 'app-pet-page',
  templateUrl: './pet-page.component.html',
  styleUrls: ['./pet-page.component.css']
})
export class PetPageComponent implements OnInit {
  user = {username: '', contact: ''};
  petId: number = 0;
  pet: Pet = new Pet();

  adoption: Adoption = new Adoption();


  constructor(private route: ActivatedRoute, private service: PetsService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      this.petId = routeParams['id'];
      this.getOnePet();
    })
  }

  getOnePet() {
    this.service.getOnePet(this.petId).subscribe((x:any)=> {
      this.pet = x;
    })
  }

  onSubmit() {
    console.log("Form submitted: ", JSON.stringify(this.user));
    this.adoption.petId = this.petId;
    this.adoption.petName = this.pet.name;
    this.adoption.name = this.user.username;
    this.adoption.contact = this.user.contact;
    this.service.postAdoption(this.adoption).subscribe((x:any)=> {
      this.adoption = new Adoption(x)
      this.router.navigateByUrl('/adoptions')
    })
  }

}
