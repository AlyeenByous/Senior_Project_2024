import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-blank-page',
  templateUrl: './blank-page.component.html',
  styleUrls: ['./blank-page.component.css'],
  standalone: true,
  imports: [MatInputModule]
})
export class BlankPageComponent { }

