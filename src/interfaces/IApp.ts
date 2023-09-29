import { AppView } from '../components/view/appView';
import AppController from '../components/controller/controller';

export interface IApp {
  view: AppView;

  controller: AppController;
}