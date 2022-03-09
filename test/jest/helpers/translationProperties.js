import stripesComponentsTranslations from '@folio/stripes-components/translations/stripes-components/en';
import stripesCoreTranslations from '@folio/stripes-core/translations/stripes-core/en';

import translations from '../../../translations/ui-stack-requests/en';

const translationsProperties = [
  {
    prefix: 'ui-stack-requests',
    translations,
  },
  {
    prefix: 'stripes-components',
    translations: stripesComponentsTranslations,
  },
  {
    prefix: 'stripes-core',
    translations: stripesCoreTranslations,
  }
];

export default translationsProperties;
