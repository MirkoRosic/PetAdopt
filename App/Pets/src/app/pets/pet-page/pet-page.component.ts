import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Adoption } from 'src/app/model/adoption';
import { Pet } from 'src/app/model/pet.model';
import { AdoptionService } from 'src/app/services/adoption.service';
import { PetService } from 'src/app/services/pet.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-pet-page',
  templateUrl: './pet-page.component.html',
  styleUrls: ['./pet-page.component.css']
})
export class PetPageComponent implements OnInit {
  petId: number = NaN;
  pet: Pet = new Pet();
  adoption: Adoption = new Adoption();

  constructor(private route: ActivatedRoute, private service: PetService, private aService: AdoptionService, public toast: ToastService, private router: Router) { 

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.petId = params['id']
      this.getPet();
    })
  }

  getPet() {
    this.service.getOne(this.petId).subscribe(x => {
      this.pet = x;
    })
  }

  submitAdoption() {
    if (!this.adoption.name || !this.adoption.contact) {
      this.toast.show("Please fill in the form", { classname: 'bg-danger text-light', delay: 5000 })
      return;
    }
    this.adoption.petId = this.petId
    this.adoption.petName = this.pet.name;
    this.aService.postAdoption(this.adoption).subscribe(x => {
      this.toast.show("Request sent",  { classname: 'bg-success text-light', delay: 5000 })
      this.adoption = new Adoption();
      this.router.navigateByUrl("/pets")
    }, err => {
      this.toast.show("Error",  { classname: 'bg-danger text-light', delay: 10000 })
    })
  }

}
