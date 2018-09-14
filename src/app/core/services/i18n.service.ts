import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from './local-storage.service';
import { SupportedLanguages } from '../models/localization.model';

import { EventManager } from './event-manager';
import { EventEnum } from '../models/event-enum';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class I18nService {
    currentLanguage: string;
    SupportedLanguages = SupportedLanguages;

    constructor(
        private translate: TranslateService,
        private localStorage: LocalStorageService,
        private eventManager: EventManager
    ) {}

    setLanguage(language: string): Observable<any> {
        this.currentLanguage = language;
        this.localStorage.set('language', language);
        return this.translate.use(language);
    }

    getLanguage(): string {
        return this.currentLanguage;
    }

    init() {
        this.currentLanguage = this.localStorage.get('language');
        if (!this.currentLanguage) {
            this.translate.addLangs(SupportedLanguages.map(lan => lan.code));
            const browserLang = this.translate.getBrowserLang();

            this.currentLanguage = browserLang.match(/en/) ? browserLang : SupportedLanguages[0].code;
        }

        this.setLanguage(this.currentLanguage);

        this.translate.onLangChange.subscribe((event: any) => {

            /**
             * We use eventManager to publish again to synchronize publish/subcribe mechanism of eventManager in all application
             */
            this.eventManager.broadcast({
                name: EventEnum.LANGUAGE_CHANGED,
                data: {
                    language: event && event.lang
                }
            });
        });
    }

    getText(key: string) {
        return this.translate.instant(key);
    }
}
