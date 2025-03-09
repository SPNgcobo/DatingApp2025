import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Developer } from '../_models/developer';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  developer: Developer = {
    developerName: ' Samkelo Perciville Ngcobo',
    developerEmail: ' 2021771874@ufs4life.ac.za',
    developerBio: ' CSIP6833 student passinate about Angular!'
  };
}