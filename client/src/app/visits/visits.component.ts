import { Component, inject, OnInit, type OnDestroy } from '@angular/core';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { FormsModule } from '@angular/forms';
import { MemberCardComponent } from "../members/member-card/member-card.component";
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { VisitsService } from '../_services/visits.service';

@Component({
  selector: 'app-visits',
  standalone: true,
  imports: [ButtonsModule, FormsModule, MemberCardComponent, PaginationModule],
  templateUrl: './visits.component.html',
  styleUrl: './visits.component.css'
})
export class VisitsComponent implements OnInit, OnDestroy {
  visitsService = inject(VisitsService);
  predicate = 'visited';
  pageNumber = 1;
  pageSize = 5;

  ngOnInit(): void {
    this.loadVisits();
  }

  getTitle() {
    switch(this.predicate) {
      case 'visited': return 'Members you visit';
      case 'visitedBy': return 'Members who visit you';
      default: return 'Mutual'
    }
  }

  loadVisits() {
    this.visitsService.getVisits(this.predicate, this.pageNumber, this.pageSize);
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadVisits();
    }
  }

  ngOnDestroy(): void {
    this.visitsService.paginatedResult.set(null);
  }

}