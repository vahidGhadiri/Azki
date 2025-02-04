import { QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client'
import { IntlProvider } from 'react-intl';

import "./config/tailwind/styles/tailwind.css"
import { queryClient } from '@config';
import { locale } from "@constants"

import App from './App.tsx'
import fa from "./i18n/compiled-lang/fa.json"

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <IntlProvider locale={locale.fa} messages={fa}>
      <App />
    </IntlProvider>
  </QueryClientProvider>,
)
