import * as mainCustomElements from 'custom-elements';
import * as sharedMain from 'SHARED/shared-main';
import { AppEntry } from './app-entry';

sharedMain.configure(AppEntry, <any>mainCustomElements);