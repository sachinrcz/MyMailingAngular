import { Routes } from '@angular/router';

import { MainComponent } from '../main/main.component';
import { FeaturesComponent } from '../features/features.component';
import { ServicesComponent } from '../services/services.component';
import { ContactComponent } from '../contact/contact.component';

export const routes: Routes = [
  { path: 'home',  component: MainComponent },
  { path: 'services',     component: ServicesComponent },
  { path: 'features',     component: FeaturesComponent },
  { path: 'contact',     component: ContactComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
