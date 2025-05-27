import { Component, computed, inject, input } from '@angular/core';
import type { Member } from '../../_models/member';
import { RouterLink } from '@angular/router';
import { LikesService } from '../../_services/likes.service';
import { PrecenceService } from '../../_services/presence.service';
import { VisitsService } from '../../_services/visits.service';

@Component({
  selector: 'app-member-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './member-card.component.html',
  styleUrl: './member-card.component.css'
})
export class MemberCardComponent {
  private likeService = inject(LikesService);
  private visitService = inject(VisitsService);
  private presenceService = inject(PrecenceService);
  member = input.required<Member>();
  hasLiked = computed(() => this.likeService.likeIds().includes(this.member().id))
  hasVisited = computed(() => this.visitService.visitIds().includes(this.member().id))
  isOnline = computed(() => this.presenceService.onlineUsers().includes(this.member().username));

  toggleLike() {
    this.likeService.toggleLike(this.member().id).subscribe({
      next: () => {
        if (this.hasLiked()) {
          this.likeService.likeIds.update(ids => ids.filter(x => x !== this.member().id))
        } else {
          this.likeService.likeIds.update(ids => [...ids, this.member().id])
        }
      }
    })
  }
  toggleVisit() {
    this.visitService.toggleVisit(this.member().id).subscribe({
      next: () => {
        if (this.hasVisited()) {
          this.visitService.visitIds.update(ids => ids.filter(x => x !== this.member().id))
        } else {
          this.visitService.visitIds.update(ids => [...ids, this.member().id])
        }
      }
    })
  }
}
