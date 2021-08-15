import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_helpers';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './modules/quiz/quiz.component';
import { TopicComponent } from './modules/topic/topic.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'topic/:title', component: TopicComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
