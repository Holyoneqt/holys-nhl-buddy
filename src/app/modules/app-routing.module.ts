import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameComponent } from '../routes/game/game.component';
import { HomeComponent } from '../routes/home/home.component';
import { ScoresComponent } from '../routes/scores/scores.component';
import { StandingsComponent } from '../routes/standings/standings.component';
import { HighlightsComponent } from './../routes/highlights/highlights.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent,
    },
    {
        path: 'scores',
        component: ScoresComponent,
    },
    {
        path: 'game/:id',
        component: GameComponent,
    },
    {
        path: 'highlights',
        component: HighlightsComponent,
    },
    {
        path: 'standings',
        component: StandingsComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
})
export class AppRoutingModule { }
