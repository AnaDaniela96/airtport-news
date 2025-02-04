import { Routes } from '@angular/router';
import { AirportDetailsComponent } from './pages/airport-details/airport-details.component';
import { HomeComponent } from './pages/home/home.component';
import { HistoryComponent } from './pages/history/history.component';
import { QuestionsComponent } from './pages/questions/questions.component';

export const routes: Routes = [
    { path: 'search-airport', component: HomeComponent },
    { path: 'airport/:iataCode', component: AirportDetailsComponent },
    { path: 'history', component: HistoryComponent },
    { path: 'questions-answers', component: QuestionsComponent },
];
