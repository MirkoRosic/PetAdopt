import { Component, OnInit } from '@angular/core';
import { AdoptionList } from '../model/adoption';
import { AdoptionService } from '../services/adoption.service';

@Component({
  selector: 'app-adoptions',
  templateUrl: './adoptions.component.html',
  styleUrls: ['./adoptions.component.css']
})
export class AdoptionsComponent implements OnInit {
  adoptions: AdoptionList = new AdoptionList();

  constructor(private service: AdoptionService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe(x => {
      this.adoptions = x;
    })
  }

  approveAdoption(id: number) {
    this.service.deleteOne(id).subscribe(x => {
      this.getAll();
    })
  }

}
